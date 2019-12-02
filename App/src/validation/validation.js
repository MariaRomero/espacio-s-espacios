import * as yup from "yup";

const inputSchema = yup.object().shape({
  address: yup.string().required(),
  postcode: yup.string().required(),
  description: yup.string().required(),
  noBeds: yup
    .number()
    .required("number of beds are required")
    .positive()
    .integer(),
  price: yup
    .number()
    .required()
    .positive()
    .integer()
  //   images: yup.string().required(),
});

export default inputSchema;
