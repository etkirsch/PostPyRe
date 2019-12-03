import { someTestableFunction } from '../testable-example'

it('expects the output to have the same length as the input', () => {
  let result = someTestableFunction(4)

  expect(result).toHaveLength(4)
})
