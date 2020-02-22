import React from "react"
import { List, Button } from "antd"
import { navigate } from "gatsby"
import { sortClipsChronologically } from "../utils"

export default function Clips(props) {
  const clips = props.appState.clips

  return (
    <List
      size="large"
      itemLayout="horizontal"
      header={<h1 style={{ marginLeft: "1rem" }}>Clips</h1>}
    >
      {clips.length ? (
        clips.sort(sortClipsChronologically).map(c => (
          <List.Item>
            <List.Item.Meta
              title={
                <Button
                  type="link"
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
