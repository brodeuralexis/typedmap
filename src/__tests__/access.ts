import TypedMap, { Key } from '../index'

const EXISTING_KEY = Key.for<string>('EXISTING_KEY')
const UNEXISTING_KEY = Key.for<Date>('UNEXISTING_KEY')

const map = new TypedMap().set(EXISTING_KEY, 'I exist!')

it('should return the value associated with the key if it exists', function () {
  expect(map.get(EXISTING_KEY)).toBe('I exist!')
})

it('should return null if there is no value for the associated key', function () {
  expect(map.get(UNEXISTING_KEY)).toBeUndefined()
})

it('should indicate so if a key is present', function () {
  expect(map.has(EXISTING_KEY)).toBe(true)
})

it('should indicate so if a key is not present', function () {
  expect(map.has(UNEXISTING_KEY)).toBe(false)
})
