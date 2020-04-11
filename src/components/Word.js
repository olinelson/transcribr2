import React, { useState, useEffect } from 'react'

import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  DeleteOutlined,
  EditOutlined,
  MoreOutlined,
  PlayCircleOutlined,
  PlusCircleOutlined,
  SnippetsOutlined
} from '@ant-design/icons'

import { Popover, Tag, Dropdown, Menu, Popconfirm, Button } from 'antd'

import { deleteWord } from '../services/wordManagement'

import { formatTimeStamp, findIndexOfWord } from '../utils'

import styled, { keyframes } from 'styled-components'
import ButtonGroup from 'antd/lib/button/button-group'

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
    ? '#fffbe5'
      : 'none'};
 
  animation: ${flash} 0.5s alternate infinite linear;
  animation: ${props => (!props.deleting ? 'none' : null)};

  opacity: ${props =>
  props.clipProgress > parseInt(props.word.startTime) || (props.selectedWord && props.selectedWord._id === props.word._id)
    ? '1' : '.5'}
     ;
`

function Word (props) {
  const {
    word,
    player,
    playerControls,
    setPlayerControls,
    clip,
    setClip
  } = props

  const [clipProgress, setClipProgress] = useState(player.current ? player.current.getCurrentTime() : 0)

  const [deleting, setDeleting] = useState(false)

  const deleteWordHandler = word => {
    setClip(oldClip => ({ ...oldClip, selectedWord: word }))

    setDeleting(true)
    deleteWord({
      ...props,
      index: findIndexOfWord(word, clip.words)
    })
  }

  const getCurrentTime = () => {
    const currentTime = player.current ? player.current.getCurrentTime() : 0
    setClipProgress(currentTime)
  }

  useEffect(() => {
    const getCurrentTimeInterval = setInterval(getCurrentTime, 1000)

    return () => clearInterval(getCurrentTimeInterval)
  }, [])

  const wordOptions = () => (
    <Menu>
      <Menu.Item onClick={() => deleteWordHandler(word)}>
        <DeleteOutlined /> Delete

      </Menu.Item>
      <Menu.Item
        onClick={() =>
          setClip(oldClip => ({
            ...oldClip,
            focusedWord: undefined,
            editWordDrawerOpen: true
          }))}
      >
        <EditOutlined />
        Edit
      </Menu.Item>
      <Menu.Item
        onClick={() =>
          setClip(oldClip => ({
            ...oldClip,
            focusedWord: undefined,
            selectedWord: { ...word, inserting: 0 },
            editWordDrawerOpen: true
          }))}
      >
        <ArrowLeftOutlined />
        <PlusCircleOutlined /> Insert Before
      </Menu.Item>
      <Menu.Item
        onClick={() =>
          setClip(oldClip => ({
            ...oldClip,
            focusedWord: undefined,
            selectedWord: { ...word, inserting: 1 },
            editWordDrawerOpen: true
          }))}
      >
        <ArrowRightOutlined />
        <PlusCircleOutlined /> Insert After
      </Menu.Item>
      <Menu.Item
        onClick={() =>
          setClip(oldClip => ({
            ...oldClip,
            focusedWord: undefined,
            selectedWord: word,
            wordCitationModalOpen: true
          }))}
      >
        <SnippetsOutlined />
        Cite
      </Menu.Item>
    </Menu>
  )

  const selectWordAndFocus = (v) => {
    if (v) {
      setClip(oldClip => ({ ...oldClip, selectedWord: word, focusedWord: word }))
    } else {
      setClip(oldClip => ({ ...oldClip, focusedWord: undefined }))
    }
  }

  return <>
    <Popover
      trigger='click'
      key={word._id}
      onVisibleChange={(v) => selectWordAndFocus(v)}
      visible={clip.focusedWord && clip.focusedWord._id === word._id}
      content={
        <>
          <Tag style={{ marginBottom: '.5rem' }}>
            {formatTimeStamp(word.startTime)}{' '}
          </Tag>
          <div>
            <ButtonGroup>
              <Button
                onClick={() => {
                  player.current.seekTo(
                    parseInt(word.startTime.replace('s', ''))
                  )
                  setPlayerControls({ ...playerControls, playing: true })
                }}
              >
                <PlayCircleOutlined />
              </Button>

              <Dropdown overlay={wordOptions()} trigger={['click']}>
                <Button>
                  <MoreOutlined />
                </Button>
              </Dropdown>
            </ButtonGroup>
          </div>
        </>
      }
    >
      <span>
        {' '}
        <WordContainer
          style={{ cursor: 'pointer' }}
          deleting={deleting}
          word={word}
          selectedWord={clip.selectedWord}

          clipProgress={clipProgress}
        >
          {word.word}
        </WordContainer>{' '}
      </span>
    </Popover>

         </>
}

export default Word
