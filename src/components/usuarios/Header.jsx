import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth.hooks';
import useRecetas from '../../hooks/useRecetas.hooks';
import useTareas from '../../hooks/useTareas.hooks';
import styles from '../../styles/usuarios/components/Header.module.css';
import Nav from './Nav';
const Header = () => {
  const [busqueda, setBusqueda] = useState([]);
  const [mostrarBoton, setMostrarBoton] = useState(false);
  const [termino, setTermino] = useState('');
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { auth, setAuth } = useAuth();
  const { recetas, setRecetas } = useRecetas();
  const { setTarea } = useTareas();
  const handleCerrarSesion = () => {
    localStorage.removeItem('tokenUser');
    setAuth({});
    setRecetas([]);
    setTarea({});
    navigate('/');
  };
  const handleInputChange = (e) => {
    setTermino(e.target.value);
  };
  useEffect(() => {
    termino.length > 0 ? setMostrarBoton(true) : setMostrarBoton(false);
    const recetasBuscadas = recetas.filter((receta) =>
      receta.nombre.toLowerCase().trim().includes(termino)
    );
    setBusqueda(recetasBuscadas);
  }, [termino]);
  const handleRecetaEncontrada = (id) => {
    setMostrarBoton(false);
    navigate(`/recetas/${id}`);
    setBusqueda([]);
    setTermino('');
  };
  return (
    <header className={styles.header}>
      <h1 className={styles.header__title}>
        Recetas <span>Cocina</span>
      </h1>
      {auth._id && (
        <div className={styles.header__recetas}>
          <nav className={styles.header__navegacion}>
            <Link to="/recetas">Recetas</Link>
          </nav>
          {pathname === '/recetas' && (
            <div className="relative">
              <form>
                <input
                  type="search"
                  placeholder="Buscar Recetas"
                  name="termino"
                  value={termino}
                  onChange={handleInputChange}
                />
              </form>
              {mostrarBoton && (
                <div className="w-96 absolute top-24 z-10 text-left text-gray-700 bg-white bg-opacity-50 -mt-1 pl-3 py-3 rounded-b">
                  {mostrarBoton &&
                    busqueda.map((recetaBuscada) => (
                      <button
                        key={recetaBuscada._id}
                        className="block"
                        onClick={() =>
                          handleRecetaEncontrada(recetaBuscada._id)
                        }
                      >
                        {recetaBuscada.nombre}
                      </button>
                    ))}
                </div>
              )}
            </div>
          )}
          <p>Hola, {auth.nombre}</p>
        </div>
      )}
      <div className={styles.header__interaccion}>
        <Nav />
        {auth._id && (
          <button onClick={handleCerrarSesion}>Cerrar Sesion</button>
        )}
      </div>
    </header>
  );
};

export default Header;
