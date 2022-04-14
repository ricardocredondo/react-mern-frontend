import { Outlet, Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth.hooks';
import Header from '../components/usuarios/Header';
import AlertaModal from '../components/AlertaModal';
const RutaProtegida = () => {
  const { auth, cargando } = useAuth();
  if (cargando) return 'Cargando...';
  return (
    <>
      {auth._id ? (
        <>
          <Header />
          <main className="__contenedor">
            <Outlet />
          </main>
        </>
      ) : (
        <Navigate to="/" />
      )}
      <AlertaModal />
    </>
  );
};

export default RutaProtegida;
