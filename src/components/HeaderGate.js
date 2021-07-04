import React, { useState, useEffect, useCallback, useRef } from 'react'
import useWindowDimensions from '../hooks/useWindowDimensions'

export const HeaderContext = React.createContext()

const HeaderGate = ({ children }) => {
  const [showHeader, setShowHeader] = useState(true)
  const { isMobile } = useWindowDimensions()
  const prev = useRef()

  const hideHeader = useCallback(() => {
    if (!isMobile) {
      return null
    }

    const position = Math.max(
      window.pageYOffset,
      document.documentElement.scrollTop,
      document.body.scrollTop
    )

    if (position > 50 && position > prev.current) {
      if (showHeader) {
        setShowHeader(false)
      }
    } else {
      if (!showHeader) {
        setShowHeader(true)
      }
    }

    prev.current = position
  }, [isMobile, showHeader])

  useEffect(() => {
    window.addEventListener('scroll', hideHeader)
    return () => {
      window.removeEventListener('scroll', hideHeader)
    }
  }, [hideHeader])

  return (
    <HeaderContext.Provider value={showHeader}>
      {children}
    </HeaderContext.Provider>
  )
}

export default HeaderGate
