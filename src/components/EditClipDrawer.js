import React, { useState } from "react"
import moment from "moment"

import { Drawer, Input, Button, Form, Popconfirm, Icon, DatePicker } from "antd"

import { updateClip } from "../services/clipManagement"

const EditClipDrawer = props => {
  const { updateClipInProfile, deleteClipHandler } = props
  const editing = props.clip.editing
  const [clip, setClip] = useState(props.clip)
  return (
    <Drawer
      title="Edit Clip"
      placement="right"
      closable={true}
      onClose={() => props.setClip({ ...clip, editing: false })}
      visible={editing}
    >
      <Form
        onChange={e => {
          if (e.target.name === "name")
            setClip({ ...clip, [e.target.name]: e.target.value })
          else
            setClip({
              ...clip,
              citation: { ...clip.citation, [e.target.name]: e.target.value },
            })
        }}
        onSubmit={e => {
          e.preventDefault()
          updateClip(clip, updateClipInProfile, setClip)
        }}
      >
        <Form.Item>
          <label>Name</label>
          <Input name="name" spellCheck="true" defaultValue={clip.name} />
          {/* citation */}
        </Form.Item>
        <h4>Citation</h4>

        <Form.Item>
          <label>Contributor Name</label>
          <Input
            name="contributorName"
            spellCheck="true"
            defaultValue={clip.citation.contributorName}
          />
        </Form.Item>
        <Form.Item>
          <label>Show/Podcast Title</label>
          <Input
            name="showTitle"
            spellCheck="true"
            defaultValue={clip.citation.showTitle}
          />
        </Form.Item>
        <Form.Item>
          <label>Episode Title</label>
          <Input
            name="episodeTitle"
            spellCheck="true"
            defaultValue={clip.citation.episodeTitle}
          />
        </Form.Item>
        <Form.Item>
          <label>Publisher</label>
          <Input
            name="publisher"
            spellCheck="true"
            defaultValue={clip.citation.publisher}
          />
        </Form.Item>
        <Form.Item>
          <label>Date Posted</label>
          <DatePicker
            defaultValue={moment(clip.citation.datePosted)}
            onChange={e =>
              setClip({
                ...clip,
                citation: { ...clip.citation, datePosted: e.valueOf() },
              })
            }
          />
          {/* <Input
            name="datePosted"
            spellCheck="true"
            defaultValue={clip.citation.datePosted}
            type="date"
          /> */}
        </Form.Item>
        <Form.Item>
          <label>Url</label>
          <Input
            name="url"
            spellCheck="true"
            defaultValue={clip.citation.url}
          />
        </Form.Item>
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
}

export default EditClipDrawer
