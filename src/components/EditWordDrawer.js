import React from 'react'
import '@ant-design/compatible/assets/index.css'

import { Drawer, Input, Button, Form } from 'antd'

import { editWord, insertWord } from '../services/wordManagement'
import { findIndexOfWord } from '../utils'
function EditWordDrawer (props) {
  const { clip, setClip } = props
  let inserting = false

  if (clip.selectedWord && clip.selectedWord.inserting > -1) {
    inserting = clip.selectedWord.inserting
  }

  const insertOrEditWord = ({ newWordValue }) => {
    setClip(oldClip => ({ ...oldClip, clipSaving: true }))

    if (inserting !== false) {
      let index =
        findIndexOfWord(clip.selectedWord, clip.words) +
        clip.selectedWord.inserting

      if (index < 0) index = 0
      const newWord = {
        word: newWordValue,
        startTime: clip.selectedWord.startTime
      }
      insertWord({ ...props, index, newWord })
    } else {
      editWord({ ...props, newWordValue })
    }
  }

  return (
    <Drawer
      visible={clip.editWordDrawerOpen}
      destroyOnClose
      onClose={() =>
        setClip(oldClip => ({
          ...oldClip,
          editWordDrawerOpen: false,
          inserting: null,
          clipSaving: false
        }))}
      closable
      title={inserting === false ? 'Edit Word' : 'Insert Word'}
    >
      {clip.selectedWord ? (
        <Form initialValues={{ newWordValue: inserting === 1 || inserting === 0 ? ' ' : clip.selectedWord.word }} onFinish={insertOrEditWord}>
          <Form.Item name='newWordValue'>
            <Input
              spellCheck='true'
            />
          </Form.Item>
          <Form.Item>
            <Button loading={clip.clipSaving} type='primary' htmlType='submit'>
              Save
            </Button>
          </Form.Item>
        </Form>
      ) : null}
    </Drawer>
  )
}

export default EditWordDrawer
