'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

interface Project {
  id: string;
  title: string;
  description: string;
  coverImageUrl: string;
  status: 'tamamlandi' | 'devam-ediyor';
  createdAt: { seconds: number };
}

type Filter = 'tumü' | 'devam-ediyor' | 'tamamlandi';

const filterOptions: { value: Filter; label: string }[] = [
  { value: 'tumü', label: 'Tümü' },
  { value: 'devam-ediyor', label: 'Devam Ediyor' },
  { value: 'tamamlandi', label: 'Tamamlandı' },
];

export default function ProjelerimizPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<Filter>('tumü');

  useEffect(() => {
    async function fetchProjects() {
      try {
        const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Project[];
        setProjects(data);
      } catch (err) {
        console.error('Projeler yüklenirken hata:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  const filtered =
    activeFilter === 'tumü'
      ? projects
      : projects.filter((p) => p.status === activeFilter);

  return (
    <>
      <section className="bg-[#1F2937] py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Projelerimiz</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Tamamlanan ve devam eden projelerimizi inceleyin.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-3 justify-center mb-12 flex-wrap">
            {filterOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setActiveFilter(opt.value)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-colors duration-200 ${
                  activeFilter === opt.value
                    ? 'bg-[#FBBF24] text-[#1F2937]'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-24">
              <div className="flex flex-col items-center gap-4">
                <div className="w-10 h-10 border-4 border-[#FBBF24] border-t-transparent rounded-full animate-spin" />
                <p className="text-gray-500 text-sm">Projeler yükleniyor...</p>
              </div>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-gray-400 text-lg">Bu kategoride henüz proje bulunmuyor.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((project) => (
                <div
                  key={project.id}
                  className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div className="relative h-52 bg-gray-100">
                    {project.coverImageUrl ? (
                      <Image
                        src={project.coverImageUrl}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200">
                        <svg
                          className="w-12 h-12 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                          />
                        </svg>
                      </div>
                    )}
                    <div className="absolute top-3 right-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          project.status === 'devam-ediyor'
                            ? 'bg-[#FBBF24] text-[#1F2937]'
                            : 'bg-green-100 text-green-700'
                        }`}
                      >
                        {project.status === 'devam-ediyor' ? 'Devam Ediyor' : 'Tamamlandı'}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-[#1F2937] font-bold text-base mb-2">{project.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
