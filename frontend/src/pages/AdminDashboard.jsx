
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/userContext';

const AdminDashboard = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div>Loading...</div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div>AdminDashboard {user && user.name}</div>
  );
};

export default AdminDashboard;