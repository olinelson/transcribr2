import React from 'react'

import { Drawer, Input, Button, Form } from 'antd'

import { editWord, insertWord } from '../services/wordManagement'
import { findIndexOfWord } from '../utils'
function EditWordDrawer (props) {
  const { clip, setClip } = props
  let inserting = false

  if (clip.selectedWord && clip.selectedWord.inserting > -1) {
    inserting = clip.selectedWord.inserting
  }

  const insertOrEditWord = ({ e }) => {
    e.preventDefault()
    setClip({ ...clip, clipSaving: true })

    const newWordValue = e.target.newWordValue.value

    if (inserting !== false) {
      let index =
        findIndexOfWord(clip.selectedWord, clip.words) +
        clip.selectedWord.inserting

      if (index < 0) index = 0
      const newWord = {
        word: newWordValue,
        startTime: clip.selectedWord.startTime
      }
      return insertWord({ ...props, index, newWord })
    }
    editWord({ ...props, newWordValue })
  }

  return (
    <Drawer
      visible={clip.editWordDrawerOpen}
      destroyOnClose
      onClose={() =>
        setClip({
          ...clip,
          editWordDrawerOpen: false,
          inserting: null
        })}
      closable
      title={inserting === false ? 'Edit Word' : 'Insert Word'}
    >
      {clip.selectedWord ? (
        <Form onSubmit={e => insertOrEditWord({ ...props, e })}>
          <Form.Item>
            <Input
              name='newWordValue'
              spellCheck='true'
              defaultValue={clip.selectedWord.word}
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
