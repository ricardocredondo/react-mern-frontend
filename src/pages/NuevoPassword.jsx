import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import useFormulario from '../hooks/useFormulario.hooks';
import useAlerta from '../hooks/useAlerta.hooks';
import useAuth from '../hooks/useAuth.hooks';
import styles from '../styles/Formulario.module.css';
const NuevoPassword = () => {
  const params = useParams();
  const { mostrarAlerta } = useAlerta();
  const { generarNuevoPassword, revisarToken, comprobacionToken } = useAuth();
  useEffect(() => {
    comprobacionToken(params.token);
  }, []);
  const initialValues = {
    password: '',
    password2: '',
  };
  const { values, handleInputChange, handleReset } =
    useFormulario(initialValues);
  const { password, password2 } = values;
  const handleSubmit = (e) => {
    e.preventDefault();
    if ([password, password2].includes('')) {
      mostrarAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true,
      });
      return;
    }
    if (password.length < 6) {
      mostrarAlerta({
        msg: 'El password debe tener al menos 6 caracteres',
        error: true,
      });
      return;
    }
    if (password !== password2) {
      mostrarAlerta({
        msg: 'Los password son diferentes',
        error: true,
      });
      return;
    }
    generarNuevoPassword(password, token);
    handleReset();
  };
  return (
    <main className={styles.formulario__contenedor}>
      <h2 className={styles.formulario__title}>
        Reestablece tu password{' '}
        <span> Y No Pierdas Acceso A Tus Proyectos</span>
      </h2>
      {revisarToken && (
        <section className={styles.formulario}>
          <form onSubmit={handleSubmit}>
            <div className={styles.formulario__field}>
              <label htmlFor="password" className={styles.formulario__label}>
                Nuevo Password
              </label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={handleInputChange}
                id="password"
                className={styles.formulario__input}
              />
            </div>
            <div className={styles.formulario__field}>
              <label htmlFor="password2" className={styles.formulario__label}>
                Repetir Password
              </label>
              <input
                type="password"
                name="password2"
                value={password2}
                onChange={handleInputChange}
                id="password2"
                className={styles.formulario__input}
              />
            </div>

            <input
              type="submit"
              value="Reestablecer password"
              className={styles.formulario__submit}
            />
          </form>
        </section>
      )}
      <nav className={styles.enlaces}>
        <p className={styles.enlaces__item}>
          ¿Aun no tienes cuenta?{' '}
          <Link to="registrar" className={styles.enlace}>
            Registrate{' '}
          </Link>
        </p>
        <p className={styles.enlaces__item}>
          ¿Ya tienes una cuenta?{' '}
          <Link to="/" className={styles.enlace}>
            Inicia Sesion
          </Link>
        </p>
      </nav>
    </main>
  );
};

export default NuevoPassword;
