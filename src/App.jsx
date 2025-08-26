import { Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoute from '@/components/ProtectedRoute'
import Layout from '@/components/Layout'
import Login from '@/pages/Login'
import Dashboard from '@/pages/Dashboard'
import Users from '@/pages/Users'
import Settings from '@/pages/Settings'

export default function App(){
  return (
    <Routes>
      <Route path="/login" element={<Login/>} />
      <Route element={<ProtectedRoute/>}>
        <Route element={<Layout/>}>
          <Route index element={<Navigate to="/dashboard" replace/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/users" element={<Users/>} />
          <Route path="/settings" element={<Settings/>} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" replace/>} />
    </Routes>
  )
}
