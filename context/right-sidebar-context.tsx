"use client"

import { createContext, useContext, useState } from "react"
import type { ReactNode } from "react"

interface RightSidebarContextType {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  toggleSidebar: () => void
}

const defaultContext: RightSidebarContextType = {
  isOpen: false,
  setIsOpen: () => {},
  toggleSidebar: () => {},
}

export const RightSidebarContext = createContext<RightSidebarContextType>(defaultContext)

export const useRightSidebar = () => useContext(RightSidebarContext)

export const RightSidebarProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev)
  }

  return (
    <RightSidebarContext.Provider value={{ isOpen, setIsOpen, toggleSidebar }}>{children}</RightSidebarContext.Provider>
  )
}
