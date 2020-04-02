import React from 'react'
import { UploadOutlined, YoutubeOutlined } from '@ant-design/icons';
import { List, Button } from 'antd'
import { navigate } from 'gatsby'
import { sortClipsChronologically } from '../utils'
import ButtonGroup from 'antd/lib/button/button-group'

export default function Clips (props) {
  const { appState, setAppState } = props

  const clips = props.appState.clips

  return (
    <List
      size='large'
      itemLayout='horizontal'
      header={
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '0 1rem' }}>
          <h1 style={{ margin: 0 }}>Clips</h1>
          <ButtonGroup>
            <Button icon={<YoutubeOutlined />} loading={appState.youtubeUploading} onClick={() => setAppState({ ...appState, uploadYoutubeDrawerOpen: true })}>Add with link</Button>
            <Button icon={<UploadOutlined />} onClick={() => setAppState({ ...appState, uploadDrawerOpen: true })}>Upload</Button>
          </ButtonGroup>
        </div>
      }
    >

      {clips.length ? (
        [...clips].sort((a, b) => b.dateCreated - a.dateCreated).map(c => (
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
  );
}
