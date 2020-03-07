import React from 'react'
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
            <Button icon='youtube' onClick={() => setAppState({ ...appState, uploadYoutubeDrawerOpen: true })}>Add with link</Button>
            <Button icon='upload' onClick={() => setAppState({ ...appState, uploadDrawerOpen: true })}>Upload</Button>
          </ButtonGroup>
        </div>
      }
    >

      {clips.length ? (
        clips.sort(sortClipsChronologically).map(c => (
          <List.Item key={c._id}>
            <List.Item.Meta
              title={
                <Button
                  type='link'
                  onClick={() => {
                    navigate(`app/clips/${c._id}`)
                  }}
                >
                  {c.name}
                </Button>
              }
            />
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
