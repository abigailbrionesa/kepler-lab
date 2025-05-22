"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface SelectedDateContextType {
  selectedDate: Date
  setSelectedDate: (date: Date) => void
}

const defaultDate = new Date()

const defaultContext: SelectedDateContextType = {
  selectedDate: defaultDate,
  setSelectedDate: () => {},
}

export const SelectedDateContext = createContext<SelectedDateContextType>(defaultContext)

export const useSelectedDate = () => useContext(SelectedDateContext)

export const SelectedDateProvider = ({ children }: { children: ReactNode }) => {
  const [selectedDate, setSelectedDate] = useState<Date>(defaultDate)

  return (
    <SelectedDateContext.Provider value={{ selectedDate, setSelectedDate }}>
      {children}
    </SelectedDateContext.Provider>
  )
}
