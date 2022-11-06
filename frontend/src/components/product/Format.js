// FORMAT NUMBER TO MONEY CURRENCY CLP-EUR-JPY-USD ect
const numberFormat = (value) =>
  new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
  }).format(value);

// Exports
export { numberFormat };
