import React from "react"

import { Popover, Icon, Tag } from "antd"

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
}) => {
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
          <Icon
            type="edit"
            onClick={() =>
              setWordData({ ...wordData, selectedWord: word, editing: true })
            }
          />
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
