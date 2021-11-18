import { AdvancementModel } from "./avance";

const resolverAvance = {
  Query: {
    Avances: async (parent, args) => {
      const avances = await AdvancementModel.find();
      return avances;
    },
  },

  Mutation: {
    crearAvance: async (parent, args) => {
      const avanceCreado = await AdvancementModel.create({
        fecha: args.fecha,
        descripcion: args.descripcion,
        proyecto: args.proyecto,
        creadoPor: args.creadoPor,
      });
      return avanceCreado;
    },
  },
};

export { resolverAvance };
