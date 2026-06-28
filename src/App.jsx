import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'

// Layout
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import FloatingActions from './components/layout/FloatingActions'
import ProtectedRoute from './components/admin/ProtectedRoute'

// Public pages
import Home from './pages/public/Home'
import Doctors from './pages/public/Doctors'
import Services from './pages/public/Services'
import Conditions from './pages/public/Conditions'
import ConditionDetail from './pages/public/ConditionDetail'
import LabTests from './pages/public/LabTests'
import HealthTips from './pages/public/HealthTips'
import HealthTipDetail from './pages/public/HealthTipDetail'
import Reviews from './pages/public/Reviews'
import Contact from './pages/public/Contact'

// Admin pages
import Login from './pages/admin/Login'
import Dashboard from './pages/admin/Dashboard'
import Patients from './pages/admin/Patients'
import PatientDetail from './pages/admin/PatientDetail'
import Medicines from './pages/admin/Medicines'
import Billing from './pages/admin/Billing'
import NewBill from './pages/admin/NewBill'
import BillDetail from './pages/admin/BillDetail'

const ScrollToTop = () => {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

// Public layout wrapper
const PublicLayout = ({ children }) => (
  <>
    <Navbar />
    <FloatingActions />
    <main className="min-h-screen pb-16 lg:pb-0">
      {children}
    </main>
    <Footer />
  </>
)

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>

        {/* Public routes */}
        <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
        <Route path="/doctors" element={<PublicLayout><Doctors /></PublicLayout>} />
        <Route path="/services" element={<PublicLayout><Services /></PublicLayout>} />
        <Route path="/conditions" element={<PublicLayout><Conditions /></PublicLayout>} />
        <Route path="/conditions/:slug" element={<PublicLayout><ConditionDetail /></PublicLayout>} />
        <Route path="/lab-tests" element={<PublicLayout><LabTests /></PublicLayout>} />
        <Route path="/health-tips" element={<PublicLayout><HealthTips /></PublicLayout>} />
        <Route path="/health-tips/:slug" element={<PublicLayout><HealthTipDetail /></PublicLayout>} />
        <Route path="/reviews" element={<PublicLayout><Reviews /></PublicLayout>} />
        <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />

        {/* Admin routes */}
        <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/admin/patients" element={<ProtectedRoute><Patients /></ProtectedRoute>} />
        <Route path="/admin/patients/:id" element={<ProtectedRoute><PatientDetail /></ProtectedRoute>} />
        <Route path="/admin/medicines" element={<ProtectedRoute><Medicines /></ProtectedRoute>} />
        <Route path="/admin/billing" element={<ProtectedRoute><Billing /></ProtectedRoute>} />
        <Route path="/admin/billing/new" element={<ProtectedRoute><NewBill /></ProtectedRoute>} />
        <Route path="/admin/billing/:id" element={<ProtectedRoute><BillDetail /></ProtectedRoute>} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App