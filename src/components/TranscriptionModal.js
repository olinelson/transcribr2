import React from "react"
import { LanguageOptions } from "../config"

import { Select, Modal } from "antd"

const { Option } = Select

const TranscriptionModal = ({
  transcribeData,
  clip,
  setTranscribeData,
  convertClip,
}) => (
  <Modal
    title={`Transcribe ${clip.name}`}
    visible={transcribeData.modalOpen}
    onOk={() => convertClip()}
    onCancel={() => setTranscribeData({ ...transcribeData, modalOpen: false })}
  >
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Select
        showSearch
        style={{ width: "100%" }}
        placeholder="Select a language"
        optionFilterProp="children"
        onChange={lang =>
          setTranscribeData({ ...transcribeData, language: lang })
        }
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {LanguageOptions.map(l => (
          <Option key={l.languageCode} value={l.languageCode}>
            {l.languageEnglishName}
          </Option>
        ))}
      </Select>
    </div>
  </Modal>
)

export default TranscriptionModal
