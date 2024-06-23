import { expect, test } from 'vitest'
import { delay } from '../../src/helpers/delay'

test('delay resolves after the specified delay', async () => {
  const startTime = Date.now()
  await delay()
  const endTime = Date.now()

  const expectedDelay = Math.floor(Math.random() * 5) * 1000
  expect(endTime - startTime).toBeGreaterThanOrEqual(expectedDelay)
}, 30000)
