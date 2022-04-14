import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth.hooks';
import styles from '../../styles/usuarios/components/Nav.module.css';
const Nav = () => {
  const { auth } = useAuth();
  return (
    <>
      {!auth._id && (
        <nav className={styles.nav}>
          <Link to="/">Login</Link>
          <Link to="/registrar">Registrar</Link>
        </nav>
      )}
    </>
  );
};

export default Nav;
