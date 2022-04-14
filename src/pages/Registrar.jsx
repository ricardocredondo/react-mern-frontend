import { Link } from 'react-router-dom';
import useAlerta from '../hooks/useAlerta.hooks';
import useFormulario from '../hooks/useFormulario.hooks';
import useAuth from '../hooks/useAuth.hooks';
import styles from '../styles/Formulario.module.css';
const Registrar = () => {
  const { mostrarAlerta } = useAlerta();
  const { registerUser } = useAuth();
  const initialValues = {
    nombre: '',
    email: '',
    password: '',
    password2: '',
  };
  const { values, handleInputChange, handleReset } =
    useFormulario(initialValues);
  const { nombre, email, password, password2 } = values;
  const handleSubmit = (e) => {
    e.preventDefault();
    if ([nombre, email, password, password2].includes('')) {
      mostrarAlerta({
        msg: 'El campo no puede quedar vacio',
        error: true,
      });
      return;
    }
    if (password !== password2) {
      mostrarAlerta({
        msg: 'Los password tienen que sert iguales',
        error: true,
      });
      return;
    }
    if (password.length < 6) {
      mostrarAlerta({
        msg: 'Password debe tener un minimo de 6 caracteres',
        error: true,
      });
      return;
    }
    const nuevoUsuario = {
      nombre,
      email,
      password,
    };
    registerUser(nuevoUsuario);
    handleReset();
  };
  return (
    <main className={styles.formulario__contenedor}>
      <h2 className={styles.formulario__title}>
        Registrate <span> y Empieza A Crear Tus Recetas</span>
      </h2>
      <section className={styles.formulario}>
        <form onSubmit={handleSubmit}>
          <div className={styles.formulario__field}>
            <label htmlFor="nombre" className={styles.formulario__label}>
              nombre
            </label>
            <input
              type="text"
              name="nombre"
              value={nombre}
              onChange={handleInputChange}
              id="nombre"
              className={styles.formulario__input}
            />
          </div>
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
          <div className={styles.formulario__field}>
            <label htmlFor="password2" className={styles.formulario__label}>
              repetir password
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
            value="Registrar"
            className={styles.formulario__submit}
          />
        </form>
      </section>
      <nav className={styles.enlaces}>
        <p className={styles.enlaces__item}>
          ¿Ya tienes una cuenta?{' '}
          <Link to="/" className={styles.enlace}>
            Login{' '}
          </Link>
        </p>
        <p className={styles.enlaces__item}>
          ¿Has olvidado tu password?{' '}
          <Link to="/olvide-password" className={styles.enlace}>
            Recuperar Password
          </Link>
        </p>
      </nav>
    </main>
  );
};

export default Registrar;
