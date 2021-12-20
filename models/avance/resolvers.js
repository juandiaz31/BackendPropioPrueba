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
      console.log("args de filtrar avance", args);
      const avanceFiltrado = await AdvancementModel.find({
        proyecto: args._id,
      })
        .populate("proyecto")
        .populate("creadoPor");
      return avanceFiltrado;
    },
    AvancesLiderados: async (parent, args) => {
      console.log("args de avanceLiderado", args);
      const avanceLiderado = await AdvancementModel.find({
        creadoPor: args._id,
      })
        .populate("proyecto")
        .populate("creadoPor");
      return avanceLiderado;
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
    crearObservacion: async (parent, args) => {
      const observacion = await AdvancementModel.findByIdAndUpdate(
        args._id,
        {
          $addToSet: {
            observaciones: args.observacion,
          },
        },
        { new: true }
      );

      return observacion;
    },
    editarAvance: async (parent, args) => {
      const avanceEditado = await AdvancementModel.findByIdAndUpdate(
        args._id,
        { descripcion: args.descripcion },
        { new: true }
      );
      return avanceEditado;
    },
  },
};

export { resolversAvance };
