import React, { useRef } from 'react'
import { Modal, Icon } from 'antd'

import moment from 'moment'

import styled from 'styled-components'
import { openNotificationWithIcon } from './Notifications'
import TextArea from 'antd/lib/input/TextArea'
import { formatTimeStamp } from '../utils'

const CitationContainer = styled.div`
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    grid-gap: 1rem;
  `

function WordCitationModal (props) {
  const { clip, setClip } = props

  const mlaRef = useRef(null)
  const apaRef = useRef(null)
  // const chicagoRef = useRef(null)
  // const harvardRef = useRef(null)
  // const vancouverRef = useRef(null)

  function copyToClipboard (ref, style) {
    navigator.clipboard.writeText(ref.current.state.value)

    openNotificationWithIcon('success', `Copied ${style} citation!`)
  }

  if (!clip.selectedWord) return null
  return (
    <Modal
      onCancel={() => setClip({ ...clip, wordCitationModalOpen: false })}
      footer={null}
      visible={clip.wordCitationModalOpen}
      title='Citation'
      autoSize
      centered
    >
      <CitationContainer>
        {/* APA */}

        <h4>APA</h4>
        <TextArea
          className='ant-input'
          autoSize
          readOnly
          style={{
            resize: 'none'
          }}
          name='Apa'
          ref={apaRef}
          //   (University of Oxford, 2019, 0:29)
          value={`(${clip.citation.lastName}, ${moment(
            clip.citation.datePosted
          ).format('YYYY')}, ${formatTimeStamp(clip.selectedWord.startTime)})`}
        />
        <Icon type='copy' onClick={() => copyToClipboard(apaRef, 'APA')} />

        <h4>MLA</h4>
        <TextArea
          className='ant-input'
          autoSize
          readOnly
          style={{
            resize: 'none'
          }}
          ref={mlaRef}
          value={`(${clip.citation.lastName}, ${formatTimeStamp(
            clip.selectedWord.startTime
          )})`}
        />
        <Icon type='copy' onClick={() => copyToClipboard(apaRef, 'MLA')} />
      </CitationContainer>
    </Modal>
  )
}

export default WordCitationModal
