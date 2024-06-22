const RANDOM_SECONDS = Math.floor(Math.random() * 5)

export const delay = () =>
  new Promise((resolve) => {
    setTimeout(resolve, RANDOM_SECONDS * 2000)
  })
