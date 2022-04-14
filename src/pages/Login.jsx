import { Link } from 'react-router-dom';
import useAlerta from '../hooks/useAlerta.hooks';
import useFormulario from '../hooks/useFormulario.hooks';
import useAuth from '../hooks/useAuth.hooks';
import styles from '../styles/Formulario.module.css';
const Login = () => {
  const { loginUsuarios } = useAuth();
  const { mostrarAlerta } = useAlerta();
  const initialValues = {
    email: '',
    password: '',
  };
  const { values, handleInputChange, handleReset } =
    useFormulario(initialValues);
  const { email, password } = values;
  const handleSubmit = (e) => {
    e.preventDefault();
    if ([email, password].includes('')) {
      mostrarAlerta({
        msg: 'Los campos son obligatorios',
        error: true,
      });
      return;
    }
    loginUsuarios(values);
    handleReset();
  };
  return (
    <main className={styles.formulario__contenedor}>
      <h2 className={styles.formulario__title}>
        Inicia Sesión <span> y administra Tus Recetas</span>
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
          <div className={styles.formulario__field}>
            <label htmlFor="password" className={styles.formulario__label}>
              password
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
          <input
            type="submit"
            value="Iniciar Sesión"
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
          ¿Has olvidado tu password?{' '}
          <Link to="olvide-password" className={styles.enlace}>
            Recuperar Password
          </Link>
        </p>
      </nav>
    </main>
  );
};

export default Login;
