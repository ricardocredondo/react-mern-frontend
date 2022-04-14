import { useState } from 'react';
const useFormulario = (initialValues = {}) => {
  const [values, setValues] = useState(initialValues);
  const handleInputChange = ({ target }) => {
    setValues({
      ...values,
      [target.name]: target.value,
    });
  };
  const handleReset = () => {
    setValues(initialValues);
  };
  return { values, setValues, handleInputChange, handleReset };
};
export default useFormulario;
