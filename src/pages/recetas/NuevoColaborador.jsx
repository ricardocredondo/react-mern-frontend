import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import useRecetas from '../../hooks/useRecetas.hooks';
import useColaboradores from '../../hooks/useColaboradores.hooks';
import useAlerta from '../../hooks/useAlerta.hooks';
const NuevoColaborador = () => {
  const [email, setEmail] = useState('');
  const params = useParams();
  const { receta, obtenerReceta } = useRecetas();
  const { submitColaborador, colaborador, cargando, agregarColaborador } =
    useColaboradores();
  const { mostrarAlerta } = useAlerta();
  useEffect(() => {
    obtenerReceta(params.id);
  }, []);
  const handleInputChange = ({ target }) => {
    setEmail(target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === '') {
      mostrarAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true,
      });
      return;
    }
    submitColaborador(email);
  };
  const handleAddColaborador = (email) => {
    agregarColaborador(params.id, email);
  };
  return (
    <div className="md:w-1/3 m-auto">
      <h2 className="my-10 text-center uppercase text-5xl">
        Agregar Colaborador{' '}
        <span className="inline-block my-3 text-blue-500 text-4xl">
          {receta.nombre}
        </span>
      </h2>
      <div className="p-8 bg-white rounded">
        <form onSubmit={handleSubmit}>
          <label htmlFor="email" className="text-gray-800">
            email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={handleInputChange}
            className="block w-full my-5 px-6 py-4 bg-gray-800 rounded text-2xl text-white"
          />
          <input
            type="submit"
            value="Buscar Colaborador"
            className="w-full mt-3 py-2 bg-indigo-300 text-gray-500 text-2xl rounded"
          />
        </form>
      </div>
      {cargando ? (
        <p>Cargando...</p>
      ) : (
        colaborador._id && (
          <div className=" my-10 p-8 bg-white">
            <h3 className="text-center mb-10 uppercase font-bold border-b border-gray-300 pb-2">
              resultados
            </h3>
            <div className="flex justify-between">
              <p>{colaborador.email}</p>
              <button
                onClick={() => handleAddColaborador(colaborador.email)}
                className="px-3 py-2 text-xl bg-gray-600 text-white rounded"
              >
                Agregar al proyecto
              </button>
            </div>
          </div>
        )
      )}
      <Link
        to={`/recetas/${receta._id}`}
        className="inline-block my-10 bg-red-400 text-white px-5 py-2 rounded hover:bg-white hover:text-red-400"
      >
        Volver a {receta.nombre}
      </Link>
    </div>
  );
};

export default NuevoColaborador;
