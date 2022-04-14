import io from 'socket.io-client';
import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import useRecetas from '../../hooks/useRecetas.hooks';
import useTareas from '../../hooks/useTareas.hooks';
import useColaboradores from '../../hooks/useColaboradores.hooks';
import useAdmin from '../../hooks/useAdmin.hooks';
let socket;
const RecetaCompleta = () => {
  const admin = useAdmin();
  const navigate = useNavigate();
  const { id } = useParams();
  const { isLoading, receta, eliminarReceta } = useRecetas();
  const {
    setTarea,
    eliminarTarea,
    cambiarEstado,
    socketCrearTareas,
    socketEliminarTareas,
    socketEditarTareas,
    socketCambiarEstado,
  } = useTareas();
  const { eliminarColaborador } = useColaboradores();

  useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL);
    socket.emit('ABRIR RECETA', id);
  }, []);
  useEffect(() => {
    socket.on('tarea agregada', (tareaNueva) => {
      if (tareaNueva.receta === receta._id) {
        socketCrearTareas(tareaNueva);
      }
    });
    socket.on('tarea eliminada', (tareaEliminada) => {
      if (tareaEliminada.receta === receta._id) {
        socketEliminarTareas(tareaEliminada);
      }
    });
    socket.on('tarea editada', (tareaEditada) => {
      if (tareaEditada.receta._id === receta._id) {
        socketEditarTareas(tareaEditada);
      }
    });
    socket.on('estado cambiado', (tareaEstado) => {
      if (tareaEstado.receta._id === receta._id) {
        socketCambiarEstado(tareaEstado);
      }
    });
  });

  const handleEliminar = () => {
    eliminarReceta(id);
  };
  const handleEditar = async (tarea) => {
    setTarea(tarea);
    navigate(`/recetas/editar-tareas/${tarea._id}`);
  };
  const handleEliminarTarea = (tarea) => {
    eliminarTarea(tarea);
  };
  const handleEliminarColaborador = (id) => {
    eliminarColaborador(id);
  };
  const handleCambiarEstado = (id) => {
    cambiarEstado(id);
  };
  if (isLoading) return <p>Leyendo datos...</p>;
  return (
    <>
      {/* RECETAS ************************/}
      <div className="flex justify-between items-center my-10 py-10">
        <h2 className=" text-5xl text-yellow-600 uppercase font-bold">
          {receta.nombre}
        </h2>
        {admin && (
          <div className="flex gap-5">
            <div className="flex items-center gap-3 text-green-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              <Link to={`/recetas/editar/${id}`}>Editar</Link>
            </div>
            <div className="flex items-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z"
                />
              </svg>
              <button onClick={handleEliminar}>Eliminar</button>
            </div>
          </div>
        )}
      </div>
      <div className="md:w-3/4 p-10 bg-slate-300 rounded">
        <div className="flex mb-5">
          <p className="md:w-2/6 bg-gray-800 mr-6 p-5 rounded">Ingredientes</p>
          <div className="md:w-4/6 flex-1 bg-gray-800 p-5 rounded">
            {receta.ingredientes.map(({ cantidad, ingrediente, _id }) => (
              <p key={_id}>
                {cantidad} {ingrediente}
              </p>
            ))}
          </div>
        </div>
        <div className="flex">
          <p className="md:w-2/6 bg-gray-800 mr-6 p-5 rounded">Elaboracion</p>
          <p className="md:w-4/6 flex-1 bg-gray-800 p-5 rounded">
            {receta.elaboracion}
          </p>
        </div>
      </div>
      {/* TAREAS ************************/}
      <h2 className="md:w-3/4 mt-10 py-5 uppercase border-b border-purple-300 font-bold text-4xl text-purple-500">
        tareas
      </h2>
      {receta.tareas.length === 0 ? (
        <p className="md:w-3/4 my-10 bg-white py-5 text-center rounded">
          No hay tareas
        </p>
      ) : (
        receta.tareas.map((tarea, idx) => (
          <div key={idx}>
            <div className="flex justify-between items-center my-10 py-10">
              <h2 className=" text-4xl text-yellow-600 uppercase font-bold">
                {tarea.nombre}
              </h2>
              {admin && (
                <div className="flex gap-5">
                  <div className="flex items-center gap-3 text-green-700">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    <button onClick={() => handleEditar(tarea)}>Editar</button>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z"
                      />
                    </svg>
                    <button onClick={() => handleEliminarTarea(tarea)}>
                      Eliminar
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="md:w-3/4 p-10 bg-slate-300 rounded">
              <div className="flex mb-5">
                <p className="md:w-2/6 bg-gray-800 mr-6 p-5 rounded">
                  Descripcion de la tarea
                </p>
                <div className="md:w-4/6 flex-1 bg-gray-800 p-5 rounded">
                  <p>{tarea.descripcion}</p>
                </div>
              </div>
              <div className="flex mb-5">
                <p className="md:w-2/6 bg-gray-800 mr-6 p-5 rounded">
                  Estado de la tarea
                </p>
                <button
                  className={`${
                    tarea.estado ? 'bg-blue-500' : 'bg-red-500'
                  } md:w-4/6 flex-1 p-5 rounded uppercase text-white`}
                  onClick={() => handleCambiarEstado(tarea._id)}
                >
                  {tarea.estado ? 'completada' : 'no completada'}
                </button>
              </div>
              <div className="flex mb-5">
                <p className="md:w-2/6 bg-gray-800 mr-6 p-5 rounded">
                  Prioridad de la tarea
                </p>
                <p className="md:w-4/6 flex-1 bg-gray-800 p-5 rounded">
                  {tarea.prioridad}
                </p>
              </div>
              <div className="flex">
                <p className="md:w-2/6 bg-gray-800 mr-6 p-5 rounded">
                  Completada por
                </p>
                <p className="md:w-4/6 flex-1 bg-gray-800 p-5 rounded">
                  {tarea.completada.nombre}
                </p>
              </div>
            </div>
          </div>
        ))
      )}
      <div className="inline-flex gap-2 items-center mt-8 px-6 py-3 bg-gray-700 text-xl text-white rounded">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <Link to="/recetas/crear-tareas">Crear Tarea</Link>
      </div>
      {/* COLABORADORES*************************** */}
      {admin && (
        <>
          <h2 className="md:w-3/4 mt-10 py-5 uppercase font-bold border-b border-purple-300 text-4xl text-purple-500">
            colaboradores
          </h2>
          {receta.colaboradores.length === 0 ? (
            <p className="md:w-3/4 my-10 bg-white text-center rounded py-5">
              No hay colaboradores
            </p>
          ) : (
            receta.colaboradores.map((colaborador) => (
              <div
                key={colaborador._id}
                className="flex items-start justify-between my-10"
              >
                <div className="md:w-3/4 mb-10 p-10 bg-slate-300 rounded">
                  <div className="flex mb-5">
                    <p className="md:w-2/6 bg-gray-800 mr-6 p-5 rounded">
                      Nombre
                    </p>
                    <div className="md:w-4/6 flex-1 bg-gray-800 p-5 rounded">
                      <p>{colaborador.nombre}</p>
                    </div>
                  </div>
                  <div className="flex mb-5">
                    <p className="md:w-2/6 bg-gray-800 mr-6 p-5 rounded">
                      email
                    </p>
                    <div className="md:w-4/6 flex-1 bg-gray-800 p-5 rounded">
                      <p>{colaborador.email}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z"
                    />
                  </svg>
                  <button
                    onClick={() => handleEliminarColaborador(colaborador._id)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))
          )}
          <div className="inline-flex gap-2 items-center mt-8 px-6 py-3 bg-gray-700 text-xl text-white rounded">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <Link to={`/recetas/nuevo-colaborador/${receta._id}`}>
              Agregar Colaborador
            </Link>
          </div>
        </>
      )}
    </>
  );
};

export default RecetaCompleta;
