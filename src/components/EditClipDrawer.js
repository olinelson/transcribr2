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
import styled from "styled-components"

const EditClipDrawer = props => {
  const { updateClipInProfile, deleteClipHandler } = props
  const editing = props.clip.editing
  const [clip, setClip] = useState(props.clip)

  const FormRow = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
    grid-gap: 1rem;
  `

  return (
    <Drawer
      // mask={false}
      width="400"
      title="Edit Clip"
      placement="right"
      closable={true}
      onClose={() => props.setClip({ ...clip, editing: false })}
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
          />
        </Form.Item>
        <Form.Item label="Middle Initial">
          <Input
            name="middleInitial"
            spellCheck="true"
            defaultValue={clip.citation.middleInitial}
          />
        </Form.Item>

        <Form.Item label="Last Name">
          <Input
            name="lastName"
            spellCheck="true"
            defaultValue={clip.citation.lastName}
          />
        </Form.Item>
        <Form.Item label="Contributor Title">
          <Input
            name="contributorTitle"
            spellCheck="true"
            defaultValue={clip.citation.contributorTitle}
          />
        </Form.Item>

        <Divider />

        <Form.Item label="Media Description">
          <Input
            name="mediaDescription"
            spellCheck="true"
            defaultValue={clip.citation.mediaDescription}
          />
        </Form.Item>

        <Form.Item label="Show/Podcast Title">
          <Input
            name="showTitle"
            spellCheck="true"
            defaultValue={clip.citation.showTitle}
          />
        </Form.Item>
        <Form.Item label="Episode Title">
          <Input
            name="episodeTitle"
            spellCheck="true"
            defaultValue={clip.citation.episodeTitle}
          />
        </Form.Item>
        <Form.Item label="Publisher">
          <Input
            name="publisher"
            spellCheck="true"
            defaultValue={clip.citation.publisher}
          />
        </Form.Item>

        <Divider />

        <Form.Item label="Date Posted/Accessed">
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
        <Form.Item label="Url">
          <Input
            name="url"
            spellCheck="true"
            defaultValue={clip.citation.url}
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
