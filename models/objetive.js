import mongoose from "mongoose";
// import { Enum_TipoObjetivo } from "./enums/enums.js";
import { ProjectModel } from "./proyecto/proyecto.js";

const { Schema, model } = mongoose;


// interface Objective {
//   descripcion: string;
//   tipo: ["GENERAL" , "ESPECIFICO"];
// }

const objectiveSchema = new Schema({
  descripcion: {
    type: String,
    required: true,
  },
  tipo: {
    type: String,
    enum: ["GENERAL" , "ESPECIFICO"],
    required: true,
  },
});

const ObjectiveModel = model('Objetivo', objectiveSchema);

export { ObjectiveModel };
