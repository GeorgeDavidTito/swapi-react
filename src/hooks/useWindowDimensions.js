import { useState, useLayoutEffect, useMemo } from 'react'
import useDebounce from './useDebounce'

const getWindowDimensions = () => {
  const { clientWidth: width, clientHeight: height } = document.documentElement
  return {
    width,
    height,
  }
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  )

  const debouncedWindowDimensions = useDebounce(windowDimensions, 700)

  const isMobile = useMemo(
    () => debouncedWindowDimensions.width <= 800,
    [debouncedWindowDimensions.width]
  )

  useLayoutEffect(() => {
    function handleResize() {
      const newDimensions = getWindowDimensions()
      if (
        newDimensions.width !== windowDimensions.width ||
        newDimensions.height !== windowDimensions.height
      ) {
        setWindowDimensions(newDimensions)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [windowDimensions])

  return { ...debouncedWindowDimensions, isMobile }
}
