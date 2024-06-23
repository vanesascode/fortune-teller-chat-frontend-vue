export const delay = () =>
  new Promise((resolve) => {
    const RANDOM_SECONDS = Math.floor(Math.random() * 10) * 1000
    console.log(`Delaying for ${RANDOM_SECONDS}ms`)
    setTimeout(resolve, RANDOM_SECONDS)
  })
