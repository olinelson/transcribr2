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
  Collapse,
  Checkbox,
} from "antd"

import { updateClip } from "../services/clipManagement"

const { Panel } = Collapse
const EditClipDrawer = props => {
  const { updateClipInProfile, deleteClipHandler } = props
  const editing = props.clip.editing
  const [formData, setFormData] = useState(
    !props.clip.citation ? { ...props.clip, citation: {} } : props.clip
  )

  return (
    <Drawer
      width="400"
      title="Edit Clip"
      placement="right"
      closable={true}
      onClose={() => {
        // updateClip(clip, updateClipInProfile, setClip)
        props.setClip({ ...props.clip, editing: false })
      }}
      visible={editing}
    >
      <Form
        layout="vertical"
        onChange={e => {
          if (e.target.name === "name")
            setFormData({ ...formData, [e.target.name]: e.target.value })
          else
            setFormData({
              ...formData,
              citation: {
                ...formData.citation,
                [e.target.name]: e.target.value,
              },
            })
        }}
        onSubmit={e => {
          e.preventDefault()
          updateClip(formData, updateClipInProfile, props.setClip)
        }}
      >
        <Form.Item label="Clip Name">
          <Input name="name" spellCheck="true" defaultValue={formData.name} />
        </Form.Item>

        {/* <Form.Item label="Make Available Offline">
          <Checkbox name="saveOffline" defaultValue={formData.saveOffline} />
        </Form.Item> */}

        <Collapse>
          <Panel header="Citation">
            <Form.Item label="First Name">
              <Input
                name="firstName"
                spellCheck="true"
                defaultValue={formData.citation.firstName}
                placeholder="Dave"
              />
            </Form.Item>
            <Form.Item label="Middle Initial">
              <Input
                name="middleInitial"
                spellCheck="true"
                defaultValue={formData.citation.middleInitial}
                placeholder="D"
              />
            </Form.Item>

            <Form.Item label="Last Name">
              <Input
                name="lastName"
                spellCheck="true"
                defaultValue={formData.citation.lastName}
                placeholder="Varialle"
              />
            </Form.Item>
            <Form.Item label="Contributor Title">
              <Input
                name="contributorTitle"
                spellCheck="true"
                defaultValue={formData.citation.contributorTitle}
                placeholder="host"
              />
            </Form.Item>

            <Divider />

            <Form.Item label="Media Description">
              <Input
                name="mediaDescription"
                spellCheck="true"
                defaultValue={formData.citation.mediaDescription}
                placeholder="Audio Podcast"
              />
            </Form.Item>

            <Form.Item label="Show/Podcast Title">
              <Input
                name="showTitle"
                spellCheck="true"
                defaultValue={formData.citation.showTitle}
                placeholder="I'd Hit That"
              />
            </Form.Item>
            <Form.Item label="Episode Title">
              <Input
                name="episodeTitle"
                spellCheck="true"
                defaultValue={formData.citation.episodeTitle}
                placeholder="102 - Dan Weiss"
              />
            </Form.Item>
            <Form.Item label="Publisher">
              <Input
                name="publisher"
                spellCheck="true"
                defaultValue={formData.citation.publisher}
                placeholder="Podomatic.net"
              />
            </Form.Item>

            <Divider />

            <Form.Item label="Date Posted">
              <DatePicker
                allowClear={false}
                defaultValue={moment(formData.citation.datePosted)}
                onChange={e =>
                  setFormData({
                    ...formData,
                    citation: { ...formData.citation, datePosted: e.valueOf() },
                  })
                }
              />
            </Form.Item>
            <Form.Item label="Date Accessed">
              <DatePicker
                allowClear={false}
                defaultValue={moment(formData.citation.accessed)}
                onChange={e =>
                  setFormData({
                    ...formData,
                    citation: {
                      ...formData.citation,
                      dateAccessed: e.valueOf(),
                    },
                  })
                }
              />
            </Form.Item>
            <Form.Item label="Place Of Recording">
              <Input
                name="placeOfRecording"
                spellCheck="true"
                defaultValue={formData.citation.placeOfRecording}
                placeholder="Los Angeles, USA"
              />
            </Form.Item>
            <Form.Item label="Url">
              <Input
                name="url"
                spellCheck="true"
                defaultValue={formData.citation.url}
                placeholder="https://www.podomatic.com/podcasts/idhitthatpodcast/episodes/2017-10-22T09_39_47-07_00"
              />
            </Form.Item>

            <Divider />
          </Panel>
        </Collapse>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gridGap: "1rem",
            marginTop: "1rem",
          }}
        >
          <Button
            onClick={() => props.setClip({ ...props.clip, editing: false })}
          >
            Cancel
          </Button>

          <Popconfirm
            title="Are you sure you want to delete this clip?"
            onConfirm={() => deleteClipHandler(formData._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="danger">
              <Icon type="delete" />
              Delete
            </Button>
          </Popconfirm>

          <Button type="primary" htmlType="submit" loading={formData.saving}>
            Save
          </Button>
        </div>
      </Form>
    </Drawer>
  )
}

export default EditClipDrawer
