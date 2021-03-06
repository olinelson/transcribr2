import React, { useRef } from 'react'
import { CopyOutlined, MacCommandFilled, HighlightOutlined } from '@ant-design/icons'
import { Modal, Button } from 'antd'

import { getBrowserName } from '../utils'

import moment from 'moment'

import styled from 'styled-components'
import { openNotificationWithIcon } from './Notifications'

const copyOrHighlightIcon = getBrowserName() === 'Safari' ? <HighlightOutlined /> : <CopyOutlined />

const CitationContainer = styled.div`
    display: grid;
    grid-template-columns: auto auto auto;
    align-items: center;
    grid-gap: 1rem;
    max-width: 80vw;

  span {
    word-break: break-all;
 }
    

  `

function CitationModal (props) {
  const { clip, setClip } = props

  const mlaRef = useRef(null)
  const apaRef = useRef(null)
  const chicagoRef = useRef(null)
  const harvardRef = useRef(null)
  const vancouverRef = useRef(null)

  if (!clip.citation) return null

  const {
    firstName = 'First Name',
    middleInitial = 'Middle Initial',
    contributorTitle = 'Contributor Title',
    lastName = 'Last Name',
    mediaDescription = 'Media Description',
    showTitle = 'Show Title',
    episodeTitle = 'Episode Title',
    publisher = 'Publisher',
    datePosted = moment().unix(),
    dateAccessed = moment().unix(),
    placeOfRecording = 'Place Of Recording',
    url = 'URL'
  } = clip.citation

  function copyToClipboard (ref, style) {
    navigator.clipboard.writeText(ref.current.innerHTML)

    openNotificationWithIcon('success', `Copied ${style} citation.`)
  }

  function copyHtmlToClipboard (ref, style) {
    function listener (e) {
      e.clipboardData.setData('text/html', ref.current.innerHTML)
      e.clipboardData.setData('text/plain', ref.current.innerHTML)
      e.preventDefault()
    }
    document.addEventListener('copy', listener)
    document.execCommand('copy')
    document.removeEventListener('copy', listener)

    const node = ref.current

    if (document.body.createTextRange) {
      const range = document.body.createTextRange()
      range.moveToElementText(node)
      range.select()
    } else if (window.getSelection) {
      const selection = window.getSelection()
      const range = document.createRange()
      range.selectNodeContents(node)
      selection.removeAllRanges()
      selection.addRange(range)
    } else {
      console.warn('Could not select text in node: Unsupported browser.')
    }

    if (getBrowserName() !== 'Safari') openNotificationWithIcon('success', `Copied ${style} citation.`)
  }

  const goToEditClip = () => {
    setClip(oldClip => ({ ...oldClip, clipCitationModalOpen: false, editClipDrawerOpen: true }))
  }

  return (
    <Modal
      onCancel={() =>
        setClip(oldClip => ({
          ...oldClip,
          clipCitationModalOpen: false
        }))}
      footer={null}
      visible={clip.clipCitationModalOpen}
      title='Citation'
      autoSize
      centered
      width='auto'
    >
      <p>Doesn't look right? <Button style={{ padding: 0, margin: 0 }} onClick={() => goToEditClip()} type='link'>Add more details</Button> to your clip to see properly formatted citation.</p>
      <CitationContainer>
        <h4>APA</h4>
        <span ref={apaRef}>
          {lastName}, {firstName[0]}. ({moment(datePosted).format('YYYY, MMMM D')}) <i>{episodeTitle}</i> [{mediaDescription}] {showTitle} {url}
        </span>

        <Button onClick={() => copyHtmlToClipboard(apaRef, 'APA')}>
          {copyOrHighlightIcon}
        </Button>

        <h4>MLA</h4>
        <span ref={mlaRef}>
          {lastName}, {firstName[0]} {middleInitial}. "{episodeTitle}" {mediaDescription}. {showTitle}. {publisher}, {moment(datePosted).format('DD MMMM YYYY')}. Web. {moment(dateAccessed).format('DD MMMM YYYY')}
        </span>
        <Button onClick={() => copyHtmlToClipboard(mlaRef, 'MLA')}>
          {copyOrHighlightIcon}
        </Button>

        <h4>Vancouver</h4>
        <span ref={vancouverRef}>
          {lastName} {firstName[0]}. {episodeTitle}. {showTitle} [{mediaDescription}]. {placeOfRecording}: {publisher}; {moment(datePosted).format('YYYY')} [cited {moment(dateAccessed).format('YYYY')}]. Available from: {url}.
        </span>
        <Button onClick={() => copyHtmlToClipboard(vancouverRef, 'Vancouver')}>
          {copyOrHighlightIcon}
        </Button>

        <h4>Chicago</h4>
        <span ref={chicagoRef}>
          {lastName}, {firstName}. "{episodeTitle}". {showTitle}. {mediaDescription}, {moment(datePosted).format('MMM. DD, YYYY')}. {url}
        </span>
        <Button onClick={() => copyHtmlToClipboard(chicagoRef, 'Chicago')}>
          {copyOrHighlightIcon}
        </Button>

        <h4>Harvard</h4>
        <span ref={harvardRef}>
          {lastName}, {firstName[0]}.  ({moment(datePosted).format('YYYY')}). {showTitle}. [{mediaDescription}] {episodeTitle}. Available at: {url} [Accessed {moment(dateAccessed).format('D MMM. YYYY')}].
        </span>
        <Button onClick={() => copyHtmlToClipboard(harvardRef, 'Harvard')}>
          {copyOrHighlightIcon}
        </Button>
      </CitationContainer>
    </Modal>
  )
}

export default CitationModal
