import { useContext } from 'react';
import { RecetasContext } from '../context/Recetas.context';
const useRecetas = () => {
  return useContext(RecetasContext);
};
export default useRecetas;
