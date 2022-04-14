import { useNavigate } from 'react-router-dom';
import { createContext, useState } from 'react';
import useAlerta from '../hooks/useAlerta.hooks';
import clienteAxios from '../config/clienteAxios.config';
import authorizationBearer from '../config/authorization.config';
export const RecetasContext = createContext();
const RecetasProvider = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [recetas, setRecetas] = useState([]);
  const [receta, setReceta] = useState({});
  const { mostrarAlerta } = useAlerta();
  const navigate = useNavigate();
  const obtenerRecetas = async () => {
    const config = authorizationBearer();
    const { data } = await clienteAxios('/recetas', config);
    setRecetas(data);
  };
  const crearReceta = async (nombre, ingredientes, elaboracion) => {
    const config = authorizationBearer();
    try {
      const { data } = await clienteAxios.post(
        '/recetas',
        { nombre, ingredientes, elaboracion },
        config
      );
      setRecetas([...recetas, data]);
      mostrarAlerta({
        msg: 'La receta se ha creado correctamente',
        error: false,
      });
      setTimeout(() => navigate('/recetas'), 2000);
    } catch (error) {
      mostrarAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };
  const obtenerReceta = async (id) => {
    setIsLoading(true);
    const config = authorizationBearer();
    try {
      const { data } = await clienteAxios(`/recetas/${id}`, config);
      setReceta(data);
      setIsLoading(false);
    } catch (error) {
      mostrarAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };
  const editarReceta = async (id, nombre, ingredientes, elaboracion) => {
    const config = authorizationBearer();
    try {
      const { data } = await clienteAxios.put(
        `/recetas/${id}`,
        {
          nombre,
          ingredientes,
          elaboracion,
        },
        config
      );
      const recetasActualizadas = [...recetas].map((recetaState) => {
        return recetaState._id === data._id ? data : recetaState;
      });
      setRecetas(recetasActualizadas);
      mostrarAlerta({
        msg: 'Receta editada correctamente',
        error: false,
      });
    } catch (error) {
      mostrarAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };
  const eliminarReceta = async (id) => {
    const config = authorizationBearer();
    try {
      const { data } = await clienteAxios.delete(`/recetas/${id}`, config);

      const recetasActualizadas = [...recetas].filter(
        (recetaState) => recetaState._id !== id
      );

      setRecetas(recetasActualizadas);
      mostrarAlerta({
        msg: data.msg,
        error: false,
      });
      setTimeout(() => navigate('/recetas'), 3000);
    } catch (error) {
      mostrarAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };
  return (
    <RecetasContext.Provider
      value={{
        isLoading,
        recetas,
        setRecetas,
        receta,
        setReceta,
        crearReceta,
        obtenerRecetas,
        obtenerReceta,
        editarReceta,
        eliminarReceta,
      }}
    >
      {props.children}
    </RecetasContext.Provider>
  );
};
export default RecetasProvider;
