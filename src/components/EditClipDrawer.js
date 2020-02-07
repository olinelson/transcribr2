import React from "react"

import { Drawer, Input, Button, Form, Popconfirm, Icon } from "antd"

import { updateClip } from "../services/clipManagement"

const EditClipDrawer = ({
  clip,
  updateClipInProfile,
  setClip,
  deleteClipHandler,
}) => (
  <Drawer
    title="Edit Clip"
    placement="right"
    closable={true}
    onClose={() => setClip({ ...clip, editing: false })}
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
        <Button onClick={() => setClip({ ...clip, editing: false })}>
          Cancel
        </Button>
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" loading={clip.saving}>
          Save
        </Button>
      </Form.Item>
    </Form>

    <Popconfirm
      title="Are you sure you want to delete this clip?"
      onConfirm={() => deleteClipHandler(clip._id)}
      okText="Yes"
      cancelText="No"
    >
      <Button type="danger">
        <Icon type="delete" />
        Delete
      </Button>
    </Popconfirm>
  </Drawer>
)

export default EditClipDrawer
