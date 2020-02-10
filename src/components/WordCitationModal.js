import React, { useRef } from "react"
import { Modal, Icon } from "antd"

import moment from "moment"

import styled from "styled-components"
import { openNotificationWithIcon } from "./Notifications"
import TextArea from "antd/lib/input/TextArea"
import { formatTimeStamp } from "../utils"

function WordCitationModal(props) {
  const { wordData, setWordData, clip } = props

  const {
    firstName = "First Name",
    middleInitial = "Middle Initial",
    contributorTitle = "Contributor Title",
    lastName = "Last Name",
    mediaDescription = "Media Description",
    showTitle = "Show Title",
    episodeTitle = "Episode Title",
    publisher = "Publisher",
    datePosted = moment().unix(),
    dateAccessed = moment().unix(),
    placeOfRecording = "Place Of Recording",
    url = "URL",
  } = clip.citation

  const mlaRef = useRef(null)
  const apaRef = useRef(null)
  const chicagoRef = useRef(null)
  const harvardRef = useRef(null)
  const vancouverRef = useRef(null)

  function copyToClipboard(ref, style) {
    navigator.clipboard.writeText(ref.current.state.value)

    openNotificationWithIcon("success", `Copied ${style} citation!`)
  }

  const CitationContainer = styled.div`
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    grid-gap: 1rem;
  `

  if (!wordData.selectedWord) return null
  return (
    <Modal
      onCancel={() => setWordData({ ...wordData, citing: false })}
      footer={null}
      visible={wordData.citing}
      title="Citation"
      autoSize
      centered
    >
      <CitationContainer>
        {/* APA */}

        <h4>APA</h4>
        <TextArea
          className="ant-input"
          autoSize
          readOnly
          style={{
            resize: "none",
          }}
          name="Apa"
          ref={apaRef}
          //   (University of Oxford, 2019, 0:29)
          value={`(${clip.citation.lastName}, ${moment(
            clip.citation.datePosted
          ).format("YYYY")}, ${formatTimeStamp(
            wordData.selectedWord.startTime
          )})`}
        />
        <Icon type="copy" onClick={() => copyToClipboard(apaRef, "APA")} />

        <h4>MLA</h4>
        <TextArea
          className="ant-input"
          autoSize
          readOnly
          style={{
            resize: "none",
          }}
          ref={mlaRef}
          value={`(${clip.citation.lastName}, ${formatTimeStamp(
            wordData.selectedWord.startTime
          )})`}
        />
        <Icon type="copy" onClick={() => copyToClipboard(apaRef, "MLA")} />

        {/* 

        <h4>Vancouver</h4>
        <TextArea
          className="ant-input"
          autoSize
          readOnly
          style={{
            resize: "none",
          }}
          name="Apa"
          ref={apaRef}
          value={`${lastName} ${
            firstName[0]
          }. ${episodeTitle}. ${showTitle} [${mediaDescription}]. ${placeOfRecording}: ${publisher}; ${moment(
            datePosted
          ).format("YYYY")} [cited ${moment(dateAccessed).format(
            "YYYY"
          )}]. Available from: ${url}.`}
        />
        <Icon type="copy" onClick={() => copyToClipboard(apaRef, "APA")} /> */}

        {/* 

        <h4>Chicago</h4>
        <TextArea
          className="ant-input"
          autoSize
          readOnly
          style={{
            resize: "none",
          }}
          name="Apa"
          ref={chicagoRef}
          value={`${lastName}, ${firstName}. "${episodeTitle}". ${showTitle}. ${mediaDescription}, ${moment(
            datePosted
          ).format("MMM. DD, YYYY")}. ${url}`}
        />
        <Icon type="copy" onClick={() => copyToClipboard(apaRef, "APA")} /> */}

        {/* 

        <h4>Harvard</h4>
        <TextArea
          className="ant-input"
          autoSize
          readOnly
          style={{
            resize: "none",
          }}
          ref={harvardRef}
          value={`${lastName}, ${firstName[0]}.  (${moment(datePosted).format(
            "YYYY"
          )}). ${showTitle}. [${mediaDescription}] ${episodeTitle}. Available at: ${url} [Accessed ${moment(
            dateAccessed
          ).format("D MMM. YYYY")}].`}
        />
        <Icon type="copy" onClick={() => copyToClipboard(apaRef, "APA")} /> */}
      </CitationContainer>
    </Modal>
  )
}

export default WordCitationModal
