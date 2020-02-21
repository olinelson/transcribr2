import React from "react"

import { Drawer, Input, Button, Form } from "antd"

import { editWord, insertWord } from "../services/wordManagement"

function EditWordDrawer(props) {
  const { clip, setClip } = props
  let inserting = false

  if (clip.selectedWord && clip.selectedWord.inserting > -1) {
    inserting = clip.selectedWord.inserting
  }

  function findIndexOfWord(obj, arr) {
    let i = 0
    for (let o of arr) {
      if (o._id === obj._id) return i
      i++
    }
    return -1
  }

  const insertOrEditWord = ({ e }) => {
    e.preventDefault()
    setClip({ ...clip, clipSaving: true })

    let newWordValue = e.target.newWordValue.value

    if (inserting !== false) {
      let index =
        findIndexOfWord(clip.selectedWord, clip.words) +
        clip.selectedWord.inserting

      if (index < 0) index = 0
      let newWord = {
        word: newWordValue,
        startTime: clip.selectedWord.startTime,
      }
      return insertWord({ ...props, index, newWord })
    }
    editWord({ ...props, newWordValue })
  }

  return (
    <Drawer
      visible={clip.editWordDrawerOpen}
      destroyOnClose={true}
      onClose={() =>
        setClip({
          ...clip,
          editWordDrawerOpen: false,
          inserting: null,
        })
      }
      closable={true}
      title={inserting === false ? "Edit Word" : "Insert Word"}
    >
      {clip.selectedWord ? (
        <Form onSubmit={e => insertOrEditWord({ ...props, e })}>
          <Form.Item>
            <Input
              name="newWordValue"
              spellCheck="true"
              defaultValue={clip.selectedWord.word}
            ></Input>
          </Form.Item>
          <Form.Item>
            <Button loading={clip.clipSaving} type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      ) : null}
    </Drawer>
  )
}

export default EditWordDrawer
