import React, { useState, useRef, useEffect } from 'react'
import { navigate } from 'gatsby'
import { API_URL } from '../config'

import { getToken } from '../services/auth'
import { deleteClip, getClip } from '../services/clipManagement'
import { splitWordsIntoPages } from '../services/wordManagement'

import openSocket from 'socket.io-client'
import ReactPlayer from 'react-player'
import { formatTimeStamp, findIndexOfWord } from '../utils'

import FileSaver from 'file-saver'

import { Document, Packer, Paragraph, Header, HeadingLevel, Footer } from 'docx'

import { ElementanimateScroll as scroller } from 'react-scroll'
import styled from 'styled-components'

// components
import {
  Icon,
  Button,
  Pagination,
  Steps,
  Skeleton,
  Progress,
  Menu,
  Dropdown,
  Divider
} from 'antd'
import { ClipContainer, WordsContainer } from './MyStyledComponents'
import { openNotificationWithIcon } from './Notifications'
import SearchClipDrawer from './SearchClipDrawer'
import EditWordDrawer from './EditWordDrawer'
import TranscriptionModal from './TranscriptionModal'
import EditClipDrawer from './EditClipDrawer'
import Word from './Word'
import CitationModal from './CitationModal'
import WordCitationModal from './WordCitationModal'
import SpanElement from './SpanElement'

const { Step } = Steps

function Clip (props) {
  const _id = props.clipId
  const { appState, setAppState } = props

  const [editClipDrawerOpen, setEditClipDrawerOpen] = useState(false)
  const [searchClipDrawerOpen, setSearchClipDrawerOpen] = useState(false)

  const [clip, setClip] = useState({
    // loading
    clipLoading: true,
    clipSaving: false,
    searchLoading: false,

    // clip
    words: [],
    _id,
    currentPageIndex: 0,
    selectedWord: undefined,

    wordPageSize: 200,
    wordPages: [],

    // modals/sidebars
    clipCitationModalOpen: false,
    wordCitationModalOpen: false,
    transcribeModalOpen: false,
    language: '',

    // search data
    searchInput: '',
    searchResults: [],

    progressPercent: 0
  })

  console.log({ clip })

  const [playerControls, setPlayerControls] = useState({
    playing: false,
    progress: 0,
    duration: 0
  })
  const player = useRef(null)

  const notificationHandler = notification => {
    if (notification.name === 'transcriptionUpdate') {
      setClip({
        ...notification.data.clip,
        editClipDrawerOpen: clip.editClipDrawerOpen || false,
        currentPageIndex: 0,
        currentPageSize: 200,
        loading: false
      })
    } else {
      openNotificationWithIcon('success', notification.message)
    }

    if (notification.name === 'joinedClipChannel') {
    }
  }

  useEffect(() => {
    let socket = openSocket(API_URL)
    const token = getToken()

    const controller = new AbortController()
    const signal = controller.signal

    function joinClipChannel (token, cb) {
      socket.on('clipChannelUpdate', data => cb(data))
      socket.emit('joinClipChannel', token, _id)
    }

    function handleOffline () {
      console.log('clip offline')
      // socket.emit('leaveClipChannel', token, _id)
      socket.disconnect()
    }

    function handleOnline () {
      console.log('clip online!')
      socket = openSocket(API_URL)
      joinClipChannel(token, notification => {
        notificationHandler(notification)
      })
      if (!clip.words.length && clip.conversionJobId) {
        getClip(_id, clip, setClip)
      }
    }

    function handleVisibilityChange () {
      if (document.visibilityState === 'visible') {
        joinClipChannel(token, notification => {
          notificationHandler(notification)
        })
        console.log('visibility change', { clip })
        if ((!clip.words.length || clip.words.legnth < 1) && clip.conversionJobId) {
          console.log('getting clip', clip)
          getClip(_id, clip, setClip)
        }
      } else {
        socket.emit('leaveClipChannel', token, _id)
      }
    }

    setClip({ ...clip, loading: true })
    getClip(_id, clip, setClip, signal)

    joinClipChannel(token, notification => {
      notificationHandler(notification)
    })

    window.addEventListener('offline', handleOffline)
    window.addEventListener('online', handleOnline)

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return function cleanup (token) {
      socket.emit('leaveClipChannel', token, _id)
      controller.abort()
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [_id])

  const deleteClipHandler = async () => {
    setClip({ ...clip, loading: true })
    const success = await deleteClip(clip._id)
    if (success) {
      const clips = appState.clips.filter(c => c._id !== clip._id)

      setAppState({
        ...appState,
        clips
      })
      navigate('/app')
    } else {
      setClip({ ...clip, loading: false })
    }
  }

  const showClipAudio = () => {
    if (!clip || !clip.rawFileName) return null

    return (
      <>
        <ReactPlayer
          ref={player}
          url={`https://storage.googleapis.com/${clip.owner}/${clip.rawFileName}`}
          playing={playerControls.playing}
          controls
          playsinline
          pip
          height='100%'
          width='100%'
          style={{
            justifySelf: 'center',
            width: '100%',
            marginTop: '.5rem',
            minHeight: '.5rem',
            gridArea: 'clip'
          }}
        />
      </>
    )
  }

  const clipOptionsBar = () => (
    <div style={{ gridArea: 'toolbar' }}>
      {clip ? (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            alignItems: 'end'
          }}
        >
          <h2
            style={{ cursor: 'pointer', margin: 0, maxWidth: '85vw', wordWrap: 'break-word' }}
          >
            {clip.name}
          </h2>

          <Button.Group style={{ justifySelf: 'end' }}>

            <Button
              disabled={!clip.words.length}
              onClick={() => setSearchClipDrawerOpen(true)}
            >
              <Icon type='file-search' />
            </Button>
            <Dropdown
              trigger={['click']}
              overlay={
                <Menu>
                  <Menu.Item
                    onClick={() =>
                      setEditClipDrawerOpen(true)}
                  >
                    <Icon type='edit' />
                    Edit
                  </Menu.Item>
                  <Menu.Item
                    onClick={() =>
                      setClip({ ...clip, clipCitationModalOpen: true })}
                  >
                    <Icon type='snippets' />
                    Cite
                  </Menu.Item>

                  <Menu.Item
                    disabled={!clip.words.length}
                    onClick={() => downloadTextFile()}
                  >
                    <Icon type='file-text' />
                    .txt
                  </Menu.Item>
                  <Menu.Item
                    disabled={!clip.words.length}
                    onClick={() => downloadDocXFile()}
                  >
                    <Icon type='file-word' />
                    .docx
                  </Menu.Item>
                </Menu>
              }
            >
              <Button>
                <Icon type='more' />
              </Button>
            </Dropdown>
          </Button.Group>

          <Divider />
        </div>
      ) : null}
    </div>
  )

  const downloadDocXFile = () => {
    const doc = new Document()

    const children = splitWordsIntoPages(clip.words, 100)
      .map(p => {
        return [
          new Paragraph({
            text: formatTimeStamp(p[0].startTime),
            heading: HeadingLevel.HEADING_4
          }),
          new Paragraph({
            text: p.map(w => w.word).join(' ')
          })
        ]
      })
      .flat()

    doc.addSection({
      headers: {
        first: new Header({
          children: [
            new Paragraph({
              text: clip.name,
              heading: HeadingLevel.HEADING_1
            })
          ]
        })
      },
      footers: {
        default: new Footer({
          children: [
            new Paragraph(clip.name + ' - Transcribed with transcribrapp.com')
          ]
        })
      },
      children: children
    })

    Packer.toBlob(doc).then(blob => {
      FileSaver.saveAs(blob, `${clip.name}.docx`)
    })
  }

  const downloadTextFile = () => {
    const allWords = clip.words.map(w => w.word).join(' ')
    const file = new Blob([allWords], {
      type: 'text/plain'
    })
    FileSaver.saveAs(file, clip.name + '.txt')
  }

  const StyledElement = styled(Element)`
    display: flex;
  `

  const maybeShowWordsParagraph = () => {
    if (clip.words.length) {
      const wordPages = splitWordsIntoPages(clip.words, clip.wordPageSize)
      const currentPageIndex = clip.currentPageIndex || 0

      return (
        <WordsContainer style={{ gridArea: 'words' }}>
          <p>
            {wordPages[currentPageIndex].map(w => (
              <SpanElement
                name={w._id}
                key={'span' + w._id}
              >
                <Word
                  key={w._id}
                  word={w}
                  player={player}
                  playerControls={playerControls}
                  setPlayerControls={setPlayerControls}
                  clip={clip}
                  setClip={setClip}
                />
              </SpanElement>
            ))}
          </p>
        </WordsContainer>
      )
    }
  }

  const maybeShowTranscribeButtton = () => {
    if (!clip.words || !clip.words.length) {
      if (!clip.conversionJobId) {
        return (
          <div style={{ gridArea: 'words', justifySelf: 'center' }}>
            <Button
              type='primary'
              loading={clip.transcriptionLoading}
              onClick={() =>
                setClip({
                  ...clip,
                  transcribeModalOpen: true
                })}
            >
              <Icon type='message' />
              Transcribe
            </Button>
          </div>
        )
      }
    }
  }

  const maybeShowTranscribingLoadingState = () => {
    if (!clip.words.length && clip.conversionJobId) {
      return (
        <div
          style={{
            display: 'grid',
            gridArea: 'words',
            height: '100%',

            justifyItems: 'center',
            alignItems: 'center',
            alignContent: 'center',
            gridTemplateRows: 'auto auto auto auto',
            borderRadius: '6px',
            backgroundColor: '#fafafa',
            padding: '1rem'
          }}
        >
          <>
            <Steps style={{ padding: '1rem' }}>
              <Step
                status={clip.conversionComplete ? 'finish' : 'process'}
                title='Converting'
                icon={
                  clip.conversionComplete ? (
                    <Icon
                      type='check-circle'
                      theme='twoTone'
                      twoToneColor='#52c41a'
                    />
                  ) : (
                    <Icon type='loading' />
                )
                }
              />
              <Step
                status={clip.operationId ? 'process' : 'wait'}
                title='Transcribing'
                icon={
                  clip.conversionComplete ? (
                    <Icon active type='loading' />
                  ) : (
                    <Icon type='message' />
                )
                }
              />

              <Step title='Done' icon={<Icon type='smile-o' />} />
            </Steps>
            {clip.operationId ? (
              <Progress
                style={{ padding: '.25rem', marginRight: '-8px' }}
                percent={clip.progressPercent || 1}
                status='active'
              />
            ) : null}
          </>
        </div>
      )
    }
  }

  const navigateToWord = word => {
    const wordIndex = findIndexOfWord(word, clip.words)
    const wordPageSize = clip.wordPageSize || 200
    const pageNumber = Math.floor(wordIndex / wordPageSize)

    if (window.innerWidth < 800) {
      setClip({
        ...clip,
        currentPageIndex: pageNumber,
        selectedWord: word
      })
      setSearchClipDrawerOpen(false)
    } else {
      setClip({
        ...clip,
        currentPageIndex: pageNumber,
        selectedWord: word
      })
    }

    // to accomodate for page change
    setTimeout(() => scroller.scrollTo(word._id, {
      duration: 500,
      smooth: true,
      offset: -100 // Scrolls to element + 50 pixels down the page
    }), 5)
  }

  if (!clip || clip.loading) {
    return (
      <div>
        <div style={{ height: '4rem' }} />
        <Skeleton active />
      </div>
    )
  } else {
    return (
      <>
        <ClipContainer isVideo={clip.isVideo}>
          {showClipAudio()}

          {clipOptionsBar()}

          {maybeShowWordsParagraph()}

          {maybeShowTranscribeButtton()}

          {maybeShowTranscribingLoadingState()}

          <Pagination
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignSelf: 'center',
              gridArea: 'pagination',
              margin: '1rem 0',
              flexWrap: 'wrap'
            }}
            size='small'
            showQuickJumper
            showSizeChanger
            onChange={e => setClip({ ...clip, currentPageIndex: e - 1 })}
            current={clip.currentPageIndex + 1}
            pageSizeOptions={['200', '300', '400', '500', '600']}
            onShowSizeChange={(e, num) =>
              setClip({ ...clip, wordPageSize: num, currentPageIndex: 0 })}
            total={clip.words.length}
            pageSize={clip.wordPageSize || 200}
            hideOnSinglePage
          />
        </ClipContainer>

        <EditClipDrawer
          clip={clip}
          setClip={setClip}
          setEditClipDrawerOpen={setEditClipDrawerOpen}
          editClipDrawerOpen={editClipDrawerOpen}
          deleteClipHandler={deleteClipHandler}
          {...props}
        />

        <SearchClipDrawer
          navigateToWord={navigateToWord}
          setPlayerControls={setPlayerControls}
          clip={clip}
          setClip={setClip}
          searchClipDrawerOpen={searchClipDrawerOpen}
          setSearchClipDrawerOpen={setSearchClipDrawerOpen}
          playerControls={playerControls}
          player={player}

        />

        <EditWordDrawer setClip={setClip} clip={clip} />

        <TranscriptionModal
          clip={clip}
          setClip={setClip}
          player={player}
        />

        <CitationModal setClip={setClip} clip={clip} />
        <WordCitationModal clip={clip} setClip={setClip} />
      </>
    )
  }
}

export default Clip
