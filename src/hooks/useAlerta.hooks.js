import { useContext } from 'react';
import { AlertaContext } from '../context/Alerta.context';
const useAlerta = () => {
  return useContext(AlertaContext);
};
export default useAlerta;
