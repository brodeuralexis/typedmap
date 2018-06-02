import TypedMap, { Key } from '../index'

const KEY01 = Key.for<number>('KEY01')
const KEY02 = Key.for<boolean>('KEY02')

const KEY03 = Key.for<{ foo: string }>('KEY03')

it('should allow a map to be cleared', function () {
  const map = new TypedMap().set(KEY01, 42).set(KEY02, true)
  map.clear()
  expect(map.has(KEY01)).toBe(false)
  expect(map.has(KEY02)).toBe(false)
})

it('should allow for new keys to be set', function () {
  const map = new TypedMap().set(KEY01, 42).set(KEY02, true)

  expect(map.has(KEY03)).toBe(false)

  const foo = { foo: 'bar' }
  map.set(KEY03, foo)

  expect(map.get(KEY03)).toBe(foo)
})

it('should allow a property to be deleted', function () {
  const map = new TypedMap().set(KEY01, 42).set(KEY02, true)

  map.delete(KEY01)

  expect(map.has(KEY01)).toBe(false)
  expect(map.has(KEY02)).toBe(true)
})
