import React, { useState } from "react"

import { Popover, Icon, Tag, Dropdown, Menu, Popconfirm, Modal } from "antd"

import { deleteWord } from "../services/wordManagement"

import { formatTimeStamp } from "../utils"

import styled, { keyframes } from "styled-components"

const flash = keyframes`
  from {
    opacity: 0.5;
  }

  to {
    opacity: .7;
  }
`

const WordContainer = styled.span`
  background: ${props =>
    props.selectedWord && props.selectedWord._id === props.word._id
      ? "#E6F7FF"
      : "none"};
  border-bottom: ${props =>
    props.selectedWord && props.selectedWord._id === props.word._id
      ? "2px solid #1890FF;"
      : "none"};
  animation: ${flash} 0.5s alternate infinite linear;
  animation: ${props => (!props.deleting ? "none" : null)};
`

function Word(props) {
  const {
    clip,
    word,
    setWordData,
    wordData,
    setPlayerControls,
    player,
    playerControls,
  } = props

  const [deleting, setDeleting] = useState(false)

  const deleteWordHandler = e => {
    e.preventDefault()
    setDeleting(true)
    deleteWord({
      ...props,
      index: clip.words.indexOf(word),
    })
  }

  const wordOptions = () => (
    <Menu>
      <Menu.Item
        onClick={() => setWordData({ ...wordData, selectedWord: word })}
      >
        <Popconfirm
          title="Are you sure delete this word?"
          onConfirm={e => deleteWordHandler(e)}
          okText="Yes"
          cancelText="No"
        >
          <Icon type="delete" />
          Delete
        </Popconfirm>
      </Menu.Item>
      <Menu.Item
        onClick={() =>
          setWordData({ ...wordData, selectedWord: word, editing: true })
        }
      >
        <Icon type="edit" />
        Edit
      </Menu.Item>
      <Menu.Item
        onClick={() =>
          setWordData({
            ...wordData,
            selectedWord: word,
            editing: true,
            inserting: 0,
          })
        }
      >
        <Icon type="arrow-left" />
        <Icon type="plus-circle" /> Insert Before
      </Menu.Item>
      <Menu.Item
        onClick={() =>
          setWordData({
            ...wordData,
            selectedWord: word,
            editing: true,
            inserting: 1,
          })
        }
      >
        <Icon type="arrow-right" />
        <Icon type="plus-circle" /> Insert After
      </Menu.Item>
      <Menu.Item
        onClick={() =>
          setWordData({
            ...wordData,
            selectedWord: word,
            citing: true,
          })
        }
      >
        <Icon type="snippets" />
        Cite
      </Menu.Item>
    </Menu>
  )

  return (
    <>
      <Popover
        key={word._id}
        content={
          <div>
            <Tag>{formatTimeStamp(word.startTime)} </Tag>
            <Icon
              type="play-circle"
              onClick={() => {
                player.current.seekTo(parseInt(word.startTime.replace("s", "")))
                setPlayerControls({ ...playerControls, playing: true })
              }}
            />
            {/* <Icon
            type="edit"
            onClick={() =>
              setWordData({ ...wordData, selectedWord: word, editing: true })
            }
          /> */}
            <Dropdown overlay={wordOptions()} trigger={["click"]}>
              <Icon type="down" />
            </Dropdown>
          </div>
        }
      >
        <span>
          {" "}
          <WordContainer
            deleting={deleting}
            word={word}
            selectedWord={wordData.selectedWord}
          >
            {word.word}
          </WordContainer>{" "}
        </span>
      </Popover>
    </>
  )
}

export default Word
