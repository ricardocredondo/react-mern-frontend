import { useParams } from 'react-router-dom';
import useFormulario from '../../hooks/useFormulario.hooks';
import useTareas from '../../hooks/useTareas.hooks';
import useAlerta from '../../hooks/useAlerta.hooks';
const EditarTarea = () => {
  const params = useParams();
  const { mostrarAlerta } = useAlerta();
  const { tarea, cargando, editarTarea } = useTareas();
  const initialValues = {
    nombre: tarea.nombre || '',
    descripcion: tarea.descripcion || '',
    prioridad: tarea.prioridad || '',
  };
  const { values, handleInputChange, handleReset } =
    useFormulario(initialValues);

  const { nombre, descripcion, prioridad } = values;
  const PRIORIDAD = ['Baja', 'Media', 'Alta'];
  const handleSubmit = (e) => {
    e.preventDefault();
    if ([nombre, descripcion, prioridad].includes('')) {
      mostrarAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true,
      });
    }
    editarTarea(params.id, values);
  };
  if (cargando) return <p>Cargando...</p>;
  return (
    <div className="md:w-1/2 mx-auto">
      <h2 className="my-5 py-5 text-center uppercase text-4xl text-red-400">
        Editar Tarea
      </h2>
      <div className="md:w-3/4 mx-auto p-10">
        <form onSubmit={handleSubmit}>
          <div className="mb-8">
            <label htmlFor="nombre">nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={nombre}
              onChange={handleInputChange}
              className="w-full mt-3 px-5 py-2 rounded outline-none border-none text-gray-800"
            />
          </div>
          <div className="mb-8">
            <label htmlFor="descripcion">descripcion</label>
            <textarea
              name="descripcion"
              id="descripcion"
              value={descripcion}
              onChange={handleInputChange}
              className="w-full mt-3 px-5 py-2 rounded outline-none border-none text-gray-800"
            ></textarea>
          </div>
          <div className="mb-8">
            <label htmlFor="prioridad">prioridad</label>
            <select
              name="prioridad"
              id="prioridad"
              value={prioridad}
              onChange={handleInputChange}
              className="w-full mt-3 px-5 py-2 outline-none border-none rounded text-gray-800"
            >
              <option value=""> -- Selecciona Prioridad -- </option>
              {PRIORIDAD.map((prioridad, idx) => (
                <option key={idx} value={prioridad}>
                  {prioridad}
                </option>
              ))}
            </select>
          </div>
          <input
            type="submit"
            value="Editar Tarea"
            className="w-full mt-5 py-2 bg-red-400 text-white hover:bg-red-500 cursor-pointer rounded"
          />
        </form>
      </div>
    </div>
  );
};

export default EditarTarea;
