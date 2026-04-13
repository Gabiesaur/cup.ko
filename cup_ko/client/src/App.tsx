import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import ModePage from './pages/ModePage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/mode" element={<ModePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App