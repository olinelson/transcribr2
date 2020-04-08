import React from 'react'
import renderer from 'react-test-renderer'

import FourOFour from '../src/pages/404'
import About from '../src/pages/about'
import Forgot from '../src/pages/Forgot'

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

describe('404 page', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<FourOFour />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})

// to do... spoof graphql images

// describe('about page', () => {
//   it('renders correctly', () => {
//     const tree = renderer
//       .create(<About />)
//       .toJSON()
//     expect(tree).toMatchSnapshot()
//   })
// })

// describe('forgot password page', () => {
//   it('renders correctly', () => {
//     const tree = renderer
//       .create(<Forgot />)
//       .toJSON()
//     expect(tree).toMatchSnapshot()
//   })
// })
