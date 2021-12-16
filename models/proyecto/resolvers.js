import { ProjectModel } from "./proyecto.js";

import { InscriptionModel } from "../inscripcion/inscripcion.js";
import { UserModel } from "../usuario/usuario.js";
import { AdvancementModel } from "../avance/avance.js";

const resolversProyecto = {
  Proyecto: {
    lider: async (parent, args, context) => {
      const usr = await UserModel.findOne({
        _id: parent.lider.toString(),
      });
      return usr;
    },
    inscripciones: async (parent, args, context) => {
      const inscripciones = await InscriptionModel.find({
        proyecto: parent._id,
      });
      return inscripciones;
    },
    avances: async (parent, args, context) => {
      const avances = await AdvancementModel.find({ proyecto: parent._id });

      return avances;
    },
  },
  Query: {
    Proyectos: async (parent, args, context) => {
      if (context.userData) {
        if (context.userData.rol === "LIDER") {
          const proyectos = await ProjectModel.find({
            lider: context.userData._id,
          });
          console.log("es lider de:", proyectos);
          return proyectos;
        }
      }
      const proyectos = await ProjectModel.find();
      // .populate("lider")
      // .populate("avances")
      // .populate("inscripciones");
      return proyectos;
    },
  },

  Mutation: {
    crearProyecto: async (parent, args) => {
      const proyectoCreado = await ProjectModel.create({
        nombre: args.nombre,
        fechaInicio: args.fechaInicio,
        fechaFin: args.fechaFin,
        presupuesto: args.presupuesto,
        lider: args.lider,
        objetivos: args.objetivos,
      });
      return proyectoCreado;
    },

    editarProyecto: async (parent, args) => {
      const proyectoEditado = await ProjectModel.findByIdAndUpdate(
        args._id,
        { ...args.campos },
        { new: true }
      );
      return proyectoEditado;
    },

    crearObjetivo: async (parent, args) => {
      const proyectoConObjetivo = await ProjectModel.findByIdAndUpdate(
        args.idProyecto,
        {
          $addToSet: {
            objetivos: { ...args.campos },
          },
        },
        { new: true }
      );
      return proyectoConObjetivo;
    },

    editarObjetivo: async (parent, args) => {
      const proyectoEditado = await ProjectModel.findByIdAndUpdate(
        args.idProyecto,
        {
          $set: {
            [`objetivos.${args.indexObjetivo}.descripcion`]:
              args.campos.descripcion,
            [`objetivos.${args.indexObjetivo}.tipo`]: args.campos.tipo,
          },
        },
        { new: true }
      );
      return proyectoEditado;
    },

    eliminarObjetivo: async (parent, args) => {
      const eliminarObjetivoProyecto = await ProjectModel.findByIdAndUpdate(
        { _id: args.idProyecto },
        {
          $pull: {
            objetivos: {
              _id: args.idObjetivo,
            },
          },
        },
        { new: true }
      );
      return eliminarObjetivoProyecto;
    },
  },
};

export { resolversProyecto };
