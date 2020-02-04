import React, { useState, useRef, useEffect } from "react"
import { getUser } from "../services/auth"
import { API_URL } from "../config"

import { navigate } from "gatsby"

import { openNotificationWithIcon } from "./Notifications"

import moment from "moment"

import { deleteClip } from "../services/clipManagement"
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
} from "antd"
import SearchClipDrawer from "./SearchClipDrawer"
import EditWordDrawer from "./EditWordDrawer"
import TranscriptionModal from "./TranscriptionModal"
import EditClipDrawer from "./EditClipDrawer"
import Word from "./Word"

function Clip(props) {
  const { clip } = props
  const [deleting, setDeleting] = useState(false)
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
    loading: false,
  })

  const [clipSaving, setClipSaving] = useState(false)

  const splitWordsIntoPages = (_words, pageSize = 200) => {
    let words = [..._words]
    let wordPages = []

    while (words.length) wordPages.push(words.splice(0, pageSize))
    return wordPages
  }

  const [wordData, setWordData] = useState({
    currentPageIndex: 0,
    selectedWord: undefined,
    wordPageSize: 200,
    wordPages: splitWordsIntoPages(props.clip.words, 200),
    words: props.clip.words,
    editing: false,
    loading: false,
  })

  const [editDrawerOpen, setEditDrawerOpen] = useState(false)

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
    } else {
      setWordData({
        ...wordData,
        wordPages: splitWordsIntoPages(clip.words, wordData.wordPageSize),
        words: clip.words,
        editing: false,
        loading: false,
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
    setDeleting(true)
    let success = await deleteClip(clipId)
    if (success) {
      props.removeClipFromSideBar()
      navigate("/app/profile")
    } else {
      setDeleting(false)
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
      props.updateClipInProfile(res.clip)
    } catch (error) {
      openNotificationWithIcon(
        "error",
        `Something went wrong, please try again.`
      )
      console.log(error)
      return false
    }
  }
  // const updateClip = async ({ name, words, _id }) => {
  //   setClipSaving(true)
  //   try {
  //     let res = await fetch(API_URL + "/clips/" + _id, {
  //       method: "PATCH",
  //       mode: "cors", // no-cors, *cors, same-origin
  //       cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
  //       credentials: "same-origin", // include, *same-origin, omit
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: getUser(),
  //       },
  //       body: JSON.stringify({ name: name }),
  //       redirect: "follow", // manual, *follow, error
  //       referrerPolicy: "no-referrer", // no-referrer, *client
  //     })
  //     // if (!res.ok) throw new Error("Something went wrong")
  //     res = await res.json() // parses JSON response into native JavaScript objects

  //     setEditDrawOpen(false)
  //     openNotificationWithIcon("success", `Changes saved`)
  //     props.updateClip(res)
  //   } catch (error) {
  //     console.log(error)
  //   }
  //   setClipSaving(false)
  // }

  const showClipAudio = () => {
    if (!clip || !clip.rawFileName) return null

    return (
      <ReactPlayer
        ref={player}
        url={`https://storage.googleapis.com/${clip.owner}/${clip.rawFileName}`}
        playing={playerControls.playing}
        controls
        width="100%"
        height="auto"
        style={{
          top: 0,
          maxWidth: "50rem",
          margin: "auto",
          zIndex: 3,
        }}
      />
    )
  }

  const onSearch = async (query, words) => {
    setSearchData({ ...searchData, loading: true })
    const results = await Promise.all(
      words.filter(w => w.word.toLowerCase().includes(query.toLowerCase()))
    )
    setSearchData({ ...searchData, results, loading: false })
  }

  const clipOptions = () => (
    <Menu>
      <Menu.Item onClick={() => setEditDrawerOpen(true)}>
        <Icon type="edit" />
        Edit Name
      </Menu.Item>
      <Menu.Item disabled={deleting}>
        <Popconfirm
          title="Are you sure delete this task?"
          onConfirm={() => deleteClipHandler(clip._id)}
          okText="Yes"
          cancelText="No"
        >
          {deleting ? <Icon type="loading" /> : <Icon type="delete" />}
          Delete
        </Popconfirm>
      </Menu.Item>
    </Menu>
  )

  const clipOptionsBar = () => (
    <>
      {clip ? (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {/* <h1 style={{ marginRight: "1rem" }}>{clip.name}</h1> */}
          <Dropdown overlay={clipOptions()} trigger={["click"]}>
            <h1
              className="ant-dropdown-link"
              href="#"
              style={{ cursor: "pointer" }}
            >
              {clip.name}{" "}
              {deleting ? <Icon type="loading" /> : <Icon type="down" />}
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
    </>
  )

  // const Word = styled.span`
  //   background: ${props =>
  //     props.selectedWord && props.selectedWord._id === props.word._id
  //       ? "#E6F7FF"
  //       : "none"};
  //   border-bottom: ${props =>
  //     props.selectedWord && props.selectedWord._id === props.word._id
  //       ? "2px solid #1890FF;"
  //       : "none"};
  // `

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
          />
        ))}
      </p>
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

  return (
    <>
      {showClipAudio()}

      <div style={{ maxWidth: "50rem", margin: "auto", minHeight: "70vh" }}>
        {clipOptionsBar()}

        {wordsParagraph()}
      </div>

      <Pagination
        style={{ display: "flex", justifyContent: "center" }}
        showQuickJumper
        showSizeChanger
        onChange={e => setWordData({ ...wordData, currentPageIndex: e - 1 })}
        // defaultCurrent={wordData.currentPageIndex + 1}
        current={wordData.currentPageIndex + 1}
        pageSizeOptions={["200", "300", "400", "500", "600"]}
        onShowSizeChange={(e, num) => wordShowSizeChangeHandler(num)}
        total={wordData.words.length}
        pageSize={wordData.wordPageSize}
        hideOnSinglePage
      />

      {/* {editClipDrawer()} */}
      <EditClipDrawer
        clip={clip}
        clipSaving={clipSaving}
        editDrawerOpen={editDrawerOpen}
        updateClipInProfile={props.updateClipInProfile}
        setClipSaving={setClipSaving}
        setEditDrawerOpen={setEditDrawerOpen}
      />

      <SearchClipDrawer
        searchData={searchData}
        onSearch={onSearch}
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
        updateClipInProfile={props.updateClipInProfile}
        clip={clip}
        // handleEditWord={handleEditWord}
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

export default Clip
