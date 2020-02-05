import React from "react"

import { Drawer, Input, Button, Form } from "antd"

import { editWord, insertWord } from "../services/wordManagement"

function EditWordDrawer(props) {
  const { wordData, setWordData, setClip, clip } = props

  const inserting = wordData.inserting !== null

  const insertOrEditWord = ({ e }) => {
    e.preventDefault()
    setWordData({ ...wordData, loading: true })

    let newWordValue = e.target.newWordValue.value

    if (wordData.inserting !== null) {
      let index =
        wordData.words.indexOf(wordData.selectedWord) + wordData.inserting
      if (index < 0) index = 0
      let newWord = {
        word: newWordValue,
        startTime: wordData.selectedWord.startTime,
      }
      return insertWord({ ...props, index, newWord })
    }
    editWord({ ...props, newWordValue })
  }

  return (
    <Drawer
      visible={wordData.editing}
      destroyOnClose={true}
      onClose={() =>
        setWordData({
          ...wordData,
          selectedWord: undefined,
          editing: false,
          inserting: null,
        })
      }
      closable={true}
      title={inserting ? "Insert Word" : "Edit Word"}
    >
      {wordData.editing ? (
        <Form onSubmit={e => insertOrEditWord({ ...props, e })}>
          <Form.Item>
            <Input
              autoFocus
              name="newWordValue"
              spellCheck="true"
              defaultValue={
                wordData.selectedWord && !inserting
                  ? wordData.selectedWord.word
                  : ""
              }
            ></Input>
          </Form.Item>
          <Form.Item>
            <Button loading={wordData.loading} type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      ) : null}
    </Drawer>
  )
}

export default EditWordDrawer
