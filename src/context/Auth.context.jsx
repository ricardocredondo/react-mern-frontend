import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
export const AuthContext = createContext();
import clienteAxios from '../config/clienteAxios.config';
import useAlerta from '../hooks/useAlerta.hooks';
import authorizationBearer from '../config/authorization.config';
const AuthProvider = (props) => {
  const [auth, setAuth] = useState({});
  const [cargando, setCargando] = useState(true);
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
  const [revisarToken, setRevisarToken] = useState(false);
  const { mostrarAlerta } = useAlerta();
  const navigate = useNavigate();
  useEffect(() => {
    const autenticacionUsuarios = async () => {
      const config = authorizationBearer();
      if (!config) {
        setCargando(false);
        return;
      }
      try {
        const { data } = await clienteAxios('/usuarios/perfil', config);
        setAuth(data);
        // navigate('/recetas');
      } catch (error) {
        setAuth({});
      } finally {
        setCargando(false);
      }
    };
    autenticacionUsuarios();
  }, []);
  const registerUser = async (nuevoUsuario) => {
    try {
      const { data } = await clienteAxios.post('/usuarios', nuevoUsuario);
      mostrarAlerta({
        msg: data.msg,
        error: false,
      });
    } catch (error) {
      mostrarAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };
  const loginUsuarios = async ({ email, password }) => {
    try {
      const { data } = await clienteAxios.post('/usuarios/login', {
        email,
        password,
      });
      localStorage.setItem('tokenUser', data.token);
      setAuth(data);
      navigate('/recetas');
    } catch (error) {
      mostrarAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };
  const confirmarCuenta = async (id) => {
    try {
      const { data } = await clienteAxios(`/usuarios/confirmar/${id}`);
      mostrarAlerta({
        msg: data.msg,
        error: false,
      });
      setCuentaConfirmada(true);
    } catch (error) {
      mostrarAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };
  const recuperarPassword = async (email) => {
    try {
      const { data } = await clienteAxios.post('/usuarios/recuperar-password', {
        email,
      });
      mostrarAlerta({
        msg: data.msg,
        error: false,
      });
    } catch (error) {
      mostrarAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };
  const comprobacionToken = async (token) => {
    try {
      await clienteAxios(`/usuarios/recuperar-password/${token}`);
      setRevisarToken(true);
    } catch (error) {
      mostrarAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };
  const generarNuevoPassword = async (password, token) => {
    try {
      const { data } = await clienteAxios.post(
        `/usuarios/recuperar-password/${token}`,
        { password }
      );
      mostrarAlerta({
        msg: data.msg,
        error: false,
      });
    } catch (error) {
      mostrarAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };
  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        cargando,
        setCargando,
        cuentaConfirmada,
        setCuentaConfirmada,
        revisarToken,
        setRevisarToken,
        registerUser,
        loginUsuarios,
        confirmarCuenta,
        recuperarPassword,
        comprobacionToken,
        generarNuevoPassword,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
