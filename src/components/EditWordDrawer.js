import React from 'react'

import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';

import { Drawer, Input, Button } from 'antd';

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
    setClip(oldClip => ({ ...oldClip, clipSaving: true }))

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
       insertWord({ ...props, index, newWord })
    }else{
      editWord({ ...props, newWordValue })
    }
    
  }

  return (
    <Drawer
      visible={clip.editWordDrawerOpen}
      destroyOnClose
      onClose={() =>
        setClip(oldClip =>({
          ...oldClip,
          editWordDrawerOpen: false,
          inserting: null,
          clipSaving: false,
        }))}
      closable
      title={inserting === false ? 'Edit Word' : 'Insert Word'}
    >
      {clip.selectedWord ? (
        <Form onSubmit={e => insertOrEditWord({ ...props, e })}>
          <Form.Item>
            <Input
              name='newWordValue'
              spellCheck='true'
              defaultValue={!inserting ? clip.selectedWord.word : ""}
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
