import React, { useState } from "react"
import moment from "moment"

import {
  Drawer,
  Input,
  Button,
  Form,
  Popconfirm,
  Icon,
  DatePicker,
  Divider,
} from "antd"

import { updateClip } from "../services/clipManagement"

const EditClipDrawer = props => {
  const { updateClipInProfile, deleteClipHandler } = props
  const editing = props.clip.editing
  const [clip, setClip] = useState(props.clip)

  return (
    <Drawer
      width="400"
      title="Edit Clip"
      placement="right"
      closable={true}
      onClose={() => {
        updateClip(clip, updateClipInProfile, setClip)
        props.setClip({ ...clip, editing: false })
      }}
      visible={editing}
    >
      <Form
        layout="vertical"
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
        <Form.Item label="Clip Name">
          <Input name="name" spellCheck="true" defaultValue={clip.name} />
        </Form.Item>
        <h2>Citation</h2>
        <Divider />

        <Form.Item label="First Name">
          <Input
            name="firstName"
            spellCheck="true"
            defaultValue={clip.citation.firstName}
            placeholder="Dave"
          />
        </Form.Item>
        <Form.Item label="Middle Initial">
          <Input
            name="middleInitial"
            spellCheck="true"
            defaultValue={clip.citation.middleInitial}
            placeholder="D"
          />
        </Form.Item>

        <Form.Item label="Last Name">
          <Input
            name="lastName"
            spellCheck="true"
            defaultValue={clip.citation.lastName}
            placeholder="Varialle"
          />
        </Form.Item>
        <Form.Item label="Contributor Title">
          <Input
            name="contributorTitle"
            spellCheck="true"
            defaultValue={clip.citation.contributorTitle}
            placeholder="host"
          />
        </Form.Item>

        <Divider />

        <Form.Item label="Media Description">
          <Input
            name="mediaDescription"
            spellCheck="true"
            defaultValue={clip.citation.mediaDescription}
            placeholder="Audio Podcast"
          />
        </Form.Item>

        <Form.Item label="Show/Podcast Title">
          <Input
            name="showTitle"
            spellCheck="true"
            defaultValue={clip.citation.showTitle}
            placeholder="I'd Hit That"
          />
        </Form.Item>
        <Form.Item label="Episode Title">
          <Input
            name="episodeTitle"
            spellCheck="true"
            defaultValue={clip.citation.episodeTitle}
            placeholder="102 - Dan Weiss"
          />
        </Form.Item>
        <Form.Item label="Publisher">
          <Input
            name="publisher"
            spellCheck="true"
            defaultValue={clip.citation.publisher}
            placeholder="Podomatic.net"
          />
        </Form.Item>

        <Divider />

        <Form.Item label="Date Posted">
          <DatePicker
            allowClear={false}
            defaultValue={moment(clip.citation.datePosted)}
            onChange={e =>
              setClip({
                ...clip,
                citation: { ...clip.citation, datePosted: e.valueOf() },
              })
            }
          />
        </Form.Item>
        <Form.Item label="Date Accessed">
          <DatePicker
            allowClear={false}
            defaultValue={moment(clip.citation.accessed)}
            onChange={e =>
              setClip({
                ...clip,
                citation: { ...clip.citation, dateAccessed: e.valueOf() },
              })
            }
          />
        </Form.Item>
        <Form.Item label="Place Of Recording">
          <Input
            name="placeOfRecording"
            spellCheck="true"
            defaultValue={clip.citation.placeOfRecording}
            placeholder="Los Angeles, USA"
          />
        </Form.Item>
        <Form.Item label="Url">
          <Input
            name="url"
            spellCheck="true"
            defaultValue={clip.citation.url}
            placeholder="https://www.podomatic.com/podcasts/idhitthatpodcast/episodes/2017-10-22T09_39_47-07_00"
          />
        </Form.Item>

        <Divider />

        <Button onClick={() => props.setClip({ ...clip, editing: false })}>
          Cancel
        </Button>

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

        <Button type="primary" htmlType="submit" loading={clip.saving}>
          Save
        </Button>
      </Form>
    </Drawer>
  )
}

export default EditClipDrawer
