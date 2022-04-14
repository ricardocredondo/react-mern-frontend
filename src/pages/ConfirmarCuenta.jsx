import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth.hooks';
import styles from '../styles/Formulario.module.css';
const ConfirmarCuenta = () => {
  const params = useParams();
  const { confirmarCuenta, cuentaConfirmada } = useAuth();
  useEffect(() => {
    confirmarCuenta(params.id);
  }, []);
  return (
    <main className={styles.formulario__contenedor}>
      <h2 className={styles.formulario__title}>
        Inicia Sesión <span> y administra Tus Recetas</span>
      </h2>
      {cuentaConfirmada && (
        <p>
          ¿Ya tienes una cuenta?
          <Link to="/">Inicia Sesión</Link>
        </p>
      )}
    </main>
  );
};

export default ConfirmarCuenta;
