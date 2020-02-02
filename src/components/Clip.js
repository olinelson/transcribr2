import React, { useState, useRef, useEffect } from "react"
import { getUser } from "../services/auth"
import { API_URL } from "../config"

import { openNotificationWithIcon } from "./Notifications"

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
  AutoComplete,
  Select,
} from "antd"

const { Option, OptGroup } = AutoComplete

function Clip(props) {
  const [clip, setClip] = useState(props.clip)
  const [sticky, setSticky] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const getWords = clip => {
    if (!clip || !clip.results) return []

    let alternatives = clip.results.map(r => {
      return r.alternatives[0]
    })

    let words = alternatives.map(a => a.words)

    words = words.flat()

    return words
  }

  const splitWordsIntoPages = (clip, pageSize = 200) => {
    let words = getWords(clip)
    let wordPages = []
    while (words.length) wordPages.push(words.splice(0, pageSize))
    return wordPages
  }

  const [wordData, setWordData] = useState({
    currentPageIndex: 0,
    wordPageSize: 200,
    wordPages: splitWordsIntoPages(props.clip, 200),
    words: getWords(props.clip),
  })

  const [transcribing, setTranscribing] = useState(
    props.clip.conversionComplete === false ||
      props.clip.operationCompleted === false
      ? true
      : false
  )

  const [editDrawerOpen, setEditDrawOpen] = useState(false)

  const player = useRef(null)

  const wordShowSizeChangeHandler = num => {
    setWordData({
      currentPageIndex: 0,
      wordPageSize: num,
      wordPages: splitWordsIntoPages(clip, num),
    })
  }

  const deleteClipHandler = async clipId => {
    setDeleting(true)
    let success = await deleteClip(clipId)
    if (success) {
      props.removeClipFromSideBar()
      props.setView({ route: "/user" })
    } else {
      setDeleting(false)
    }
  }

  const convertClip = async () => {
    setTranscribing(true)
    try {
      let res = await fetch(API_URL + "/convert/clips/" + clip._id, {
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          Authorization: getUser(),
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *client
      })
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
  const updateClip = async () => {
    try {
      let res = await fetch(API_URL + "/clips/" + clip._id, {
        method: "PATCH",
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          Authorization: getUser(),
        },
        body: JSON.stringify({ name: clip.name }),
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *client
      })
      // if (!res.ok) throw new Error("Something went wrong")
      res = await res.json() // parses JSON response into native JavaScript objects
      console.log(res)
      setEditDrawOpen(false)
      openNotificationWithIcon("success", `Changes saved`)
      props.updateClip(res)
    } catch (error) {
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
        // playing
        controls
        width="100%"
        height="auto"
        style={{
          position: sticky ? "sticky" : "static",
          top: 0,
          maxWidth: "50rem",
          margin: "auto",
          zIndex: 3,
        }}
      />
    )
  }

  const clipOptionsBar = () => (
    <>
      {clip ? <h1>{clip.name}</h1> : null}
      <Popconfirm
        title="Transcribe this clip?"
        onConfirm={() => convertClip()}
        okText="Yes"
        cancelText="No"
      >
        <Button loading={transcribing} type="primary">
          <Icon type="file-word" />
          Transcribe
        </Button>
      </Popconfirm>
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

      <Switch
        onChange={() => setSticky(!sticky)}
        checkedChildren="Sticky"
        unCheckedChildren="Fixed"
      />
      <Button onClick={() => setEditDrawOpen(true)}>Edit</Button>
    </>
  )

  const wordsParagraph = () => (
    <p>
      {wordData.wordPages[wordData.currentPageIndex].map(w => (
        <Popover
          key={w._id}
          content={
            <div>
              <Tag>{w.startTime}</Tag>
              <Icon
                type="login"
                onClick={() =>
                  player.current.seekTo(parseInt(w.startTime.replace("s", "")))
                }
              />
            </div>
          }
        >
          <span> {" " + w.word + " "}</span>
        </Popover>
      ))}
    </p>
  )

  const editClipDrawer = () => (
    <Drawer
      title="Edit Clip"
      placement="right"
      closable={false}
      visible={editDrawerOpen}
    >
      <Form
        onChange={e => setClip({ ...clip, [e.target.name]: e.target.value })}
      >
        <input name="name" value={clip.name} />
      </Form>
      <Button
        onClick={() => {
          setClip(props.clip)
          setEditDrawOpen(false)
        }}
      >
        Cancel
      </Button>
      <Button onClick={() => updateClip()}>Save</Button>
    </Drawer>
  )

  const dataSource = [
    {
      title: "Words",
      children: wordData.words.map(w => {
        return { title: w.word, startTime: w.startTime, id: w._id }
      }),
    },
  ]

  function renderTitle(title) {
    return (
      <span>
        {title}
        <a
          style={{ float: "right" }}
          href="https://www.google.com/search?q=antd"
          target="_blank"
          rel="noopener noreferrer"
        >
          more
        </a>
      </span>
    )
  }

  const options = dataSource
    .map(group => (
      <OptGroup key={group.title} label={renderTitle(group.title)}>
        {group.children.map(opt => (
          <Option key={opt.id} value={opt.title}>
            {opt.title}
            {/* <span className="certain-search-item-count">{opt.count}</span> */}
          </Option>
        ))}
      </OptGroup>
    ))
    .concat([
      <Option disabled key="all" className="show-all">
        <a
          href="https://www.google.com/search?q=antd"
          target="_blank"
          rel="noopener noreferrer"
        >
          View all results
        </a>
      </Option>,
    ])

  return (
    <>
      {showClipAudio()}

      <div style={{ maxWidth: "50rem", margin: "auto", minHeight: "70vh" }}>
        {clipOptionsBar()}
        <AutoComplete
          className="certain-category-search"
          dropdownClassName="certain-category-search-dropdown"
          dropdownMatchSelectWidth={false}
          dropdownStyle={{ width: 300 }}
          size="large"
          style={{ width: "100%" }}
          dataSource={options}
          placeholder="input here"
          optionLabelProp="value"
          filterOption
        >
          <Input
            suffix={<Icon type="search" className="certain-category-icon" />}
          />
        </AutoComplete>
        ,{wordsParagraph()}
      </div>

      <Pagination
        style={{ display: "flex", justifyContent: "center" }}
        showQuickJumper
        showSizeChanger
        onChange={e => setWordData({ ...wordData, currentPageIndex: e - 1 })}
        defaultCurrent={1}
        pageSizeOptions={["200", "300", "400"]}
        onShowSizeChange={(e, num) => wordShowSizeChangeHandler(num)}
        total={200 * wordData.wordPages.length}
        pageSize={wordData.wordPageSize}
        hideOnSinglePage
      />

      {editClipDrawer()}
    </>
  )
}

export default Clip
