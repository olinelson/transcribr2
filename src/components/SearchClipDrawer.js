import React, { useState } from "react"
import { debounce } from "debounce"

import { Icon, Drawer, Input, List, Button } from "antd"

import { formatTimeStamp } from "../utils"

const { Search } = Input

function SearchClipDrawer(props) {
  const {
    appState,
    setAppState,
    navigateToWord,
    setPlayerControls,
    // wordData,
    playerControls,
    player,
    // searchData,
    // setSearchData,
  } = props

  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  // Array.prototype.asyncFilter = async function(f) {
  //   var array = this
  //   var booleans = await Promise.all(array.map(f))
  //   return array.filter((x, i) => booleans[i])
  // }

  const filterWords = (query, words) => {
    return words.filter(w => w.word.toLowerCase().includes(query.toLowerCase()))
  }

  const onSearch = (query, words) => {
    setLoading(true)

    let results = []

    if (query.length) {
      setTimeout(() => {
        results = filterWords(query, words)
        setResults(results)
        setLoading(false)
      }, 50)
    }
  }

  const onChange = (query, words) => {
    if (query.length < 3) return setResults([])

    let results = []

    setLoading(true)
    results = filterWords(query, words)
    setResults(results)
    setTimeout(() => {
      setLoading(false)
    }, 50)
  }

  return (
    <Drawer
      title="Search"
      mask={false}
      maskClosable={false}
      visible={searchData.modalOpen}
      onClose={() => setSearchData({ ...searchData, modalOpen: false })}
    >
      <Search
        style={{ marginBottom: "1rem" }}
        placeholder="input search text"
        onSearch={query => debounce(onSearch(query, wordData.words), 1000)}
        onChange={e => debounce(onChange(e.target.value, wordData.words), 1000)}
        enterButton
        loading={loading}
      />

      <List
        style={{
          height: "80vh",
          overflow: "scroll",
        }}
        itemLayout="horizontal"
        dataSource={results}
        loadMore
        renderItem={word => (
          <List.Item
            actions={[
              <Button
                size="small"
                type="primary"
                ghost
                onClick={() => navigateToWord(word)}
              >
                <Icon type="eye" />
              </Button>,
              <Button
                onClick={() => {
                  player.current.seekTo(
                    parseInt(word.startTime.replace("s", ""))
                  )
                  setPlayerControls({
                    ...playerControls,
                    playing: true,
                  })
                }}
                size="small"
                type="primary"
                ghost
              >
                <Icon type="play-circle" />
              </Button>,
            ]}
          >
            <List.Item.Meta
              title={word.word}
              description={
                <span>
                  <Icon
                    onClick={() => navigateToWord(word)}
                    type="clock-circle"
                  />{" "}
                  {formatTimeStamp(word.startTime)}{" "}
                </span>
              }
            />
          </List.Item>
        )}
      />
    </Drawer>
  )
}

export default SearchClipDrawer
