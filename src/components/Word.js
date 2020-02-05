import React from "react"

import { Popover, Icon, Tag, Dropdown, Menu, Popconfirm } from "antd"

import { deleteWord, insertWord } from "../services/wordManagement"

import { formatTimeStamp } from "../utils"

import styled from "styled-components"

const WordContainer = styled.span`
  background: ${props =>
    props.selectedWord && props.selectedWord._id === props.word._id
      ? "#E6F7FF"
      : "none"};
  border-bottom: ${props =>
    props.selectedWord && props.selectedWord._id === props.word._id
      ? "2px solid #1890FF;"
      : "none"};
`

const Word = ({
  word,
  wordData,
  setWordData,
  player,
  playerControls,
  setPlayerControls,
  updateClipInProfile,
  clip,
}) => {
  const wordOptions = () => (
    <Menu>
      <Menu.Item>
        <Popconfirm
          title="Are you sure delete this word?"
          onConfirm={e =>
            deleteWord(
              e,
              wordData,
              setWordData,
              clip,
              updateClipInProfile,
              clip.words.indexOf(word)
            )
          }
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
        onClick={e =>
          insertWord(
            e,
            wordData,
            setWordData,
            clip,
            updateClipInProfile,
            { word: "NEW_WORD", startTime: word.startTime },
            clip.words.indexOf(word)
          )
        }
      >
        <Icon type="arrow-left" />
        <Icon type="plus-circle" /> Insert Before
      </Menu.Item>
      <Menu.Item
        onClick={e =>
          insertWord(
            e,
            wordData,
            setWordData,
            clip,
            updateClipInProfile,
            { word: "NEW_WORD", startTime: word.startTime },
            clip.words.indexOf(word) + 1
          )
        }
      >
        <Icon type="arrow-right" />
        <Icon type="plus-circle" /> Insert After
      </Menu.Item>
    </Menu>
  )

  return (
    <Popover
      key={word._id}
      content={
        <div>
          <Tag>{formatTimeStamp(word.startTime)} </Tag>
          <Icon
            type="login"
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
        <WordContainer word={word} selectedWord={wordData.selectedWord}>
          {word.word}
        </WordContainer>{" "}
      </span>
    </Popover>
  )
}

export default Word
