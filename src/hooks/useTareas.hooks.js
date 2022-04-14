import { useContext } from 'react';
import { TareasContext } from '../context/Tareas.context';
const useTareas = () => {
  return useContext(TareasContext);
};
export default useTareas;
