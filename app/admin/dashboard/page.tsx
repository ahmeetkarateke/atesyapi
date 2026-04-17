'use client'

export const dynamic = 'force-dynamic'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { signOut } from 'firebase/auth'
import { collection, getDocs, deleteDoc, doc, query, where } from 'firebase/firestore'
import { auth, db } from '@/lib/firebase'
import { Project } from '@/types/project'
import ProjectForm from '@/app/admin/components/ProjectForm'

export default function DashboardPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | undefined>(undefined)

  const fetchProjects = async () => {
    const snapshot = await getDocs(collection(db, 'projects'))
    const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Project))
    setProjects(data)
  }

  const fetchUnreadMessages = async () => {
    const q = query(collection(db, 'messages'), where('read', '==', false))
    const snapshot = await getDocs(q)
    setUnreadCount(snapshot.size)
  }

  useEffect(() => {
    const init = async () => {
      await Promise.all([fetchProjects(), fetchUnreadMessages()])
      setLoading(false)
    }
    init()
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm('Bu projeyi silmek istediğinize emin misiniz?')) return
    await deleteDoc(doc(db, 'projects', id))
    setProjects((prev) => prev.filter((p) => p.id !== id))
  }

  const handleEdit = (project: Project) => {
    setEditingProject(project)
    setShowForm(true)
  }

  const handleFormSuccess = async () => {
    setShowForm(false)
    setEditingProject(undefined)
    await fetchProjects()
  }

  const handleFormCancel = () => {
    setShowForm(false)
    setEditingProject(undefined)
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
            href="/admin/icerik"
            className="bg-gray-700 hover:bg-gray-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors duration-200"
          >
            İçerik Yönetimi
          </Link>
          <Link
            href="/admin/mesajlar"
            className={`text-xs font-bold px-2.5 py-1 rounded-full transition-colors duration-200 ${
              unreadCount > 0
                ? 'bg-yellow-400 text-gray-900 hover:bg-yellow-300'
                : 'bg-gray-700 text-white hover:bg-gray-600'
            }`}
          >
            {unreadCount > 0 ? `${unreadCount} okunmamış mesaj` : 'Mesajlar'}
          </Link>
        </div>
        <button
          onClick={handleSignOut}
          className="bg-gray-700 hover:bg-gray-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors duration-200"
        >
          Çıkış Yap
        </button>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {showForm ? (
          <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-5">
              {editingProject ? 'Projeyi Düzenle' : 'Yeni Proje Ekle'}
            </h2>
            <ProjectForm
              project={editingProject}
              onSuccess={handleFormSuccess}
              onCancel={handleFormCancel}
            />
          </div>
        ) : (
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900">Projeler ({projects.length})</h2>
            <button
              onClick={() => setShowForm(true)}
              className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold px-5 py-2 rounded-lg transition-colors duration-200"
            >
              + Yeni Proje Ekle
            </button>
          </div>
        )}

        <div className="space-y-4">
          {projects.length === 0 && !showForm && (
            <div className="bg-white rounded-2xl shadow-sm p-10 text-center text-gray-400">
              Henüz proje eklenmemiş.
            </div>
          )}
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-2xl shadow-sm p-5 flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4 min-w-0">
                {project.coverImageUrl && (
                  <img
                    src={project.coverImageUrl}
                    alt={project.title}
                    className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                  />
                )}
                <div className="min-w-0">
                  <p className="font-semibold text-gray-900 truncate">{project.title}</p>
                  <span
                    className={`inline-block text-xs font-medium px-2.5 py-0.5 rounded-full mt-1 ${
                      project.status === 'tamamlandi'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-blue-100 text-blue-700'
                    }`}
                  >
                    {project.status === 'tamamlandi' ? 'Tamamlandı' : 'Devam Ediyor'}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => handleEdit(project)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium px-4 py-2 rounded-lg transition-colors duration-200"
                >
                  Düzenle
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="bg-red-100 hover:bg-red-200 text-red-700 text-sm font-medium px-4 py-2 rounded-lg transition-colors duration-200"
                >
                  Sil
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
