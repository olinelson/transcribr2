import React, { useState, useRef, useEffect } from "react"
import { navigate } from "gatsby"
import { API_URL } from "../config"

import { getUser } from "../services/auth"
import { deleteClip, getClip } from "../services/clipManagement"
import { splitWordsIntoPages } from "../services/wordManagement"

import openSocket from "socket.io-client"
import ReactPlayer from "react-player"

// components
import {
  Icon,
  Button,
  Pagination,
  Steps,
  Skeleton,
  Progress,
  Menu,
  Dropdown,
} from "antd"
import { ClipContainer, WordsContainer } from "./MyStyledComponents"
import { openNotificationWithIcon } from "./Notifications"
import SearchClipDrawer from "./SearchClipDrawer"
import EditWordDrawer from "./EditWordDrawer"
import TranscriptionModal from "./TranscriptionModal"
import EditClipDrawer from "./EditClipDrawer"
import Word from "./Word"
import CitationModal from "./CitationModal"
import WordCitationModal from "./WordCitationModal"

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

  const [citationModalOpen, setCitationModalOpen] = useState(false)
  const [, setWordCitationModalOpen] = useState(false)

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
    citing: false,
  })

  const [playerControls, setPlayerControls] = useState({
    playing: false,
  })
  const player = useRef(null)

  const notificationHandler = notification => {
    if (notification.name === "transcriptionUpdate") {
      setClip(notification.data.clip)
    }

    if (notification.name === "joinedClipChannel") {
      console.log(notification.message)
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
    setClip({ ...clip, editing: false, deleting: true })
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
          display: "flex",
          maxWidth: clip.isVideo ? "30rem" : "100%",
          minHeight: ".5rem",
          justifySelf: "center",
          gridArea: "clip",
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
            flexWrap: "wrap",
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
              <>
                {/* <Icon
                  style={{ fontSize: "1rem" }}
                  onClick={() => setCitationModalOpen(true)}
                  type="link"
                /> */}
              </>
            )}
          </h1>

          <Button.Group>
            <Button
              disabled={!wordData.words.length}
              onClick={() => setSearchData({ ...searchData, modalOpen: true })}
            >
              <Icon type="file-search" />
              Search
            </Button>
            <Dropdown
              trigger={["click"]}
              overlay={
                <Menu>
                  <Menu.Item
                    onClick={() => setClip({ ...clip, editing: true })}
                  >
                    <Icon type="edit" />
                    Edit
                  </Menu.Item>
                  <Menu.Item onClick={() => setCitationModalOpen(true)}>
                    <Icon type="snippets" />
                    Cite
                  </Menu.Item>

                  <Menu.Item
                    disabled={!wordData.words.length}
                    onClick={() => downloadTextFile()}
                  >
                    <Icon type="download" />
                    Download Transcript
                  </Menu.Item>
                </Menu>
              }
            >
              <Button>
                <Icon type="more" />
              </Button>
            </Dropdown>
          </Button.Group>
        </div>
      ) : null}
    </div>
  )

  const downloadTextFile = () => {
    const allWords = clip.words.map(w => w.word).join(" ")
    const element = document.createElement("a")
    const file = new Blob([allWords], {
      type: "text/plain",
    })
    element.href = URL.createObjectURL(file)
    element.download = `${clip.name}.txt`
    document.body.appendChild(element) // Required for this to work in FireFox
    element.click()
  }

  const maybeShowWordsParagraph = () => {
    if (wordData.wordPages.length)
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
                setWordCitationModalOpen={setWordCitationModalOpen}
              />
            ))}
          </p>
        </WordsContainer>
      )
  }

  const maybeShowTranscribeButtton = () => {
    if (!wordData.wordPages.length && !transcribeData.loading)
      return (
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
      )
  }

  const maybeShowTranscribingLoadingState = () => {
    if (!wordData.wordPages.length && transcribeData.loading)
      return (
        <div
          style={{
            display: "grid",
            // height: "50vh",
            height: "20rem",

            justifyItems: "center",
            alignItems: "center",
            alignContent: "center",
            gridTemplateRows: "auto auto auto auto",
            borderRadius: "6px",
            backgroundColor: "#fafafa",
            padding: "1rem",
            gridArea: "space",
          }}
        >
          <>
            <Steps style={{ padding: "1rem" }}>
              <Step
                status={clip.conversionComplete ? "finish" : "process"}
                title="Converting"
                icon={
                  clip.conversionComplete ? (
                    <Icon
                      type="check-circle"
                      theme="twoTone"
                      twoToneColor="#52c41a"
                    />
                  ) : (
                    <Icon active type="loading" />
                  )
                }
              />
              <Step
                status={clip.operationId ? "process" : "wait"}
                title="Transcribing"
                icon={
                  clip.conversionComplete ? (
                    <Icon active type="loading" />
                  ) : (
                    <Icon type="message" />
                  )
                }
              />

              <Step title="Done" icon={<Icon type="smile-o" />} />
            </Steps>
            {clip.operationId ? (
              <Progress
                // strokeWidth={100}
                style={{ padding: ".25rem", marginRight: "-8px" }}
                percent={clip.progressPercent || 1}
                status="active"
              />
            ) : null}
          </>
        </div>
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
  }

  if (!!clip.loading) {
    return (
      <div>
        <div style={{ height: "4rem" }} />
        <Skeleton active />
      </div>
    )
  } else {
    return (
      <>
        <ClipContainer isVideo={clip.isVideo}>
          {showClipAudio()}

          {clipOptionsBar()}

          {maybeShowWordsParagraph()}

          {maybeShowTranscribeButtton()}

          {maybeShowTranscribingLoadingState()}

          <Pagination
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignSelf: "center",
              gridArea: "pagination",
              // paddingBottom: ".5rem",
              flexWrap: "wrap",
            }}
            size="small"
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

        <CitationModal
          citationModalOpen={citationModalOpen}
          setCitationModalOpen={setCitationModalOpen}
          clip={clip}
        />
        <WordCitationModal
          clip={clip}
          wordData={wordData}
          setWordData={setWordData}
        />
      </>
    )
  }
}

export default Clip
