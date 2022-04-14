import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Receta from '../../components/recetas/Receta';
import useRecetas from '../../hooks/useRecetas.hooks';

const Recetas = () => {
  const { recetas, obtenerRecetas } = useRecetas();
  console.log({ RECETAS: recetas });
  useEffect(() => {
    obtenerRecetas();
  }, []);

  return (
    <div className="my-10">
      <h2 className="text-center my-10 py-5 text-5xl uppercase">
        Recetas de cocina
      </h2>
      <div className="mx-auto flex justify-around items-start">
        <div className="w-4/6 sm:1/2 md:w-3/4">
          {recetas.length === 0 ? (
            <p className="bg-white rounded text-center py-5">No hay recetas</p>
          ) : (
            recetas.map((receta) => <Receta key={receta._id} receta={receta} />)
          )}
        </div>
        <div className="flex-1 text-center">
          <Link
            to="/recetas/crear-receta"
            className="bg-blue-400 inline-block mt-3 px-5 py-3 text-white rounded text-2xl hover:bg-blue-500 hover:transition"
          >
            Crear Receta
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Recetas;
