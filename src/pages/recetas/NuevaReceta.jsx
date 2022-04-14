import useFormulario from '../../hooks/useFormulario.hooks';
import useAlerta from '../../hooks/useAlerta.hooks';
import useRecetas from '../../hooks/useRecetas.hooks';
import styles from '../../styles/Formulario.module.css';
import { convertirIngredientes } from '../../helpers/convertirIngredientes.helpers';

const NuevaReceta = () => {
  const { mostrarAlerta } = useAlerta();
  const { crearReceta } = useRecetas();
  const initialValues = {
    nombre: '',
    ingredientes: '',
    elaboracion: '',
  };
  const { values, handleInputChange, handleReset } =
    useFormulario(initialValues);
  const { nombre, ingredientes, elaboracion } = values;
  const handleSubmit = async (e) => {
    e.preventDefault();
    if ([nombre, ingredientes, elaboracion].includes('')) {
      mostrarAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true,
      });
      return;
    }
    crearReceta(nombre, convertirIngredientes(ingredientes), elaboracion);
    handleReset();
  };
  return (
    <div className={styles.formulario__contenedor}>
      <h2 className={styles.formulario__title}>Crear Receta</h2>
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

export default NuevaReceta;
