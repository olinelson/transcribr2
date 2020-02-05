import React from "react"

import { Icon, Drawer, Input, List } from "antd"
import Word from "./Word"

const { Search } = Input

const SearchClipDrawer = ({
  searchData,
  setSearchData,
  onSearch,
  navigateToWord,
  setPlayerControls,
  formatTimeStamp,
  wordData,
  playerControls,
  player,
}) => (
  <Drawer
    title="Search"
    visible={searchData.modalOpen}
    onClose={() => setSearchData({ ...searchData, modalOpen: false })}
  >
    <Search
      style={{ marginBottom: "1rem" }}
      placeholder="input search text"
      onSearch={query => onSearch(query, wordData.words)}
      enterButton
      loading={searchData.loading}
      autoFocus
    />

    <List
      style={{
        height: "80vh",
        overflow: "scroll",
      }}
      itemLayout="horizontal"
      dataSource={searchData.results}
      // renderItem={word => <Word word={word} wordData={wordData} setWordData={setWordData}  />}
      renderItem={word => (
        <List.Item>
          <List.Item.Meta
            title={<a onClick={() => navigateToWord(word)}>{word.word}</a>}
            description={
              <span>
                <Icon type="clock-circle" /> {formatTimeStamp(word.startTime)}
                <Icon
                  type="login"
                  onClick={() => {
                    player.current.seekTo(
                      parseInt(word.startTime.replace("s", ""))
                    )
                    setPlayerControls({
                      ...playerControls,
                      playing: true,
                    })
                  }}
                />
              </span>
            }
          />
        </List.Item>
      )}
    />
  </Drawer>
)

export default SearchClipDrawer
