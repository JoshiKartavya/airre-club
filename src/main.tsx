import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { Blogs, Members, MemberDetail } from './Pages/indexPages'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="blog" element={<Blogs />} />
        <Route path="members" element={<Members />} />
        <Route path="members/:slug" element={<MemberDetail />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
