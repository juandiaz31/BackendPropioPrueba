import { connect } from "mongoose";

const conectarBD = async () => {
    return await connect(
      'mongodb+srv://juandiaz31:juandiaz31@cluster-prueba.v3rv6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
    )
      .then(() => {
        console.log('Conexion exitosa');
      })
      .catch((e) => {
        console.error('Error conectando a la base de datos', e);
      });
  };
  
  export default conectarBD;