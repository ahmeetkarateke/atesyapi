import { Timestamp } from 'firebase/firestore'

export interface Project {
  id: string
  title: string
  description: string
  coverImageUrl: string
  status: 'tamamlandi' | 'devam-ediyor'
  createdAt: Timestamp
}

export interface Message {
  id?: string
  name: string
  email: string
  phone: string
  message: string
  sentAt: Timestamp
  read: boolean
}
