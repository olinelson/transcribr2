import { API_URL } from '../config'
import { openNotificationWithIcon } from '../components/Notifications'
import { getToken } from '../services/auth'
import { findIndexOfWord } from '../utils'

export const splitWordsIntoPages = (_words, pageSize = 200) => {
  const words = [..._words]
  const wordPages = []

  while (words.length) wordPages.push(words.splice(0, pageSize))
  return wordPages
}

export const editWord = async ({ newWordValue, clip, setClip }) => {
  const clipId = clip._id
  const wordId = clip.selectedWord._id
  try {
    let res = await fetch(API_URL + '/words', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: getToken()
      },
      body: JSON.stringify({ clipId, wordId, newWordValue }),
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer' // no-referrer, *client
    })

    res = await res.json() // parses JSON response into native JavaScript objects

    const newWords = [...clip.words]
    const index = findIndexOfWord(clip.selectedWord, clip.words)
    newWords.splice(index, 1, res)

    setClip({
      ...clip,
      words: newWords,
      editWordDrawerOpen: false
    })
    openNotificationWithIcon('success', 'Changes saved')
  } catch (error) {
    console.error(error)
    openNotificationWithIcon('error', 'Something went wrong :(')
    setClip({ ...clip })
  }
}

export const insertWord = async ({ index, setClip, clip, newWord }) => {
  const clipId = clip._id
  try {
    let res = await fetch(API_URL + '/words', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: getToken()
      },
      body: JSON.stringify({ clipId, index, newWord }),
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer' // no-referrer, *client
    })
    res = await res.json() // parses JSON response into native JavaScript objects
    const newWords = [...clip.words]
    newWords.splice(index, 0, res)

    setClip({
      ...clip,
      words: newWords,
      editing: false,
      inserting: null,
      loading: false,
      editWordDrawerOpen: false
    })
    openNotificationWithIcon('success', 'Word Created')
  } catch (error) {
    console.error(error)
    setClip({ ...clip })
  }
}

export const deleteWord = async ({
  clip,
  setClip,
  updateClipInProfile,
  index
}) => {
  const clipId = clip._id
  try {
    const res = await fetch(API_URL + '/words', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: getToken()
      },
      body: JSON.stringify({ clipId, index }),
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer' // no-referrer, *client
    })
    if (!res.ok) throw new Error('problem deleting word...')

    const newWords = [...clip.words]
    newWords.splice(index, 1)

    setClip({ ...clip, words: newWords })
    openNotificationWithIcon('success', 'Word Deleted')
  } catch (error) {
    console.error(error)
    setClip({ ...clip })
  }
}
