import { UserModel } from "../../models/usuario/usuario.js";
import bcrypt from "bcrypt";
import { generateToken } from "../../utils/tokensUtils.js";

const resolversAutenticacion = {
  Mutation: {
    registro: async (parent, args) => {
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
      console.log("usuario creado", usuarioCreado);
      return {
        token: generateToken({
          _id: usuarioCreado._id,
          nombre: usuarioCreado.nombre,
          apellido: usuarioCreado.apellido,
          identificacion: usuarioCreado.identificacion,
          correo: usuarioCreado.correo,
          rol: usuarioCreado.rol,
        }),
      };
    },

    //Para enviar la informacion al backend y comparar con algun usuario creado
    login: async (parent, args) => {
      const usuarioEncontrado = await UserModel.findOne({
        correo: args.correo,
      });
      if (await bcrypt.compare(args.password, usuarioEncontrado.password)) {
        return {
          token: generateToken({
            _id: usuarioEncontrado._id,
            nombre: usuarioEncontrado.nombre,
            apellido: usuarioEncontrado.apellido,
            identificacion: usuarioEncontrado.identificacion,
            correo: usuarioEncontrado.correo,
            rol: usuarioEncontrado.rol,
          }),
        };
      }
    },
    editarPassword: async (parent, args) => {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(args.password, salt);

      const passwordEditada = await UserModel.findByIdAndUpdate(args._id, {
        password: hashedPassword,
      });

      return passwordEditada;
    },

    refreshToken: async (parent, args, context) => {
      console.log("contexto", context);
      if (!context.userData) {
        return {
          error: "token invalido",
        };
      } else {
        return {
          token: generateToken({
            _id: context.userData._id,
            nombre: context.userData.nombre,
            apellido: context.userData.apellido,
            identificacion: context.userData.identificacion,
            correo: context.userData.correo,
            rol: context.userData.rol,
          }),
        };
      }
    },
  },
};

export { resolversAutenticacion };
