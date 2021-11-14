import conectarBD from "./db/db";
import { UserModel } from "./models/user";
import {
  Enum_EstadoUsuario,
  Enum_Rol,
  Enum_TipoObjetivo,
} from "./models/enums";
import { ProjectModel } from "./models/project";
import { ObjectiveModel } from "./models/objetive";

//  METODOLOGIA ONE TO MANY #1
const crearProyectoConObjetivos1 = async () => {
  const usuarioNuevo = await UserModel.create({
    nombre: "Sebastian",
    apellido: "Diaz",
    correo: "jsdiaz@mail.com",
    identificacion: "1075293490",
    rol: Enum_Rol.administrador,
    estado: Enum_EstadoUsuario.autorizado,
  });

  const proyectoCreado = await ProjectModel.create({
    nombre: "proyecto tecnirenault",
    fechaInicio: new Date("2021/11/11"),
    fechaFin: new Date("2021/12/11"),
    presupuesto: 150000,
    lider: usuarioNuevo._id,
  });

  const objetivoGeneral = await ObjectiveModel.create({
    descripcion: "Este es el objetivo general",
    tipo: Enum_TipoObjetivo.general,
    proyecto: proyectoCreado._id,
  });

  const objetivoEspecifico = await ObjectiveModel.create({
    descripcion: "Este es el objetivo especifico",
    tipo: Enum_TipoObjetivo.especifico,
    proyecto: proyectoCreado._id,
  });
};

const consultaProyectoConObjetivos1 = async () => {
  const proyecto = await ProjectModel.findOne({
    _id: "618e93caaf630505bfa57d31",
  });

  console.log("el proyecto que encontré fue", proyecto);

  const objetivos = await ObjectiveModel.find({
    project: "618e93caaf630505bfa57d31",
  });

  console.log("los objetivos del proyecto son: ", objetivos);

  const proyectoConObjetivos = { ...proyecto, objetivos: objetivos };

  console.log("El proyecto con objetivos: ", proyectoConObjetivos);
};

//METODOLOGIA #2 ONE TO MANY
const crearProyectoConObjetivos2 = async () => {
  const usuarioNuevo = await UserModel.create({
    nombre: "Sebastian",
    apellido: "Diaz",
    correo: "jsdiaz@mail.com",
    identificacion: "1075293490",
    rol: Enum_Rol.administrador,
    estado: Enum_EstadoUsuario.autorizado,
  });

  const objetivoGeneral = await ObjectiveModel.create({
    descripcion: "Este es el objetivo general",
    tipo: Enum_TipoObjetivo.general,
  });

  const objetivoEspecifico = await ObjectiveModel.create({
    descripcion: "Este es el objetivo especifico",
    tipo: Enum_TipoObjetivo.especifico,
  });

  const proyectoCreado = await ProjectModel.create({
    nombre: "proyecto tecnirenault",
    fechaInicio: new Date("2021/11/11"),
    fechaFin: new Date("2021/12/11"),
    presupuesto: 150000,
    lider: usuarioNuevo._id,
    objetivos: [objetivoGeneral._id, objetivoEspecifico._id],
  });
};

const consultaProyectoConObjetivos2 = async () => {
  const proyecto = await ProjectModel.find({
    _id: "618ea3f05701deb507345d97",
  }).populate("objetivos");

  console.log("Proyecto encontrado: ", JSON.stringify(proyecto));
};

//METODOLOGIA #3 ONE TO MANY
const crearProyectoConObjetivos3 = async () => {
  const usuarioNuevo = await UserModel.create({
    nombre: "Sebastian",
    apellido: "Diaz",
    correo: "jsdiaz@mail.com",
    identificacion: "1075293490",
    rol: Enum_Rol.administrador,
    estado: Enum_EstadoUsuario.autorizado,
  });

  const proyectoCreado = await ProjectModel.create({
    nombre: "proyecto tecnirenault",
    fechaInicio: new Date("2021/11/11"),
    fechaFin: new Date("2021/12/11"),
    presupuesto: 150000,
    lider: usuarioNuevo._id,
    objetivos: [
      {
        descripcion: "Este es el objetivo general del proyecto",
        tipo: Enum_TipoObjetivo.general,
      },
      {
        descripcion: "Este es el objetivo especifico 1 del proyecto",
        tipo: Enum_TipoObjetivo.especifico,
      },
      {
        descripcion: "Este es el objetivo especifico 2 del proyecto",
        tipo: Enum_TipoObjetivo.especifico,
      },
    ],
  });
};

const consultaProyectoConObjetivos3 = async () => {
  const proyecto = await ProjectModel.find({
    id: "61903c9bbe21a1a48ebc0f68",
  });

  console.log("Proyecto encontrado: ", proyecto);
};

const main = async () => {
  await conectarBD();
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
