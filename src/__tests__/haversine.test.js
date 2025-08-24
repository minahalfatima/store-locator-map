import { haversine } from '../store/useStore'

test('haversine distance between same point is 0', () => {
  const d = haversine(51.05, -114.08, 51.05, -114.08)
  expect(d).toBeCloseTo(0, 5)
})
