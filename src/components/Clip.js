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

import { Link, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
import styled from 'styled-components'

import {
  CheckCircleTwoTone,
  EditOutlined,
  FileSearchOutlined,
  FileTextOutlined,
  FileWordOutlined,
  LoadingOutlined,
  MessageOutlined,
  MoreOutlined,
  SmileOutlined,
  SnippetsOutlined
} from '@ant-design/icons'

import {
  Button,
  Pagination,
  Steps,
  Skeleton,
  Progress,
  Menu,
  Dropdown,
  Divider,
  Select
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
const { Option } = Select

const PaddedOnMobile = styled.div`
    @media (max-width: 600px) {
    padding-left: max(.5rem, env(safe-area-inset-left));
    padding-right: max(.5rem, env(safe-area-inset-right));
    }
  `

function Clip (props) {
  const _id = props.clipId
  const { appState, setAppState } = props

  const [editClipDrawerOpen, setEditClipDrawerOpen] = useState(false)
  const [searchClipDrawerOpen, setSearchClipDrawerOpen] = useState(false)

  const [clip, setClip] = useState({
    // loading
    loading: true,
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

    conversionJobId: undefined,
    conversionComplete: false,
    operationId: undefined,
    operationCompleted: false,
    progressPercent: 0
  })

  const [playerControls, setPlayerControls] = useState({
    playing: false,
    progress: 0,
    duration: 0,
    playbackRate: 1
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

    let updatesChannel

    if ('serviceWorker' in navigator && typeof (BroadcastChannel) !== 'undefined') {
      updatesChannel = new BroadcastChannel('clip-cache-update')
    }

    function joinClipChannel (token, cb) {
      socket.on('clipChannelUpdate', data => cb(data))
      socket.emit('joinClipChannel', token, _id)
    }

    function handleOffline () {
      socket.disconnect()
    }

    function handleOnline () {
      socket = openSocket(API_URL)
      joinClipChannel(token, notification => {
        notificationHandler(notification)
      })
      getClip(_id, clip, setClip)
    }

    function handleVisibilityChange () {
      if (document.visibilityState === 'visible') {
        joinClipChannel(token, notification => {
          notificationHandler(notification)
        })
        getClip(_id, clip, setClip)
      } else {
        socket.emit('leaveClipChannel', token, _id)
      }
    }

    const updateStateFromCache = async (event) => {
      const { cacheName, updatedURL } = event.data.payload
      const cache = await caches.open(cacheName)

      const updatedResponse = await cache.match(updatedURL)
      const clip = await updatedResponse.json()

      if (updatedResponse && cacheName === 'clip-cache') {
        openNotificationWithIcon('info', 'Updating')

        setClip(oldClip => ({
          ...oldClip,
          ...clip
        }))
      }
    }

    getClip(_id, clip, setClip, signal)

    joinClipChannel(token, notification => {
      notificationHandler(notification)
    })

    window.addEventListener('offline', handleOffline)
    window.addEventListener('online', handleOnline)

    document.addEventListener('visibilitychange', handleVisibilityChange)

    if (typeof (BroadcastChannel) !== 'undefined') {
      updatesChannel.addEventListener('message', updateStateFromCache)
    }

    return function cleanup (token) {
      socket.emit('leaveClipChannel', token, _id)
      controller.abort()
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('offline', handleOffline)
      window.removeEventListener('online', handleOnline)

      if (typeof (BroadcastChannel) !== 'undefined') {
        updatesChannel.removeEventListener('message', updateStateFromCache)
      }
    }
  }, [_id])

  const deleteClipHandler = async () => {
    setClip(oldClip => ({ ...oldClip, loading: true }))
    const success = await deleteClip(clip._id)
    if (success) {
      const clips = appState.clips.filter(c => c._id !== clip._id)
      setAppState(oldAppState => ({ ...oldAppState, clips }))
      navigate('/app')
    } else {
      setClip(oldClip => ({ ...oldClip, loading: false }))
    }
  }

  const getBrowserName = () => {
    let name = 'Unknown'
    if (navigator.userAgent.indexOf('MSIE') != -1) {
      name = 'MSIE'
    } else if (navigator.userAgent.indexOf('Firefox') != -1) {
      name = 'Firefox'
    } else if (navigator.userAgent.indexOf('Opera') != -1) {
      name = 'Opera'
    } else if (navigator.userAgent.indexOf('Chrome') != -1) {
      name = 'Chrome'
    } else if (navigator.userAgent.indexOf('Safari') != -1) {
      name = 'Safari'
    }
    return name
  }

  const showClipMedia = () => {
    if (!clip || !clip.rawFileName) return null

    return (
      <ReactPlayer
        config={{
          file: {
            attributes: {
              crossOrigin: getBrowserName() === 'Safari' ? 'anonymous' : null
            }
          }
        }}
        ref={player}
        url={`https://storage.googleapis.com/${clip.owner}/${clip.rawFileName}`}
        playing={playerControls.playing}
        controls
        playsinline
        pip

        height='auto'
        width='100%'
        progressInterval={100}
        playbackRate={playerControls.playbackRate}
        style={{
          justifySelf: 'center',
          minHeight: '.5rem',
          gridArea: 'clip'
        }}
      />
    )
  }

  const clipOptionsBar = () => (
    <PaddedOnMobile style={{ gridArea: 'toolbar' }}>
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
            <Select defaultValue={playerControls.playbackRate} style={{ width: '5rem' }} onChange={(d) => setPlayerControls({ ...playerControls, playbackRate: d })}>
              <Option value={1}>1x</Option>
              <Option value={1.5}>1.5x</Option>
              <Option value={1.75}>1.75x</Option>
              <Option value={2}>2x</Option>
              {/* <Option value={2.25}>2.25x</Option> */}
              {/* <Option value={2.5}>2.5x</Option> */}
            </Select>

            <Button
              disabled={!clip.words.length}
              onClick={() => setSearchClipDrawerOpen(true)}
            >
              <FileSearchOutlined />
            </Button>

            <Dropdown
              trigger={['click']}
              overlay={
                <Menu>
                  <Menu.Item
                    onClick={() =>
                      setEditClipDrawerOpen(true)}
                  >
                    <EditOutlined />
                    Edit
                  </Menu.Item>
                  <Menu.Item
                    onClick={() =>
                      setClip(oldClip => ({ ...oldClip, clipCitationModalOpen: true }))}
                  >
                    <SnippetsOutlined />
                    Cite
                  </Menu.Item>

                  <Menu.Item
                    disabled={!clip.words.length}
                    onClick={() => downloadTextFile()}
                  >
                    <FileTextOutlined />
                    .txt
                  </Menu.Item>
                  <Menu.Item
                    disabled={!clip.words.length}
                    onClick={() => downloadDocXFile()}
                  >
                    <FileWordOutlined />
                    .docx
                  </Menu.Item>
                </Menu>
              }
            >
              <Button>
                <MoreOutlined />
              </Button>
            </Dropdown>

          </Button.Group>

          <Divider />
        </div>
      ) : null}
    </PaddedOnMobile>
  )

  // TO DO - Break this out into a different component
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

  const maybeShowWordsParagraph = () => {
    if (clip.words.length) {
      const wordPages = splitWordsIntoPages(clip.words, clip.wordPageSize)
      const currentPageIndex = clip.currentPageIndex || 0

      return (
        <PaddedOnMobile style={{ gridArea: 'words' }}>
          <WordsContainer>
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
        </PaddedOnMobile>
      )
    }
  }

  const maybeShowTranscribeButtton = () => {
    if (!clip.conversionJobId) {
      return (
        <div style={{ gridArea: 'words', justifySelf: 'center' }}>
          <Button
            type='primary'
            loading={clip.transcriptionLoading}
            onClick={() =>
              setClip(oldClip => ({
                ...oldClip,
                transcribeModalOpen: true
              }))}
          >
            <MessageOutlined />
              Transcribe
          </Button>
        </div>
      )
    }
  }

  const maybeShowTranscribingLoadingState = () => {
    if (clip.conversionJobId && clip.operationCompleted === false) {
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
                    <CheckCircleTwoTone twoToneColor='#52c41a' />
                  ) : (
                    <LoadingOutlined />
                  )
                }
              />
              <Step
                status={clip.operationId ? 'process' : 'wait'}
                title='Transcribing'
                icon={
                  clip.conversionComplete ? (
                    <LoadingOutlined active />
                  ) : (
                    <MessageOutlined />
                  )
                }
              />

              <Step title='Done' icon={<SmileOutlined />} />
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
      setClip(oldClip => ({
        ...oldClip,
        currentPageIndex: pageNumber,
        selectedWord: word
      }))
      setSearchClipDrawerOpen(false)
    } else {
      setClip(oldClip => ({
        ...oldClip,
        currentPageIndex: pageNumber,
        selectedWord: word
      }))
    }

    // to accomodate for page change
    setTimeout(() => scroller.scrollTo(word._id, {
      duration: 500,
      smooth: true,
      offset: -100
    }), 5)
  }

  if (!clip || clip.loading) {
    return (
      <div>
        <div style={{ height: '4rem' }} />
        <PaddedOnMobile>
          <Skeleton active />
        </PaddedOnMobile>
      </div>
    )
  } else {
    return (
      <>
        <ClipContainer isVideo={clip.isVideo}>
          {showClipMedia()}

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
              setClip(oldClip => ({ ...oldClip, wordPageSize: num, currentPageIndex: 0 }))}
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

        <CitationModal setEditClipDrawerOpen={setEditClipDrawerOpen} setClip={setClip} clip={clip} />
        <WordCitationModal clip={clip} setClip={setClip} />
      </>
    )
  }
}

export default Clip
