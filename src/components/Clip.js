import React, { useState, useRef, useEffect } from "react"
import { getUser } from "../services/auth"
import { API_URL } from "../config"

import { navigate } from "gatsby"

import {
  ClipContainer,
  WordsParagraph,
  WordsContainer,
} from "./MyStyledComponents"
import { openNotificationWithIcon } from "./Notifications"

import moment from "moment"

import { deleteClip, getClip } from "../services/clipManagement"
import ReactPlayer from "react-player"
import {
  Icon,
  Button,
  Popconfirm,
  Pagination,
  Input,
  Select,
  Menu,
  Dropdown,
  Skeleton,
} from "antd"
import SearchClipDrawer from "./SearchClipDrawer"
import EditWordDrawer from "./EditWordDrawer"
import TranscriptionModal from "./TranscriptionModal"
import EditClipDrawer from "./EditClipDrawer"
import Word from "./Word"
import { insertWord } from "../services/wordManagement"

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
    // loading: false,
  })

  const [searching, setSearching] = useState(false)

  const splitWordsIntoPages = (_words, pageSize = 200) => {
    let words = [..._words]
    let wordPages = []

    while (words.length) wordPages.push(words.splice(0, pageSize))
    return wordPages
  }

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

  const mounted = useRef()
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true
      getClip(_id, setClip)
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
          mode: "cors", // no-cors, *cors, same-origin
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          credentials: "same-origin", // include, *same-origin, omit
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
        // width="auto"
        // height="100%"
        style={{
          // top: 0,
          maxWidth: "100%",
          maxHeight: "100%",
          justifySelf: "center",
          zIndex: 3,
          gridArea: "clip",
        }}
      />
    )
  }

  // const splitResultsIntoPages = (_results, pageSize = 20) => {
  //   let results = [..._results]
  //   let resultPages = []

  //   while (results.length) resultPages.push(results.splice(0, pageSize))
  //   return resultPages
  // }

  // const onSearch = async (query, words) => {
  //   Array.prototype.asyncFilter = async function(f) {
  //     var array = this
  //     var booleans = await Promise.all(array.map(f))
  //     return array.filter((x, i) => booleans[i])
  //   }

  //   setSearchData({ ...searchData, loading: true })

  //   let results = await words.asyncFilter(w =>
  //     w.word.toLowerCase().includes(query.toLowerCase())
  //   )

  //   // results = results.slice(0, 50)

  //   setSearchData({
  //     ...searchData,
  //     results: splitResultsIntoPages(results, 20),
  //   })
  //   setSearching(false)
  // }

  const clipOptions = () => (
    <Menu>
      <Menu.Item onClick={() => setClip({ ...clip, editing: true })}>
        <Icon type="edit" />
        Edit Name
      </Menu.Item>
      <Menu.Item disabled={clip.deleting}>
        <Popconfirm
          title="Are you sure you want to delete this clip?"
          onConfirm={() => deleteClipHandler(clip._id)}
          okText="Yes"
          cancelText="No"
        >
          {clip.deleting ? <Icon type="loading" /> : <Icon type="delete" />}
          Delete
        </Popconfirm>
      </Menu.Item>
    </Menu>
  )

  const clipOptionsBar = () => (
    <div style={{ gridArea: "toolbar" }}>
      {clip ? (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Dropdown overlay={clipOptions()} trigger={["click"]}>
            <h1
              className="ant-dropdown-link"
              href="#"
              style={{ cursor: "pointer" }}
            >
              {clip.name}{" "}
              {clip.deleting ? <Icon type="loading" /> : <Icon type="down" />}
            </h1>
          </Dropdown>{" "}
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
            alignItems: "center",
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
          // updateClipInProfile={props.updateClipInProfile}
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

  // return (
  // <>
  //   {showClipAudio()}

  //   <div style={{ maxWidth: "50rem", margin: "auto", minHeight: "70vh" }}>
  //     {clipOptionsBar()}

  //     {wordsParagraph()}
  //   </div>

  //   <Pagination
  //     style={{ display: "flex", justifyContent: "center" }}
  //     showQuickJumper
  //     showSizeChanger
  //     onChange={e => setWordData({ ...wordData, currentPageIndex: e - 1 })}
  //     // defaultCurrent={wordData.currentPageIndex + 1}
  //     current={wordData.currentPageIndex + 1}
  //     pageSizeOptions={["200", "300", "400", "500", "600"]}
  //     onShowSizeChange={(e, num) => wordShowSizeChangeHandler(num)}
  //     total={wordData.words.length}
  //     pageSize={wordData.wordPageSize}
  //     hideOnSinglePage
  //   />

  //   {/* {editClipDrawer()} */}
  //   <EditClipDrawer
  //     clip={clip}
  //     clipSaving={clipSaving}
  //     editDrawerOpen={editDrawerOpen}
  //     updateClipInProfile={props.updateClipInProfile}
  //     setClipSaving={setClipSaving}
  //     setEditDrawerOpen={setEditDrawerOpen}
  //   />

  //   <SearchClipDrawer
  //     searchData={searchData}
  //     onSearch={onSearch}
  //     navigateToWord={navigateToWord}
  //     setPlayerControls={setPlayerControls}
  //     formatTimeStamp={formatTimeStamp}
  //     wordData={wordData}
  //     setSearchData={setSearchData}
  //     playerControls={playerControls}
  //     player={player}
  //   />

  //   <EditWordDrawer
  //     wordData={wordData}
  //     updateClipInProfile={props.updateClipInProfile}
  //     clip={clip}
  //     // handleEditWord={handleEditWord}
  //     setWordData={setWordData}
  //   />

  //   <TranscriptionModal
  //     convertClip={convertClip}
  //     clip={clip}
  //     transcribeData={transcribeData}
  //     setTranscribeData={setTranscribeData}
  //   />
  // </>
  // )
}

export default Clip
