const convertirIngredientes = (ingredientes) => {
  return ingredientes.split(',').map((ingredienteArray) => {
    return {
      cantidad: ingredienteArray
        .trim()
        .substring(0, ingredienteArray.indexOf(' ')),
      ingrediente: ingredienteArray
        .trim()
        .substring(ingredienteArray.indexOf(' ')),
    };
  });
};
const reConvertirIngredientes = (ingredientes) => {
  return ingredientes
    .map((elem) => {
      return `${elem.cantidad} ${elem.ingrediente}`;
    })
    .join(' , ');
};
export { convertirIngredientes, reConvertirIngredientes };
