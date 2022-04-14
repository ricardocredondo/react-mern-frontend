import { Outlet } from 'react-router-dom';
import AlertaModal from '../components/AlertaModal';
// ? PAGES
import Header from '../components/usuarios/Header';
// ? *****************************
import styles from '../styles/usuarios/AuthLayout.module.css';
const AuthLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <AlertaModal />
    </>
  );
};

export default AuthLayout;
