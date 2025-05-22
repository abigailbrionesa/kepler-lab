'use server'

import prisma from "@/lib/prisma"
import type { Planet } from "@prisma/client"

export async function getPlanets(): Promise<Planet[]> {
  return await prisma.planet.findMany()
}