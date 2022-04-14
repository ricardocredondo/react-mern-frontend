import { createContext, useState } from 'react';
export const ColaboradoresContext = createContext();
import clienteAxios from '../config/clienteAxios.config';
import authorizationBearer from '../config/authorization.config';
import useAlerta from '../hooks/useAlerta.hooks';
import useRecetas from '../hooks/useRecetas.hooks';
const ColaboradoresProvider = (props) => {
  const [colaborador, setColaborador] = useState({});
  const [cargando, setCargando] = useState(false);
  const { mostrarAlerta } = useAlerta();
  const { receta, setReceta } = useRecetas();
  const submitColaborador = async (email) => {
    setCargando(true);
    const config = authorizationBearer();
    try {
      const { data } = await clienteAxios.post(
        '/recetas/colaboradores',
        { email },
        config
      );
      setColaborador(data);
      setCargando(false);
    } catch (error) {
      mostrarAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };
  const agregarColaborador = async (id, email) => {
    const config = authorizationBearer();
    try {
      const { data } = await clienteAxios.post(
        `/recetas/agregar-colaborador/${id}`,
        { email },
        config
      );
      mostrarAlerta({
        msg: data.msg,
        error: false,
      });
      setColaborador({});
    } catch (error) {
      mostrarAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };
  const eliminarColaborador = async (id) => {
    const config = authorizationBearer();
    try {
      const { data } = await clienteAxios.post(
        `/recetas/eliminar-colaborador/${receta._id}`,
        { id },
        config
      );
      const recetaActualizada = { ...receta };
      recetaActualizada.colaboradores = recetaActualizada.colaboradores.filter(
        (col) => col._id !== id
      );
      setReceta(recetaActualizada);
      mostrarAlerta({
        msg: data.msg,
        error: false,
      });
    } catch (error) {
      mostrarAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };
  return (
    <ColaboradoresContext.Provider
      value={{
        submitColaborador,
        colaborador,
        cargando,
        agregarColaborador,
        eliminarColaborador,
      }}
    >
      {props.children}
    </ColaboradoresContext.Provider>
  );
};
export default ColaboradoresProvider;
