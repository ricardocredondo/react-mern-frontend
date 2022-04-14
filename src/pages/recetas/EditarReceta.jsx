import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useRecetas from '../../hooks/useRecetas.hooks';
import useFormulario from '../../hooks/useFormulario.hooks';
import {
  convertirIngredientes,
  reConvertirIngredientes,
} from '../../helpers/convertirIngredientes.helpers';
import useAlerta from '../../hooks/useAlerta.hooks';
import styles from '../../styles/Formulario.module.css';
const EditarReceta = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { mostrarAlerta } = useAlerta();
  const { receta, obtenerReceta, editarReceta } = useRecetas();
  useEffect(() => {
    obtenerReceta(params.id);
  }, []);
  const initialValues = {
    nombre: receta.nombre,
    ingredientes: reConvertirIngredientes(receta.ingredientes),
    elaboracion: receta.elaboracion,
  };
  const { values, handleInputChange, handleReset } =
    useFormulario(initialValues);
  const { nombre, ingredientes, elaboracion } = values;
  const handleSubmit = (e) => {
    e.preventDefault();
    if ([nombre, ingredientes, elaboracion].includes('')) {
      mostrarAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true,
      });
      return;
    }
    editarReceta(
      receta._id,
      nombre,
      convertirIngredientes(ingredientes),
      elaboracion
    );
    handleReset();
    navigate(`/recetas/${receta._id}`);
  };
  return (
    <div className={styles.formulario__contenedor}>
      <h2 className={styles.formulario__title}>Editar Receta</h2>
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
            <label htmlFor="ingredientes" className={styles.formulario__label}>
              ingredientes
            </label>
            <p className="text-base pb-2">
              (cantidad 1 ingrediente 1, cantidad 2 ingrediente 2)
            </p>
            <textarea
              name="ingredientes"
              value={ingredientes}
              onChange={handleInputChange}
              id="ingredientes"
              className={styles.formulario__textarea}
            ></textarea>
          </div>
          <div className={styles.formulario__field}>
            <label htmlFor="elaboracion" className={styles.formulario__label}>
              elaboracion
            </label>
            <textarea
              id="elaboracion"
              name="elaboracion"
              value={elaboracion}
              onChange={handleInputChange}
              className={styles.formulario__textarea}
            ></textarea>
          </div>

          <input
            type="submit"
            value="Guardar Receta"
            className={styles.formulario__submit}
          />
        </form>
      </section>
    </div>
  );
};

export default EditarReceta;
