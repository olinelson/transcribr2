import React, { useState, useRef, useEffect } from "react"
import { getUser } from "../services/auth"
import { API_URL, LanguageOptions } from "../config"

import { navigate } from "gatsby"

import { openNotificationWithIcon } from "./Notifications"

import styled from "styled-components"

import { deleteClip } from "../services/clipManagement"
import ReactPlayer from "react-player"
import {
  Popover,
  Icon,
  Tag,
  Switch,
  Button,
  Popconfirm,
  Drawer,
  Form,
  Pagination,
  Input,
  List,
  Modal,
  Select,
} from "antd"

const { Option } = Select

const { Search } = Input

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
    console.log(wordPages)
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

  const [editDrawerOpen, setEditDrawOpen] = useState(false)

  const [playerControls, setPlayerControls] = useState({
    playing: false,
  })
  const player = useRef(null)

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
      props.updateClip(res.clip)
    } catch (error) {
      openNotificationWithIcon(
        "error",
        `Something went wrong, please try again.`
      )
      console.log(error)
      return false
    }
  }
  const updateClip = async ({ name, words, _id }) => {
    console.log("fetch", name, words, _id)
    setClipSaving(true)
    try {
      let res = await fetch(API_URL + "/clips/" + _id, {
        method: "PATCH",
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          Authorization: getUser(),
        },
        body: JSON.stringify({ name: name }),
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *client
      })
      // if (!res.ok) throw new Error("Something went wrong")
      res = await res.json() // parses JSON response into native JavaScript objects
      console.log("this is updateClip Res", res)
      console.log("this is updateClip words", res.words)

      setEditDrawOpen(false)
      openNotificationWithIcon("success", `Changes saved`)
      props.updateClip(res)
    } catch (error) {
      console.log(error)
    }
    setClipSaving(false)
  }

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

  const clipOptionsBar = () => (
    <>
      {clip ? <h1>{clip.name}</h1> : null}
      <Button
        type="primary"
        loading={transcribeData.loading}
        onClick={() =>
          setTranscribeData({ ...transcribeData, modalOpen: true })
        }
      >
        Transcribe Clip
      </Button>
      <Modal
        title={`Transcribe ${clip.name}`}
        visible={transcribeData.modalOpen}
        onOk={() => convertClip()}
        onCancel={() =>
          setTranscribeData({ ...transcribeData, modalOpen: false })
        }
      >
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Select
            showSearch
            style={{ width: "100%" }}
            placeholder="Select a language"
            optionFilterProp="children"
            onChange={lang =>
              setTranscribeData({ ...transcribeData, language: lang })
            }
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            {LanguageOptions.map(l => (
              <Option key={l.languageCode} value={l.languageCode}>
                {l.languageEnglishName}
              </Option>
            ))}
          </Select>
        </div>
      </Modal>

      <Popconfirm
        title="Are you sure delete this task?"
        onConfirm={() => deleteClipHandler(clip._id)}
        okText="Yes"
        cancelText="No"
      >
        <Button type="danger" loading={deleting}>
          <Icon type="delete" />
          Delete
        </Button>
      </Popconfirm>
      {/* 
      <Switch
        onChange={() => setSticky(!sticky)}
        checkedChildren="Sticky"
        unCheckedChildren="Fixed"
      /> */}
      <Button onClick={() => setEditDrawOpen(true)}>Edit</Button>
      <Button onClick={() => setSearchData({ ...searchData, modalOpen: true })}>
        Search
      </Button>
    </>
  )

  const Word = styled.span`
    background: ${props =>
      props.selectedWord && props.selectedWord._id === props.word._id
        ? "#E6F7FF"
        : "none"};
    border-bottom: ${props =>
      props.selectedWord && props.selectedWord._id === props.word._id
        ? "2px solid #1890FF;"
        : "none"};
  `

  const wordsParagraph = () => {
    if (!wordData.wordPages.length) return <p> No words yet...</p>
    return (
      <p>
        {wordData.wordPages[wordData.currentPageIndex].map(w => (
          <Popover
            key={w._id}
            content={
              <div>
                <Tag>{w.startTime}</Tag>
                <Icon
                  type="login"
                  onClick={() => {
                    player.current.seekTo(
                      parseInt(w.startTime.replace("s", ""))
                    )
                    setPlayerControls({ ...playerControls, playing: true })
                  }}
                />
                <Icon
                  type="edit"
                  onClick={() =>
                    setWordData({ ...wordData, selectedWord: w, editing: true })
                  }
                />
              </div>
            }
          >
            <span>
              {" "}
              <Word word={w} selectedWord={wordData.selectedWord}>
                {w.word}
              </Word>{" "}
            </span>
          </Popover>
        ))}
      </p>
    )
  }

  const editClipDrawer = () => (
    <Drawer
      title="Edit Clip"
      placement="right"
      closable={false}
      visible={editDrawerOpen}
    >
      <Form
        onSubmit={e => {
          e.preventDefault()

          console.log({ [e.target.name.name]: e.target.name.value })
          let editedClip = {
            ...clip,
            [e.target.name.name]: e.target.name.value,
          }
          updateClip(editedClip)
        }}
        // onChange={e =>
        //   props.updateClip({ ...clip, [e.target.name]: e.target.value })
        // }
      >
        <input name="name" defaultValue={clip.name} />
        <Form.Item>
          <Button
            onClick={() => {
              setEditDrawOpen(false)
            }}
          >
            Cancel
          </Button>
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" loading={clipSaving}>
            Save
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  )

  const navigateToWord = word => {
    let wordIndex = wordData.words.indexOf(word) + 1
    let pageNumber = 0

    while (wordIndex > 1) {
      wordIndex -= wordData.wordPageSize
      pageNumber++
    }

    setWordData({
      ...wordData,
      currentPageIndex: pageNumber - 1,
      selectedWord: word,
    })
    setSearchData({ ...searchData, modalOpen: false })
  }

  const handleEditWord = async e => {
    e.preventDefault()
    let newWordValue = e.target.newWordValue.value
    let clipId = clip._id
    let wordId = wordData.selectedWord._id

    console.log({ clipId, wordId, newWordValue })

    setWordData({
      ...wordData,
      loading: true,
    })
    try {
      let res = await fetch(API_URL + "/words", {
        method: "PATCH",
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          Authorization: getUser(),
        },
        body: JSON.stringify({ clipId, wordId, newWordValue }),
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *client
      })
      // if (!res.ok) throw new Error("Something went wrong")
      res = await res.json() // parses JSON response into native JavaScript objects
      console.log(res)
      props.updateClip(res)
      openNotificationWithIcon("success", `Changes saved`)
    } catch (error) {
      console.log(error)
      setWordData({
        ...wordData,
        loading: false,
      })
    }
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

      {editClipDrawer()}

      <Drawer
        title="Search"
        visible={searchData.modalOpen}
        onClose={() => setSearchData({ ...searchData, modalOpen: false })}
      >
        <Search
          style={{ marginBottom: "1rem" }}
          placeholder="input search text"
          onSearch={query => onSearch(query, wordData.words)}
          enterButton
          loading={searchData.loading}
          autoFocus
        />

        <List
          style={{
            height: "80vh",
            overflow: "scroll",
          }}
          itemLayout="horizontal"
          dataSource={searchData.results}
          renderItem={word => (
            <List.Item>
              <List.Item.Meta
                // avatar={
                //   <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                // }
                title={<a onClick={() => navigateToWord(word)}>{word.word}</a>}
                description={
                  <span>
                    <Icon type="clock-circle" /> {word.startTime}
                    <Icon
                      type="login"
                      onClick={() => {
                        player.current.seekTo(
                          parseInt(word.startTime.replace("s", ""))
                        )
                        setPlayerControls({
                          ...playerControls,
                          playing: true,
                        })
                      }}
                    />
                  </span>
                }
              />
            </List.Item>
          )}
        />
        {/* {searchData.results.map(r => (
            <p>{r.word}</p>
          ))} */}
      </Drawer>

      <Drawer
        visible={wordData.editing}
        destroyOnClose={true}
        onClose={() =>
          setWordData({ ...wordData, selectedWord: undefined, editing: false })
        }
        closable={true}
        title="Edit"
      >
        {wordData.editing ? (
          <Form onSubmit={e => handleEditWord(e)}>
            <Form.Item>
              <Input
                autoFocus
                name="newWordValue"
                defaultValue={
                  wordData.selectedWord ? wordData.selectedWord.word : ""
                }
              ></Input>
            </Form.Item>
            <Form.Item>
              <Button
                loading={wordData.loading}
                type="primary"
                htmlType="submit"
              >
                Save
              </Button>
            </Form.Item>
          </Form>
        ) : null}
      </Drawer>
    </>
  )
}

export default Clip
