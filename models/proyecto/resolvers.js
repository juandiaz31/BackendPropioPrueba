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

          return proyectos;
        }
      }
      const proyectos = await ProjectModel.find();
      // .populate("lider")
      // .populate("avances")
      // .populate("inscripciones");
      return proyectos;
    },
    Proyecto: async (parent, args) => {
      const proyecto = await ProjectModel.findById({ _id: args._id });
      return proyecto;
    },
  },

  Mutation: {
    crearProyecto: async (parent, args) => {
      const proyectoCreado = await ProjectModel.create({
        nombre: args.nombre,
        presupuesto: args.presupuesto,
        lider: args.lider,
        objetivos: args.objetivos,
      });
      return proyectoCreado;
    },

    editarProyecto: async (parent, args) => {
      // console.log(" proyecto: ", args);
      const proy = await ProjectModel.findById({ _id: args._id });

      const inscAprobadas = await InscriptionModel.find({
        $and: [{ proyecto: args._id }, { estado: "ACEPTADO" }],
      });

      if (args.campos.estado === "ACTIVO") {
        if (proy.fechaInicio === undefined) {
          (args.campos.fase = "INICIADO"),
            (args.campos.fechaInicio = Date.now());
        }
      } else if (args.campos.estado === "INACTIVO") {
        const inscripcionModificada = await InscriptionModel.updateMany(
          {
            $and: [{ proyecto: args._id }, { estado: "ACEPTADO" }],
          },
          { fechaEgreso: Date.now() },
          { upsert: false }
        );
      } else if (args.campos.fase === "TERMINADO") {
        (args.campos.estado = "INACTIVO"), (args.campos.fechaFin = Date.now());
      }
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
    editarEstadoProyecto: async (parent, args) => {
      const estadoProyectoEditado = await ProjectModel.findByIdAndUpdate(
        args._id,
        {
          estado: args.estado,
          fase: "INICIADO",
          fechaInicio: Date.now(),
        },
        { new: true }
      );
      return estadoProyectoEditado;
    },
  },
};

export { resolversProyecto };
