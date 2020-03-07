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

// components
import {
  Icon,
  Button,
  Pagination,
  Steps,
  Skeleton,
  Progress,
  Menu,
  Dropdown
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

const { Step } = Steps

function Clip (props) {
  const _id = props.clipId
  const { appState, setAppState } = props

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
    searchModalOpen: false,
    editClipDrawerOpen: false,

    // search data
    searchInput: '',
    searchResults: [],

    progressPercent: 0
  })

  const [playerControls, setPlayerControls] = useState({
    playing: false,
    progress: 0,
    duration: 0
  })
  const player = useRef(null)

  const notificationHandler = notification => {
    if (notification.name === 'transcriptionUpdate') {
      setClip({
        currentPageIndex: 0,
        currentPageSize: 200,
        ...notification.data.clip,
        loading: false
      })
    } else {
      openNotificationWithIcon('success', notification.message)
    }

    if (notification.name === 'joinedClipChannel') {
      // console.log(notification.message)
    }
  }

  useEffect(() => {
    const socket = openSocket(API_URL)
    const token = getToken()

    function joinClipChannel (token, cb) {
      socket.on('clipChannelUpdate', data => cb(data))
      socket.emit('joinClipChannel', token, _id)
    }
    setClip({ ...clip, loading: true })
    getClip(_id, clip, setClip)

    joinClipChannel(token, notification => {
      notificationHandler(notification)
    })

    return function leaveClipChannel (token) {
      socket.emit('leaveClipChannel', token, _id)
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
            // maxWidth: clip.isVideo ? '30rem' : '100%',
            // maxHeight: '40vh',
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
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap'
          }}
        >
          <h1
            className='ant-dropdown-link'
            style={{ cursor: 'pointer', margin: 0, maxWidth: '50vw' }}
          >
            {clip.name}
          </h1>

          <Button.Group>

            <Button
              disabled={!clip.words.length}
              onClick={() => setClip({ ...clip, searchClipDrawerOpen: true })}
            >
              <Icon type='file-search' />
            </Button>
            <Dropdown
              trigger={['click']}
              overlay={
                <Menu>
                  <Menu.Item
                    onClick={() =>
                      setClip({ ...clip, editClipDrawerOpen: true })}
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

  const maybeShowWordsParagraph = () => {
    if (clip.words.length) {
      const wordPages = splitWordsIntoPages(clip.words, clip.wordPageSize)
      const currentPageIndex = clip.currentPageIndex || 0

      return (
        <WordsContainer style={{ gridArea: 'words' }}>
          <p>
            {wordPages[currentPageIndex].map(w => (
              <Word
                key={w._id}
                word={w}
                player={player}
                playerControls={playerControls}
                setPlayerControls={setPlayerControls}
                clip={clip}
                setClip={setClip}
              />
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
    setClip({
      ...clip,
      currentPageIndex: pageNumber,
      selectedWord: word
    })
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
              setClip({ ...clip, wordPageSize: num })}
            total={clip.words.length}
            pageSize={clip.wordPageSize || 200}
            hideOnSinglePage
          />
        </ClipContainer>

        <EditClipDrawer
          clip={clip}
          setClip={setClip}
          deleteClipHandler={deleteClipHandler}
          {...props}
        />

        <SearchClipDrawer
          navigateToWord={navigateToWord}
          setPlayerControls={setPlayerControls}
          clip={clip}
          setClip={setClip}
          playerControls={playerControls}
          player={player}
        />

        <EditWordDrawer setClip={setClip} clip={clip} />

        <TranscriptionModal
          // convertClip={convertClip}
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
