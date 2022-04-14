import useRecetas from './useRecetas.hooks';
import useAuth from './useAuth.hooks';
const useAdmin = () => {
  const { receta } = useRecetas();
  const { auth } = useAuth();
  return receta.creador === auth._id;
};
export default useAdmin;
