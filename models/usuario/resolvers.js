import { UserModel } from "./usuario.js";
import bcrypt from "bcrypt";

const resolversUsuario = {
  Query: {
    Usuarios: async (parent, args, context) => {
      if (context.userData) {
        if (context.userData.rol === "LIDER") {
          const usuarios = await UserModel.find({
            rol: "ESTUDIANTE",
          });
          return usuarios;
        }
      }
      const usuarios = await UserModel.find({ ...args.filtro });
      return usuarios;
    },
    Usuario: async (parent, args) => {
      const usuario = await UserModel.findOne({ _id: args._id });
      return usuario;
    },
    Estudiantes: async (parent, args) => {
      const estudiantes = await UserModel.find({ rol: "ESTUDIANTE" });

      return estudiantes;
    },
    PerfilUsuario: async (parent, args) => {
      const perfil = await UserModel.findOne({ _id: args._id });
      return perfil;
    },
    Lideres: async (parent, args) => {
      const lideres = await UserModel.find({ rol: "LIDER" });
      return lideres;
    },
    EstadoUsuario: async (parent, args) => {
      const estadoUsuario = await UserModel.findById({ _id: args._id });
      return estadoUsuario;
    },
  },

  Mutation: {
    crearUsuario: async (parent, args) => {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(args.password, salt);
      const usuarioCreado = await UserModel.create({
        nombre: args.nombre,
        apellido: args.apellido,
        identificacion: args.identificacion,
        correo: args.correo,
        rol: args.rol,
        password: hashedPassword,
      });

      if (Object.keys(args).includes("estado")) {
        usuarioCreado.estado = args.estado;
      }

      return usuarioCreado;
    },
    editarUsuario: async (parent, args) => {
      const usuarioEditado = await UserModel.findByIdAndUpdate(
        args._id,
        {
          nombre: args.nombre,
          apellido: args.apellido,
          identificacion: args.identificacion,
          correo: args.correo,
          estado: args.estado,
        },
        { new: true }
      );
      return usuarioEditado;
    },

    editarPerfil: async (parent, args) => {
      const perfilEditado = await UserModel.findByIdAndUpdate(
        args._id,
        {
          ...args.campos,
        },
        { new: true }
      );
      return perfilEditado;
    },
    eliminarUsuario: async (parent, args) => {
      if (Object.keys(args).includes("_id")) {
        const usuarioEliminado = await UserModel.findOneAndDelete({
          _id: args._id,
        });
        return usuarioEliminado;
      } else if (Object.keys(args).includes("correo")) {
        const usuarioEliminado = await UserModel.findOneAndDelete({
          correo: args.correo,
        });
        return usuarioEliminado;
      }
    },
    editarEstadoUsuario: async (parent, args) => {
      const estadoUsuario = await UserModel.findByIdAndUpdate(args._id, {
        estado: args.estado,
      });
      return estadoUsuario;
    },
  },
};

export { resolversUsuario };
