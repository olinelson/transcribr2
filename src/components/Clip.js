import React, { useState, useRef, useEffect } from "react"
import { navigate } from "gatsby"
import { API_URL } from "../config"

import { getUser } from "../services/auth"
import { deleteClip, getClip } from "../services/clipManagement"
import { splitWordsIntoPages } from "../services/wordManagement"

import openSocket from "socket.io-client"
import moment from "moment"
import ReactPlayer from "react-player"

// components
import { Icon, Button, Pagination, Steps, Skeleton, Progress } from "antd"
import { ClipContainer, WordsContainer } from "./MyStyledComponents"
import { openNotificationWithIcon } from "./Notifications"
import SearchClipDrawer from "./SearchClipDrawer"
import EditWordDrawer from "./EditWordDrawer"
import TranscriptionModal from "./TranscriptionModal"
import EditClipDrawer from "./EditClipDrawer"
import Word from "./Word"

const { Step } = Steps

function Clip(props) {
  const { _id, name } = props.clip

  const [clip, setClip] = useState({
    _id,
    name,
    loading: true,
    words: [],
    saving: false,
    editing: false,
    deleting: false,
  })

  const [transcribeData, setTranscribeData] = useState({
    modalOpen: false,
    language: "",
    loading:
      props.clip.conversionComplete === false ||
      props.clip.operationCompleted === false
        ? true
        : false,
  })

  const [searchData, setSearchData] = useState({
    modalOpen: false,
    input: "",
    results: [],
  })

  const [searching] = useState(false)

  const [wordData, setWordData] = useState({
    currentPageIndex: 0,
    selectedWord: undefined,
    inserting: null,
    wordPageSize: 200,
    wordPages: splitWordsIntoPages(clip.words, 200),
    words: clip.words,
    editing: false,
    loading: false,
  })

  const [playerControls, setPlayerControls] = useState({
    playing: false,
  })
  const player = useRef(null)

  const formatTimeStamp = string => {
    let seconds = parseInt(string.replace("s", ""))
    let mo = moment.duration(seconds, "seconds")
    let hrs = Math.round(mo.asHours())
    let mins = Math.round(mo.asMinutes())
    let secs = Math.round(mo.asSeconds())

    return `${hrs}:${mins}:${secs}`
  }

  const notificationHandler = notification => {
    if (notification.name === "transcriptionUpdate") {
      setClip(notification.data.clip)
    }

    if (notification.name === "joinedClipChannel") {
      console.log(notification.message)
      // openNotificationWithIcon("success", notification.message)
    }
  }

  const mounted = useRef()
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true

      const socket = openSocket(API_URL)

      function joinClipChannel(token, cb) {
        socket.on("clipChannelUpdate", data => cb(data))
        socket.emit("joinClipChannel", token, _id)
      }
      getClip(_id, setClip)

      joinClipChannel(getUser(), notification => {
        notificationHandler(notification)
      })
    } else {
      setWordData({
        ...wordData,
        wordPages: splitWordsIntoPages(clip.words, wordData.wordPageSize),
        words: clip.words,
        editing: false,
        inserting: null,
        deleting: false,
        loading: false,
        selectedWord: undefined,
      })
    }
  }, [clip])

  const wordShowSizeChangeHandler = num => {
    setWordData({
      ...wordData,
      currentPageIndex: 0,
      wordPageSize: num,
      wordPages: splitWordsIntoPages(wordData.words, num),
    })
  }

  const deleteClipHandler = async clipId => {
    setClip({ ...clip, deleting: true })
    let success = await deleteClip(clipId)
    if (success) {
      props.removeClipFromSideBar()
      navigate("/app/profile")
    } else {
      setClip({ ...clip, deleting: false })
    }
  }

  const convertClip = async () => {
    setTranscribeData({ ...transcribeData, loading: true, modalOpen: false })
    try {
      let res = await fetch(
        `${API_URL}/convert/clips/${clip._id}?lang=${transcribeData.language}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: getUser(),
          },
          redirect: "follow", // manual, *follow, error
          referrerPolicy: "no-referrer", // no-referrer, *client
        }
      )
      if (!res.ok) throw new Error("Something went wrong")
      res = await res.json() // parses JSON response into native JavaScript objects

      openNotificationWithIcon("success", `Transcription Started!`)
      setClip(res.clip)
    } catch (error) {
      openNotificationWithIcon(
        "error",
        `Something went wrong, please try again.`
      )
      console.log(error)
      return false
    }
  }

  const showClipAudio = () => {
    if (!clip || !clip.rawFileName) return null

    return (
      <ReactPlayer
        ref={player}
        url={`https://storage.googleapis.com/${clip.owner}/${clip.rawFileName}`}
        playing={playerControls.playing}
        controls
        playsinline
        pip={true}
        height="100%"
        width="100%"
        style={{
          maxWidth: clip.isVideo ? "30rem" : "100%",
          marginTop: "1rem",
          justifySelf: "center",
        }}
      />
    )
  }

  const clipOptionsBar = () => (
    <div style={{ gridArea: "toolbar" }}>
      {clip ? (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1
            className="ant-dropdown-link"
            style={{ cursor: "pointer", margin: 0 }}
          >
            {clip.name}{" "}
            {clip.deleting ? (
              <Icon type="loading" />
            ) : (
              <Icon
                style={{ fontSize: "1rem" }}
                onClick={() => setClip({ ...clip, editing: true })}
                type="edit"
              />
            )}
          </h1>

          <Button
            disabled={!wordData.words.length}
            onClick={() => setSearchData({ ...searchData, modalOpen: true })}
          >
            <Icon type="file-search" />
            Search
          </Button>
        </div>
      ) : null}
    </div>
  )

  const wordsParagraph = () => {
    if (!wordData.wordPages.length)
      return (
        <div
          style={{
            display: "grid",
            height: "50vh",
            justifyItems: "center",
            gridTemplateRows: "auto auto auto auto",
            // alignItems: "center",
          }}
        >
          <Button
            type="primary"
            loading={transcribeData.loading}
            onClick={() =>
              setTranscribeData({
                ...transcribeData,
                modalOpen: true,
              })
            }
          >
            <Icon type="message" />
            Transcribe
          </Button>

          <>
            <Progress percent={clip.progressPercent || 0} status="active" />
            <Steps>
              <Step
                status={clip.conversionComplete ? "finish" : "process"}
                title="Convert"
                icon={<Icon type="tool" />}
              />
              <Step
                status={clip.conversionComplete ? "process" : "wait"}
                title="Transcribe"
                icon={<Icon type="message" />}
              />
              <Step title="Done" icon={<Icon type="smile-o" />} />
            </Steps>
          </>
        </div>
      )
    return (
      <WordsContainer style={{ gridArea: "words" }}>
        <p>
          {wordData.wordPages[wordData.currentPageIndex].map(w => (
            <Word
              key={w._id}
              word={w}
              wordData={wordData}
              setWordData={setWordData}
              player={player}
              playerControls={playerControls}
              setPlayerControls={setPlayerControls}
              updateClipInProfile={props.updateClipInProfile}
              clip={clip}
              setClip={setClip}
            />
          ))}
        </p>
      </WordsContainer>
    )
  }

  const navigateToWord = word => {
    let wordIndex = wordData.words.indexOf(word) + 1

    let pageNumber = Math.floor(wordIndex / wordData.wordPageSize)

    setWordData({
      ...wordData,
      currentPageIndex: pageNumber,
      selectedWord: word,
    })
    setSearchData({ ...searchData, modalOpen: false })
  }

  if (!!clip.loading) {
    return (
      <div>
        <div style={{ height: "4rem" }} />
        <Skeleton />
      </div>
    )
  } else {
    return (
      <>
        <ClipContainer isVideo={clip.isVideo}>
          {showClipAudio()}

          {clipOptionsBar()}

          {wordsParagraph()}

          <Pagination
            style={{
              display: "flex",
              justifyContent: "center",
              alignSelf: "center",
              gridArea: "pagination",
            }}
            showQuickJumper
            showSizeChanger
            onChange={e =>
              setWordData({ ...wordData, currentPageIndex: e - 1 })
            }
            current={wordData.currentPageIndex + 1}
            pageSizeOptions={["200", "300", "400", "500", "600"]}
            onShowSizeChange={(e, num) => wordShowSizeChangeHandler(num)}
            total={wordData.words.length}
            pageSize={wordData.wordPageSize}
            hideOnSinglePage
          />
        </ClipContainer>

        <EditClipDrawer
          clip={clip}
          updateClipInProfile={props.updateClipInProfile}
          setClip={setClip}
          deleteClipHandler={deleteClipHandler}
        />

        <SearchClipDrawer
          searchData={searchData}
          searching={searching}
          navigateToWord={navigateToWord}
          setPlayerControls={setPlayerControls}
          formatTimeStamp={formatTimeStamp}
          wordData={wordData}
          setSearchData={setSearchData}
          playerControls={playerControls}
          player={player}
        />

        <EditWordDrawer
          wordData={wordData}
          setClip={setClip}
          clip={clip}
          setWordData={setWordData}
        />

        <TranscriptionModal
          convertClip={convertClip}
          clip={clip}
          transcribeData={transcribeData}
          setTranscribeData={setTranscribeData}
        />
      </>
    )
  }
}

export default Clip
