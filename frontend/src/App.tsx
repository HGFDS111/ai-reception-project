import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DashboardPage from './pages/DashboardPage/DashboardPage'
import ClientsPage from './pages/ClientsPage/ClientsPage'
import CallsPage from './pages/CallsPage/CallsPage'
import Navigation from './widgets/Navigation/Navigation'

function App() {
  return (
    <BrowserRouter>
     <Navigation />
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/clients" element={<ClientsPage />} />
        <Route path="/calls" element={<CallsPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App