"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import {
  SatelliteIcon,
  RocketIcon as MeteorIcon,
  AlertTriangleIcon,
  type LucideIcon,
} from "lucide-react"

export type CategoryType = "planets" | "neas" | "necs" | "phas" | null

export interface CategoryInfo {
  type: CategoryType
  title: string
  icon: LucideIcon
}

interface SelectedCategoryContextType {
  selectedCategory: CategoryInfo | null
  setSelectedCategory: (category: CategoryInfo | null) => void
}

const defaultContext: SelectedCategoryContextType = {
  selectedCategory: null,
  setSelectedCategory: () => {},
}

export const categoryIcons: Record<string, LucideIcon> = {
  planets: SatelliteIcon,
  neas: SatelliteIcon,
  necs: MeteorIcon,
  phas: AlertTriangleIcon,
}

export const categoryTitles: Record<string, string> = {
  planets: "Planets",
  neas: "NEAs",
  necs: "NECs",
  phas: "PHAs",
}

export const SelectedCategoryContext = createContext<SelectedCategoryContextType>(defaultContext)

export const useSelectedCategory = () => useContext(SelectedCategoryContext)

export const SelectedCategoryProvider = ({ children }: { children: ReactNode }) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryInfo | null>(null)

  return (
    <SelectedCategoryContext.Provider value={{ selectedCategory, setSelectedCategory }}>
      {children}
    </SelectedCategoryContext.Provider>
  )
}
