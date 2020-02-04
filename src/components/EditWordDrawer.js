import React from "react"

import { Drawer, Input, Button, Form } from "antd"

import { handleEditWord } from "../services/wordManagement"

const EditWordDrawer = ({
  wordData,
  setWordData,
  updateClipInProfile,
  clip,
}) => (
  <Drawer
    visible={wordData.editing}
    destroyOnClose={true}
    onClose={() =>
      setWordData({ ...wordData, selectedWord: undefined, editing: false })
    }
    closable={true}
    title="Edit"
  >
    {wordData.editing ? (
      <Form
        onSubmit={e =>
          handleEditWord(e, wordData, setWordData, clip, updateClipInProfile)
        }
      >
        <Form.Item>
          <Input
            autoFocus
            name="newWordValue"
            spellCheck="true"
            defaultValue={
              wordData.selectedWord ? wordData.selectedWord.word : ""
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

export default EditWordDrawer
