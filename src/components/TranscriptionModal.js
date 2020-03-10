import React from 'react'
import { LanguageOptions } from '../config'
import { convertClip } from '../services/clipManagement'

import { Select, Modal } from 'antd'

const { Option } = Select

const TranscriptionModal = ({ clip, setClip, player }) => {
  const convertClipHandler = async () => {
    const seconds = player.current.getDuration()
    const minutes = Math.ceil(seconds / 60)
    convertClip(clip, minutes, setClip)
  }

  return (
    <Modal
      title={`Transcribe ${clip.name}`}
      visible={clip.transcribeModalOpen}
      onOk={() => convertClipHandler()}
      onCancel={() => setClip({ ...clip, transcribeModalOpen: false })}
    >
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Select
          showSearch
          style={{ width: '100%' }}
          placeholder='What language/accent is being spoken?'
          optionFilterProp='children'
          onChange={lang => setClip({ ...clip, language: lang })}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
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
}

export default TranscriptionModal
