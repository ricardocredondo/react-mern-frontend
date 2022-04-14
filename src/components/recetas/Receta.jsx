import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth.hooks';
const Receta = ({ receta }) => {
  const { auth } = useAuth();
  return (
    <>
      <div className=" flex items-center flex-col md:flex-row md:justify-between  mb-5 py-8 px-10 font-bold bg-white rounded ">
        <p className="text-red-500 text-3xl mb-4 md:mb-0">{receta.nombre}</p>
        <div className="flex gap-4 items-center ">
          {receta.creador !== auth._id && (
            <p className="text-xl text-indigo-400">Colaborador</p>
          )}
          <Link
            to={`/recetas/${receta._id}`}
            className="bg-slate-700 py-2 px-5 rounded text-2xl"
          >
            Ver receta
          </Link>
        </div>
      </div>
    </>
  );
};

export default Receta;
