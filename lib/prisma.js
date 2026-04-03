import { PrismaClient } from '../generated/prisma'

let prisma

if (typeof window === 'undefined') {
  if (!global.prisma) {
    global.prisma = new PrismaClient()
  }
  prisma = global.prisma
} else {
  prisma = new PrismaClient() // sécurité inutile côté client, mais garde-le
}

export default prisma
