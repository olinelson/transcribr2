import React, { useRef } from "react"
import { Modal, Icon } from "antd"

import moment from "moment"

import styled from "styled-components"
import { openNotificationWithIcon } from "./Notifications"

function CitationModal(props) {
  const { citationModalOpen, setCitationModalOpen, clip } = props

  const {
    name,
    contributorName,
    showTitle,
    episodeTitle,
    publisher,
    datePosted,
    url,
  } = clip.citation

  const mlaRef = useRef(null)
  const apaRef = useRef(null)
  const chicagoRef = useRef(null)
  const harvardRef = useRef(null)
  const vancouverRef = useRef(null)

  function copyToClipboard(e, ref) {
    ref.current.select()
    document.execCommand("copy")
    openNotificationWithIcon("success", "Copied!")
    // This is just personal preference.
    // I prefer to not show the the whole text area selected.
    e.target.focus()
    // setCopySuccess("Copied!")
  }

  const CitationContainer = styled.div`
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    grid-gap: 1rem;
  `

  return (
    <Modal
      onCancel={() => setCitationModalOpen(false)}
      footer={null}
      visible={citationModalOpen}
      title="Citation"
      autoSize
      centered
    >
      <CitationContainer>
        <h4>MLA</h4>
        <textarea
          className="ant-input"
          // rows={4}
          autoSize
          readOnly
          style={{
            resize: "none",
            display: "flex",
          }}
          ref={mlaRef}
          value={`${contributorName}. ${showTitle} - ${episodeTitle}. ${publisher}, (${moment(
            datePosted
          ).year()}) ${url} ${datePosted}`}
        />
        <Icon type="copy" onClick={e => copyToClipboard(e, mlaRef)} />
      </CitationContainer>
      <CitationContainer>
        <h4>APA</h4>
        <textarea
          className="ant-input"
          // rows={4}
          autoSize
          readOnly
          style={{
            resize: "none",
            display: "flex",
          }}
          ref={apaRef}
          value={`${contributorName}, (${moment(
            datePosted
          ).year()}). ${showTitle} - ${episodeTitle}. ${url} `}
        />
        <Icon type="copy" onClick={e => copyToClipboard(e, apaRef)} />
      </CitationContainer>
    </Modal>
  )
}

export default CitationModal
