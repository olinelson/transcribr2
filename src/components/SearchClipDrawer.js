import React, { useState } from 'react'
import { debounce } from 'debounce'

import { ClockCircleOutlined, EyeOutlined, PlayCircleOutlined } from '@ant-design/icons'

import { Drawer, Input, List, Button } from 'antd'
import styled from 'styled-components'

import { formatTimeStamp } from '../utils'

const { Search } = Input

const WordTitle = styled.span`
 background: ${props =>
    props.selectedWord && props.selectedWord._id === props.word._id
      ? '#E6F7FF'
      : 'none'};
  `

function SearchClipDrawer (props) {
  const {
    navigateToWord,
    setPlayerControls,
    playerControls,
    player,
    clip,
    setClip
  } = props

  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  const filterWords = (query, words) => {
    return words.filter(w => w.word.toLowerCase().includes(query.toLowerCase()))
  }

  const onSearch = (query, words) => {
    setLoading(true)

    let results = []

    if (query.length) {
      setTimeout(() => {
        results = filterWords(query, words)
        setResults(results)
        setLoading(false)
      }, 50)
    }
  }

  const onChange = (query, words) => {
    if (query.length < 3) return setResults([])

    let results = []

    setLoading(true)
    results = filterWords(query, words)
    setResults(results)
    setTimeout(() => {
      setLoading(false)
    }, 50)
  }

  return (
    <Drawer
      title='Search'
      mask={false}
      maskClosable={false}
      visible={clip.searchClipDrawerOpen}
      onClose={() => setClip(oldClip => ({ ...oldClip, searchClipDrawerOpen: false }))}
    >
      <Search
        style={{ marginBottom: '1rem' }}
        placeholder='input search text'
        onSearch={query => debounce(onSearch(query, clip.words), 1000)}
        onChange={e => debounce(onChange(e.target.value, clip.words), 1000)}
        enterButton
        loading={loading}
      />

      <List
        style={{
          height: '80vh',
          overflow: 'scroll'
        }}
        itemLayout='horizontal'
        dataSource={results}
        loadMore
        renderItem={word => (
          <List.Item

            actions={[
              <Button
                key={word._id + 'navigateButton'}
                size='small'
                type='primary'
                ghost
                onClick={() => navigateToWord(word)}
              >
                <EyeOutlined />
              </Button>,
              <Button
                key={word._id + 'playButton'}
                onClick={() => {
                  player.current.seekTo(
                    parseInt(word.startTime.replace('s', ''))
                  )
                  setPlayerControls({
                    ...playerControls,
                    playing: true
                  })
                }}
                size='small'
                type='primary'
                ghost
              >
                <PlayCircleOutlined />
              </Button>
            ]}
          >
            <List.Item.Meta
              // style={{ background: 'rgba(24,144,255,0.5)' }}
              title={<WordTitle className='ant-list-item-meta-title' selectedWord={clip.selectedWord} word={word}>{word.word}</WordTitle>}

              description={
                <span>
                  <ClockCircleOutlined onClick={() => navigateToWord(word)} />{' '}
                  {formatTimeStamp(word.startTime)}{' '}
                </span>
              }
            />
          </List.Item>
        )}
      />
    </Drawer>
  )
}

export default SearchClipDrawer
