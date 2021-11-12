import conectarBD from "./db/db";
import { UserModel } from "./models/user";
import { Enum_Rol, Enum_TipoObjetivo } from "./models/enums";
import { ProjectModel } from "./models/project";
import { objectiveModel } from "./models/objetive";

const main = async () => {
  await conectarBD();

  // const xyz = await ProjectModel.create({
  //   nombre: "Prueba proyecto pirobo",
  //   fechaInicio: new Date(2021 / 4 / 14),
  //   fechaFin: new Date(2021 / 12 / 14),
  //   presupuesto: 310000,
  //   lider: "618de63f17356b27af58388c",
  //   objetivos: ["618dd867b5d7c18797589166", "618de6c675f468d23b196771"],
  // });
  // console.log("Proyecto creado: ", xyz);
  //PROBANDO SI PUEDO HACER PUSH 

  const proyecto = await ProjectModel.find({nombre: "Proyecto 56"})
    .populate("objetivos")
    .populate("lider");
  console.log("el proyecto es: ", JSON.stringify(proyecto));
};
main();

//CRUD DE USUARIOS

//Crear usuarios
// await UserModel.create({
//   apellido: "Diaz",
//   correo: "delio@mail.com",
//   identificacion: "12231561",
//   nombre: "Delio",
//   rol: Enum_Rol.administrador,
// })
//   .then((u) => {
//     console.log("Usuario creado", u);
//   })
//   .catch((e) => {
//     console.error("Error creando el usuario", e);
//   });

// Obtener usuarios
// await UserModel.find()
//   .then((u) => {
//     console.log("Usuarios", u);
//   })
//   .catch((e) => {
//     console.error("Error obteniendo los usuarios", e);
//   });

//Obtener un solo usuario usuarios
// await UserModel.findOne({ identificacion: "11651" })
//   .then((u) => {
//     console.log("Usuario", u);
//   })
//   .catch((e) => {
//     console.error("Error obteniendo el usuario", e);
//   });

//Editar un usuario
// await UserModel.findOneAndUpdate(
//   { correo: "prueba@gmail.com" },
//   { nombre: "Natis", apellido: "Sando" }
// )
//   .then((u) => {
//     console.log("usuario actualizado", u);
//   })
//   .catch((e) => {
//     console.error("Error actualizando", e);
//   });

//ELIMINAR USUARIO
//   await UserModel.findOneAndDelete({ correo: "prueba@gmail.com" })
//     .then((u) => {
//       console.log("usuario eliminado", u);
//     })
//     .catch((e) => {
//       console.error("Error eliminando", e);
//     });
