import { BrowserRouter, Routes, Route } from 'react-router-dom';
// ? PAGES
import AuthLayout from './layouts/AuthLayout';
import Login from './pages/Login';
import Registrar from './pages/Registrar';
import OlvidePassword from './pages/OlvidePassword';
import NuevoPassword from './pages/NuevoPassword';
import ConfirmarCuenta from './pages/ConfirmarCuenta';
import RutaProtegida from './layouts/RutaProtegida';
import Recetas from './pages/recetas/Recetas';
import RecetaCompleta from './pages/recetas/RecetaCompleta';
import NuevaReceta from './pages/recetas/NuevaReceta';
import EditarReceta from './pages/recetas/EditarReceta';
import CrearTarea from './pages/tareas/CrearTarea';
import EditarTarea from './pages/tareas/EditarTarea';
import NuevoColaborador from './pages/recetas/NuevoColaborador';
// ? ***************************************
// * CONTEXT
import AlertaProvider from './context/Alerta.context';
import AuthProvider from './context/Auth.context';
import RecetasProvider from './context/Recetas.context';
import TareasProvider from './context/Tareas.context';
// **************************
import styles from './styles/App.module.css';
import ColaboradoresProvider from './context/Colaboradores.context';
const App = () => {
  return (
    <BrowserRouter>
      <AlertaProvider>
        <AuthProvider>
          <RecetasProvider>
            <TareasProvider>
              <ColaboradoresProvider>
                <Routes>
                  {/* RUTA PUBLICA */}
                  <Route path="/" element={<AuthLayout />}>
                    <Route index element={<Login />} />
                    <Route path="registrar" element={<Registrar />} />
                    <Route
                      path="olvide-password"
                      element={<OlvidePassword />}
                    />
                    <Route
                      path="olvide-password/:token"
                      element={<NuevoPassword />}
                    />
                    <Route
                      path="confirmar-cuenta/:id"
                      element={<ConfirmarCuenta />}
                    />
                  </Route>
                  {/* RUTAS PRIVADAS */}
                  <Route path="/recetas" element={<RutaProtegida />}>
                    <Route index element={<Recetas />} />
                    <Route path="crear-receta" element={<NuevaReceta />} />
                    <Route path="crear-tareas" element={<CrearTarea />} />
                    <Route
                      path="nuevo-colaborador/:id"
                      element={<NuevoColaborador />}
                    />
                    <Route path="editar/:id" element={<EditarReceta />} />
                    <Route path="editar-tareas/:id" element={<EditarTarea />} />
                    <Route path=":id" element={<RecetaCompleta />} />
                  </Route>
                </Routes>
              </ColaboradoresProvider>
            </TareasProvider>
          </RecetasProvider>
        </AuthProvider>
      </AlertaProvider>
    </BrowserRouter>
  );
};

export default App;
