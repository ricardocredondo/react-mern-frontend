import { useContext } from 'react';
import { ColaboradoresContext } from '../context/Colaboradores.context';
const useColaboradores = () => {
  return useContext(ColaboradoresContext);
};
export default useColaboradores;
