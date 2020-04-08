import { API_URL, STRIPE_PUBLIC_KEY } from '../src/config'

test('The API URL points to the production server', () => {
  expect(API_URL).toBe('https://transcribr2-api.herokuapp.com')
})

test('The stripe API key is production', () => {
  expect(STRIPE_PUBLIC_KEY).toBe('pk_live_cXMZDMoPxJaKGOa5MEXk09PU007Ke5wshF')
})
