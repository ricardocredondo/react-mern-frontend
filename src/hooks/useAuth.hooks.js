import { useContext } from 'react';
import { AuthContext } from '../context/Auth.context';
const useAuth = () => {
  return useContext(AuthContext);
};
export default useAuth;
