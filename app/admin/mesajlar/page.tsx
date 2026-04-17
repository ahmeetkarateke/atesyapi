'use client'

export const dynamic = 'force-dynamic'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { signOut } from 'firebase/auth'
import { collection, getDocs, updateDoc, deleteDoc, doc, orderBy, query } from 'firebase/firestore'
import { auth, db } from '@/lib/firebase'
import { Message } from '@/types/project'

export default function MesajlarPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)

  const fetchMessages = async () => {
    const q = query(collection(db, 'messages'), orderBy('sentAt', 'desc'))
    const snapshot = await getDocs(q)
    const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Message))
    setMessages(data)
  }

  useEffect(() => {
    fetchMessages().finally(() => setLoading(false))
  }, [])

  const handleMarkRead = async (id: string) => {
    await updateDoc(doc(db, 'messages', id), { read: true })
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, read: true } : m)))
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Bu mesajı silmek istediğinize emin misiniz?')) return
    await deleteDoc(doc(db, 'messages', id))
    setMessages((prev) => prev.filter((m) => m.id !== id))
  }

  const handleSignOut = async () => {
    await signOut(auth)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold">Yönetim Paneli</h1>
          <Link
            href="/admin/dashboard"
            className="bg-gray-700 hover:bg-gray-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors duration-200"
          >
            Projeler
          </Link>
          <Link
            href="/admin/icerik"
            className="bg-gray-700 hover:bg-gray-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors duration-200"
          >
            İçerik Yönetimi
          </Link>
          <span className="bg-yellow-400 text-gray-900 text-sm font-bold px-4 py-2 rounded-lg">
            Mesajlar
          </span>
        </div>
        <button
          onClick={handleSignOut}
          className="bg-gray-700 hover:bg-gray-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors duration-200"
        >
          Çıkış Yap
        </button>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <h2 className="text-lg font-bold text-gray-900 mb-6">
          Mesajlar ({messages.length})
        </h2>

        <div className="space-y-4">
          {messages.length === 0 && (
            <div className="bg-white rounded-2xl shadow-sm p-10 text-center text-gray-400">
              Henüz mesaj gönderilmemiş.
            </div>
          )}
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`bg-white rounded-2xl shadow-sm p-5 border-l-4 ${
                msg.read ? 'border-gray-200' : 'border-yellow-400'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-gray-900">{msg.name}</p>
                    {!msg.read && (
                      <span className="bg-yellow-400 text-gray-900 text-xs font-bold px-2 py-0.5 rounded-full">
                        Yeni
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mb-1">{msg.email} · {msg.phone}</p>
                  <p className="text-gray-700 mt-2 whitespace-pre-wrap">{msg.message}</p>
                  <p className="text-xs text-gray-400 mt-3">
                    {msg.sentAt?.toDate().toLocaleString('tr-TR')}
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  {!msg.read && (
                    <button
                      onClick={() => handleMarkRead(msg.id!)}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium px-3 py-2 rounded-lg transition-colors duration-200"
                    >
                      Okundu
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(msg.id!)}
                    className="bg-red-100 hover:bg-red-200 text-red-700 text-sm font-medium px-3 py-2 rounded-lg transition-colors duration-200"
                  >
                    Sil
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
