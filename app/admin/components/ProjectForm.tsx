'use client'

import { useState } from 'react'
import { collection, addDoc, updateDoc, doc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Project } from '@/types/project'

interface ProjectFormProps {
  project?: Project
  onSuccess: () => void
  onCancel: () => void
}

export default function ProjectForm({ project, onSuccess, onCancel }: ProjectFormProps) {
  const [title, setTitle] = useState(project?.title ?? '')
  const [description, setDescription] = useState(project?.description ?? '')
  const [coverImageUrl, setCoverImageUrl] = useState(project?.coverImageUrl ?? '')
  const [status, setStatus] = useState<'tamamlandi' | 'devam-ediyor'>(project?.status ?? 'devam-ediyor')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const data = { title, description, coverImageUrl, status }

    try {
      if (project) {
        await updateDoc(doc(db, 'projects', project.id), data)
      } else {
        await addDoc(collection(db, 'projects'), { ...data, createdAt: serverTimestamp() })
      }
      onSuccess()
    } catch {
      setError('İşlem sırasında bir hata oluştu. Lütfen tekrar deneyin.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Başlık</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-400"
          placeholder="Proje başlığı"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Açıklama</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-400 resize-none"
          placeholder="Proje açıklaması"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Kapak Fotoğrafı URL</label>
        <input
          type="text"
          value={coverImageUrl}
          onChange={(e) => setCoverImageUrl(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-400"
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Durum</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as 'tamamlandi' | 'devam-ediyor')}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-400 bg-white"
        >
          <option value="devam-ediyor">Devam Ediyor</option>
          <option value="tamamlandi">Tamamlandı</option>
        </select>
      </div>

      {error && (
        <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-3">
          {error}
        </p>
      )}

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-yellow-400 hover:bg-yellow-300 disabled:bg-yellow-200 disabled:cursor-not-allowed text-gray-900 font-bold py-2 rounded-lg transition-colors duration-200"
        >
          {loading ? 'Kaydediliyor...' : project ? 'Güncelle' : 'Ekle'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 rounded-lg transition-colors duration-200"
        >
          İptal
        </button>
      </div>
    </form>
  )
}
