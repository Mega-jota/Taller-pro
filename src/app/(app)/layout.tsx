import Sidebar from '@/components/Sidebar'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden" style={{ background: 'var(--background)' }}>
      <Sidebar />
      <main className="flex-1 ml-60 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
