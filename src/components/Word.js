import React, { useState } from 'react'

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
  props.clipProgress.playedSeconds > parseInt(props.word.startTime) || (props.selectedWord && props.selectedWord._id === props.word._id)
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
    setClip,
    clipProgress
  } = props

  const [deleting, setDeleting] = useState(false)

  const deleteWordHandler = word => {
    setClip({ ...clip, selectedWord: word })

    setDeleting(true)
    deleteWord({
      ...props,
      index: findIndexOfWord(word, clip.words)
    })
  }

  const wordOptions = () => (
    <Menu>
      <Menu.Item onClick={() => deleteWordHandler(word)}>
        <DeleteOutlined /> Delete

      </Menu.Item>
      <Menu.Item
        onClick={() =>
          setClip({
            ...clip,
            selectedWord: word,
            editWordDrawerOpen: true
          })}
      >
        <EditOutlined />
        Edit
      </Menu.Item>
      <Menu.Item
        onClick={() =>
          setClip({
            ...clip,
            selectedWord: { ...word, inserting: 0 },
            editWordDrawerOpen: true
          })}
      >
        <ArrowLeftOutlined />
        <PlusCircleOutlined /> Insert Before
      </Menu.Item>
      <Menu.Item
        onClick={() =>
          setClip({
            ...clip,
            selectedWord: { ...word, inserting: 1 },
            editWordDrawerOpen: true
          })}
      >
        <ArrowRightOutlined />
        <PlusCircleOutlined /> Insert After
      </Menu.Item>
      <Menu.Item
        onClick={() =>
          setClip({
            ...clip,
            selectedWord: word,
            wordCitationModalOpen: true
          })}
      >
        <SnippetsOutlined />
        Cite
      </Menu.Item>
    </Menu>
  )

  return <>
    <Popover
      trigger='click'
      key={word._id}
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
          onClick={() => setClip({ ...clip, selectedWord: word })}
          clipProgress={clipProgress}
        >
          {word.word}
        </WordContainer>{' '}
      </span>
    </Popover>
         </>
}

export default Word
