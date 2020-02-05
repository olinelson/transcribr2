import React from "react"

import { Drawer, Input, Button, Form } from "antd"

import { updateClip } from "../services/clipManagement"

const EditClipDrawer = ({ clip, updateClipInProfile, setClip }) => (
  <Drawer
    title="Edit Clip"
    placement="right"
    closable={false}
    visible={clip.editing}
  >
    <Form
      onSubmit={e => {
        e.preventDefault()

        let editedClip = {
          ...clip,
          [e.target.name.name]: e.target.name.value,
        }
        updateClip(editedClip, updateClipInProfile, setClip)
      }}
    >
      <Input name="name" spellCheck="true" defaultValue={clip.name} />
      <Form.Item>
        <Button onClick={() => setClip({ ...clip, editing: true })}>
          Cancel
        </Button>
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" loading={clip.saving}>
          Save
        </Button>
      </Form.Item>
    </Form>
  </Drawer>
)

export default EditClipDrawer
