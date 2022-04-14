import { createContext, useState } from 'react';
export const AlertaContext = createContext();
const AlertaProvider = (props) => {
  const [alerta, setAlerta] = useState({});
  const [modalAlerta, setModalAlerta] = useState(false);
  const mostrarAlerta = (alerta) => {
    setAlerta(alerta);
    setModalAlerta(true);
    setTimeout(() => setModalAlerta(false), 3000);
  };
  const ocultarAlerta = () => {
    setModalAlerta(false);
    setAlerta({});
  };
  return (
    <AlertaContext.Provider
      value={{
        alerta,
        modalAlerta,
        mostrarAlerta,
        ocultarAlerta,
      }}
    >
      {props.children}
    </AlertaContext.Provider>
  );
};
export default AlertaProvider;
