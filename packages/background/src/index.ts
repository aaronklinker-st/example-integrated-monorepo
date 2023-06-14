export function initBackgroundTick() {
  let i = 0

  return setInterval(() => {
    console.log('background tick', i++)
  }, 1e3)
}
