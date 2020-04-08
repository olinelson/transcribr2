import React from 'react'
import renderer from 'react-test-renderer'

import YoutubeForm from '../src/components/YoutubeForm'

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // deprecated
      removeListener: jest.fn(), // deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn()
    }))
  })
})

const appState = {
  user: {},
  clips: [],
  uploadDrawerOpen: false,
  uploadYoutubeDrawerOpen: false,
  searchClipDrawerOpen: false,
  editUserDrawerOpen: false,
  editClipDrawerOpen: false,
  editWordDrawerOpen: false,
  editEmailDrawerOpen: false,
  youtubeUploading: false,
  offline: false
}

describe('YoutubeForm', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<YoutubeForm appState={appState} setAppState={() => null} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
