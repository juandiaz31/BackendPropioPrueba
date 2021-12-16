import { ProjectModel } from "../proyecto/proyecto.js";
import { AdvancementModel } from "./avance.js";

const resolversAvance = {
  Query: {
    Avances: async (parent, args) => {
      let filter = {};
      if (args.project) {
        filter = { ...args };
      }
      const avances = await AdvancementModel.find(filter)
        .populate("proyecto")
        .populate("creadoPor");
      return avances;
    },

    filtrarAvance: async (parent, args) => {
      const avanceFiltrado = await AdvancementModel.find({
        proyecto: args._id,
      })
        .populate("proyecto")
        .populate("creadoPor");
      return avanceFiltrado;
    },
  },

  Mutation: {
    crearAvance: async (parent, args) => {
      const avanceCreado = await AdvancementModel.create({
        fecha: new Date(args.fecha),
        descripcion: args.descripcion,
        proyecto: args.proyecto,
        creadoPor: args.creadoPor,
      });

      const avances = await AdvancementModel.find({
        proyecto: avanceCreado.proyecto,
      });

      if (avances.length === 1) {
        const proyectoModificado = await ProjectModel.findOneAndUpdate(
          { _id: avanceCreado.proyecto },
          { fase: "DESARROLLO" }
        );
      }

      return avanceCreado;
    },
  },
};

export { resolversAvance };
