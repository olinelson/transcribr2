import React from "react"

import { Drawer, Input, Button, Form } from "antd"

import { updateClip } from "../services/clipManagement"

const EditClipDrawer = ({
  clip,
  clipSaving,
  editDrawerOpen,
  updateClipInProfile,
  setClipSaving,
  setEditDrawerOpen,
}) => (
  <Drawer
    title="Edit Clip"
    placement="right"
    closable={false}
    visible={editDrawerOpen}
  >
    <Form
      onSubmit={e => {
        e.preventDefault()

        let editedClip = {
          ...clip,
          [e.target.name.name]: e.target.name.value,
        }
        updateClip(
          editedClip,
          setClipSaving,
          setEditDrawerOpen,
          updateClipInProfile
        )
      }}
    >
      <Input name="name" spellCheck="true" defaultValue={clip.name} />
      <Form.Item>
        <Button
          onClick={() => {
            setEditDrawerOpen(false)
          }}
        >
          Cancel
        </Button>
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" loading={clipSaving}>
          Save
        </Button>
      </Form.Item>
    </Form>
  </Drawer>
)

export default EditClipDrawer
