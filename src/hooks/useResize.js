import { useState, useEffect } from 'react'
const isBrowser = typeof window !== `undefined`

//Get window width
const getWidth = () => window.innerWidth
  || document.documentElement.clientWidth
  || document.body.clientWidth

/**
 * Hook for getting width on resize
 * Can be used for rerender components on resize or other conditions
 */
export function useCurrentWidth() {

  let [width, setWidth] = useState(isBrowser ? getWidth() : null)

  // in this case useEffect will execute only once because
  useEffect(() => {

    // timeoutId for debounce mechanism
    let timeoutId = null;
    // prevent execution of previous setTimeout
    const resizeListener = () => {
      clearInterval(timeoutId)
      timeoutId = setTimeout(() => setWidth(getWidth()), 80)
    }

    window.addEventListener('resize', resizeListener)

    // clean up function
    return () => {
      window.removeEventListener('resize', resizeListener)
    }
  }, [])

  return width
}
