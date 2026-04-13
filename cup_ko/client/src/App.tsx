import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import ModePage from './pages/ModePage'
import CheckOutPage from './pages/CheckOutPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/mode" element={<ModePage />} />
        <Route path="/checkout" element={<CheckOutPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App