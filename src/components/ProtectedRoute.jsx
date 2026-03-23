import { useAuth } from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const user = useAuth();

  if (user === undefined) {
    // Still resolving session — render nothing, no redirect
    return (
      <div className="min-h-screen bg-[#FBF9F7] flex items-center justify-center">
        <span className="w-6 h-6 border border-[#A65A44]/30 border-t-[#A65A44] rounded-full animate-spin" />
      </div>
    );
  }

  if (user === null) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
