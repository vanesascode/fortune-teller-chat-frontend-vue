import { expect, test } from 'vitest'
import { delay } from '@/helpers/delay'

test('delay resolves after the specified delay', async () => {
  //act
  const startTime = Date.now()
  await delay()
  const endTime = Date.now()

  //arrange
  const expectedDelay = Math.floor(Math.random() * 5) * 1000
  const differenceTime = endTime - startTime

  //assert
  expect(differenceTime).toBeGreaterThanOrEqual(expectedDelay)
}, 30000)
