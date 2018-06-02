import TypedMap, { Key } from '../index'

const KEY01 = Key.for<number>('KEY01')
const KEY02 = Key.for<boolean>('KEY02')

const KEY03 = Key.for<{ foo: string }>('KEY03')

it('should be creatable', function () {
  const map = new TypedMap()

  expect(map).toBeInstanceOf(TypedMap)
})

it('should be creatable from another map as a shallow copy', function () {
  const foo = { foo: 'bar' }

  const originalMap = new TypedMap()

  originalMap.set(KEY01, 42).set(KEY02, true).set(KEY03, foo)

  const newMap = new TypedMap(originalMap)

  expect(newMap.get(KEY01)).toBe(42)
  expect(newMap.get(KEY02)).toBe(true)
  expect(newMap.get(KEY03)).toBe(foo)
})
