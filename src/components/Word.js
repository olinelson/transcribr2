import React, { useState } from "react"

import { Popover, Icon, Tag, Dropdown, Menu, Popconfirm, Button } from "antd"

import { deleteWord } from "../services/wordManagement"

import { formatTimeStamp } from "../utils"

import styled, { keyframes } from "styled-components"
import ButtonGroup from "antd/lib/button/button-group"

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
    word,
    player,
    playerControls,
    setPlayerControls,
    clip,
    setClip,
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
      <Menu.Item onClick={() => setClip({ ...clip, selectedWord: word })}>
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
          setClip({
            ...clip,
            selectedWord: word,
            editWordDrawerOpen: true,
          })
        }
      >
        <Icon type="edit" />
        Edit
      </Menu.Item>
      <Menu.Item
        onClick={() =>
          setClip({
            ...clip,
            selectedWord: { ...word, inserting: 0 },
            editWordDrawerOpen: true,
          })
        }
      >
        <Icon type="arrow-left" />
        <Icon type="plus-circle" /> Insert Before
      </Menu.Item>
      <Menu.Item
        onClick={() =>
          setClip({
            ...clip,
            selectedWord: { ...word, inserting: 1 },
            editWordDrawerOpen: true,
          })
        }
      >
        <Icon type="arrow-right" />
        <Icon type="plus-circle" /> Insert After
      </Menu.Item>
      <Menu.Item
        onClick={() =>
          setClip({
            ...clip,
            selectedWord: word,
            wordCitationModalOpen: true,
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
        trigger="click"
        key={word._id}
        content={
          <>
            <Tag style={{ marginBottom: ".5rem" }}>
              {formatTimeStamp(word.startTime)}{" "}
            </Tag>
            <div>
              <ButtonGroup>
                <Button
                  onClick={() => {
                    player.current.seekTo(
                      parseInt(word.startTime.replace("s", ""))
                    )
                    setPlayerControls({ ...playerControls, playing: true })
                  }}
                >
                  <Icon type="play-circle" />
                </Button>

                <Dropdown overlay={wordOptions()} trigger={["click"]}>
                  <Button>
                    <Icon type="more" />
                  </Button>
                </Dropdown>
              </ButtonGroup>
            </div>
          </>
        }
      >
        <span>
          {" "}
          <WordContainer
            style={{ cursor: "pointer" }}
            deleting={deleting}
            word={word}
            selectedWord={clip.selectedWord}
            onClick={() => setClip({ ...clip, selectedWord: word })}
          >
            {word.word}
          </WordContainer>{" "}
        </span>
      </Popover>
    </>
  )
}

export default Word
