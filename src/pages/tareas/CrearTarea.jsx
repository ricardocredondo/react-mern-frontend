import useFormulario from '../../hooks/useFormulario.hooks';
import useTareas from '../../hooks/useTareas.hooks';
const CrearTarea = () => {
  const { crearTarea } = useTareas();
  const prioridades = ['Baja', 'Media', 'Alta'];
  const initialValues = {
    nombre: '',
    descripcion: '',
    prioridad: '',
  };
  const { values, handleInputChange, handleReset } =
    useFormulario(initialValues);
  const { nombre, descripcion, prioridad } = values;
  const handleSubmit = (e) => {
    e.preventDefault();
    if ([nombre, descripcion, prioridad].includes('')) {
      mostrarAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true,
      });
    }
    crearTarea(values);
    handleReset();
  };
  return (
    <div className="md:w-1/2 mx-auto">
      <h2 className="my-5 py-5 text-center uppercase text-4xl text-red-400">
        Crear Tarea
      </h2>
      <div className="md:w-3/4 mx-auto p-10">
        <form onSubmit={handleSubmit}>
          <div className="mb-8">
            <label htmlFor="nombre">Nombre</label>
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
            <label htmlFor="descripcion">Descripcion</label>
            <textarea
              type="text"
              id="descripcion"
              name="descripcion"
              value={descripcion}
              onChange={handleInputChange}
              className="w-full mt-3 px-5 py-2 rounded outline-none border-none text-gray-800"
            ></textarea>
          </div>
          <div className="mb-8">
            <label htmlFor="prioridad">Prioridad</label>
            <select
              name="prioridad"
              id="prioridad"
              value={prioridad}
              onChange={handleInputChange}
              className="w-full mt-3 px-5 py-2 outline-none border-none rounded text-gray-800"
            >
              <option value="">-- Selecciona prioridad --</option>
              {prioridades.map((PRIORIDAD, idx) => (
                <option key={idx} value={PRIORIDAD}>
                  {PRIORIDAD}
                </option>
              ))}
            </select>
          </div>
          <input
            type="submit"
            value="Crear Tarea"
            className="w-full mt-5 py-2 bg-red-400 text-white hover:bg-red-500 cursor-pointer rounded"
          />
        </form>
      </div>
    </div>
  );
};

export default CrearTarea;
