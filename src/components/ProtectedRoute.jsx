import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

export default function ProtectedRoute(){
  const auth = useSelector(s => s.auth);
  const loc = useLocation();
  if(!auth?.isAuthenticated) return <Navigate to="/login" replace state={{ from: loc }} />;
  return <Outlet />;
}
