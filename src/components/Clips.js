import React, { useState } from 'react'
import { UploadOutlined, YoutubeOutlined } from '@ant-design/icons'
import { List, Button, Input } from 'antd'
import { navigate } from 'gatsby'
import ButtonGroup from 'antd/lib/button/button-group'
const { Search } = Input

export default function Clips (props) {
  const { appState, setAppState } = props
  const [clipFilterText, setClipFilterText] = useState('')

  const clips = props.appState.clips

  const sortOrFilterClips = (clips) => {
    if (clipFilterText.length && clipFilterText.length > 0) {
      return clips.filter(c => c.name.toLowerCase().includes(clipFilterText.toLowerCase()))
      // return []
    } else {
      return clips.sort((a, b) => b.dateCreated - a.dateCreated)
    }
  }

  return (
    <List
      size='large'
      itemLayout='horizontal'
      header={
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '0 1rem' }}>
          <h1 style={{ margin: 0 }}>Clips</h1>
          <ButtonGroup>
            <Button icon={<YoutubeOutlined />} loading={appState.youtubeUploading} onClick={() => setAppState(oldAppState => ({ ...oldAppState, uploadYoutubeDrawerOpen: true }))}>Add with link</Button>
            <Button icon={<UploadOutlined />} onClick={() => setAppState(oldAppState => ({ ...oldAppState, uploadDrawerOpen: true }))}>Upload</Button>
          </ButtonGroup>
        </div>
      }
    >
      <Search
        placeholder='Search clips'
        onChange={e => setClipFilterText(e.target.value)}
        // onSearch={e => setClipFilterText(e.target.value)}
        allowClear
        value={clipFilterText}
        style={{ border: 'none', padding: '16px 24px' }}
      />
      {clips.length ? (
        sortOrFilterClips([...clips]).map(c => (
          <List.Item
            key={c._id} onClick={() => {
              navigate(`app/clips/${c._id}`)
            }}
          >

            {c.name.length > 47 ? c.name.substring(0, 45) + '...' : c.name}

          </List.Item>
        ))
      ) : (
        <List.Item disabled>
          <span>no clips yet...</span>
        </List.Item>
      )}
    </List>
  )
}
