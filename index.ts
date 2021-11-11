import conectarBD from "./db/db";
import { UserModel } from "./models/user";
import { Enum_Rol } from './models/enums';


const main = async () => {
  await conectarBD();

  //Crear usuarios
  await UserModel.create({
    apellido: "Borrero",
    correo: "miguel@gmail.com",
    identificacion: "965423",
    nombre: "Miguel",
    rol: Enum_Rol.lider,
  })
    .then((u) => {
      console.log("Usuario creado", u);
    })
    .catch((e) => {
      console.error("Error creando el usuario", e);
    });

  // Obtener usuarios
  // await UserModel.find()
  //   .then((u) => {
  //     console.log("Usuarios", u);
  //   })
  //   .catch((e) => {
  //     console.error("Error obteniendo los usuarios", e);
  //   });

  //Editar un usuario
  // await UserModel.findOneAndUpdate(
  //   { correo: "natsan@gmail.com" },
  //   { nombre: "Natis", apellido: "Sando" }
  // )
  //   .then((u) => {
  //     console.log("usuario actualizado", u);
  //   })
  //   .catch((e) => {
  //     console.error("Error actualizando", e);
  //   });

//   await UserModel.findOneAndDelete({ correo: "prueba@gmail.com" })
//     .then((u) => {
//       console.log("usuario eliminado", u);
//     })
//     .catch((e) => {
//       console.error("Error eliminando", e);
//     });
};

main();
