import { Link } from 'react-router-dom';
import useFormulario from '../hooks/useFormulario.hooks';
import useAlerta from '../hooks/useAlerta.hooks';
import useAuth from '../hooks/useAuth.hooks';
import styles from '../styles/Formulario.module.css';
const OlvidePassword = () => {
  const { mostrarAlerta } = useAlerta();
  const { recuperarPassword } = useAuth();
  const initialValues = {
    email: '',
  };
  const { values, handleInputChange, handleReset } =
    useFormulario(initialValues);
  const { email } = values;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === '') {
      mostrarAlerta({
        msg: 'El email es obligatorio',
        error: true,
      });
      return;
    }
    recuperarPassword(email);
    handleReset();
  };
  return (
    <main className={styles.formulario__contenedor}>
      <h2 className={styles.formulario__title}>
        Recupera Tu Acceso <span> Y No Pierdas Tus Proyectos</span>
      </h2>
      <section className={styles.formulario}>
        <form onSubmit={handleSubmit}>
          <div className={styles.formulario__field}>
            <label htmlFor="email" className={styles.formulario__label}>
              email
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleInputChange}
              id="email"
              className={styles.formulario__input}
            />
          </div>

          <input
            type="submit"
            value="Enviar instrucciones"
            className={styles.formulario__submit}
          />
        </form>
      </section>
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

export default OlvidePassword;
