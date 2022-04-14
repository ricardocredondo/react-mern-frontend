import io from 'socket.io-client';
import { createContext, useState, useEffect } from 'react';
export const TareasContext = createContext();
import { useNavigate } from 'react-router-dom';
import useAlerta from '../hooks/useAlerta.hooks';
import useRecetas from '../hooks/useRecetas.hooks';
import authorizationBearer from '../config/authorization.config';
import clienteAxios from '../config/clienteAxios.config';
let socket;
const TareasProvider = (props) => {
  const { receta, setReceta } = useRecetas();
  const [tarea, setTarea] = useState({});
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();
  const { mostrarAlerta } = useAlerta();
  // ! SOCKET.IO
  useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL);
  }, []);
  const crearTarea = async ({ nombre, descripcion, prioridad }) => {
    const config = authorizationBearer();
    try {
      const { data } = await clienteAxios.post(
        '/tareas',
        { receta: receta._id, nombre, descripcion, prioridad },
        config
      );

      mostrarAlerta({
        msg: 'Tarea Creada Correctamente',
        error: false,
      });
      // ! SOCKET.IO
      socket.emit('nueva tarea', data);
      setTimeout(() => navigate(`/recetas/${receta._id}`), 3000);
    } catch (error) {
      mostrarAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };
  const obtenerTarea = async (id) => {
    const config = authorizationBearer();
    try {
      const { data } = await clienteAxios(`/tareas/${id}`, config);
      console.log(data);
      setTarea(data);
    } catch (error) {
      console.log(error);
    }
  };
  const editarTarea = async (id, { nombre, descripcion, prioridad }) => {
    const config = authorizationBearer();
    try {
      const { data } = await clienteAxios.put(
        `/tareas/${id}`,
        { nombre, descripcion, prioridad },
        config
      );
      // ! SOCKET.IO
      socket.emit('editar tarea', data);
      console.log(data);

      mostrarAlerta({
        msg: 'Tarea Editada Correctamente',
        error: false,
      });
      setTimeout(() => navigate(`/recetas/${receta._id}`), 3000);
    } catch (error) {
      console.log(error);
    }
  };
  const eliminarTarea = async (tarea) => {
    const config = authorizationBearer();
    try {
      const { data } = await clienteAxios.delete(
        `/tareas/${tarea._id}`,
        config
      );
      // ! SOCKET.IO
      socket.emit('eliminar tarea', tarea);
      setTarea({});
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
  const cambiarEstado = async (id) => {
    const config = authorizationBearer();
    try {
      const { data } = await clienteAxios.post(
        `/tareas/estado/${id}`,
        {},
        config
      );
      // ! SOCKET.IO
      socket.emit('cambiar estado', data);

      setTarea({});
    } catch (error) {
      mostrarAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };
  // ! SOCKET.IO
  const socketCrearTareas = (tareaNueva) => {
    const recetaActualizada = { ...receta };
    recetaActualizada.tareas = [...receta.tareas, tareaNueva];
    setReceta(recetaActualizada);
  };
  const socketEliminarTareas = (tareaEliminada) => {
    const recetaActualizada = { ...receta };
    recetaActualizada.tareas = recetaActualizada.tareas.filter(
      (tareaState) => tareaState._id !== tareaEliminada._id
    );
    setReceta(recetaActualizada);
  };
  const socketEditarTareas = (tareaEditada) => {
    const recetaActualizada = { ...receta };
    recetaActualizada.tareas = recetaActualizada.tareas.map((tareaState) =>
      tareaState._id === tareaEditada._id ? tareaEditada : tareaState
    );
    setReceta(recetaActualizada);
  };
  const socketCambiarEstado = (tareaEstado) => {
    const recetaActualizada = { ...receta };
    recetaActualizada.tareas = recetaActualizada.tareas.map((tareaState) =>
      tareaState._id === tareaEstado._id ? tareaEstado : tareaState
    );
    setReceta(recetaActualizada);
  };
  return (
    <TareasContext.Provider
      value={{
        tarea,
        setTarea,
        cargando,
        crearTarea,
        obtenerTarea,
        editarTarea,
        eliminarTarea,
        cambiarEstado,
        socketCrearTareas,
        socketEliminarTareas,
        socketEditarTareas,
        socketCambiarEstado,
      }}
    >
      {props.children}
    </TareasContext.Provider>
  );
};
export default TareasProvider;
