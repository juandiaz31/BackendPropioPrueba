import { Schema, model } from "mongoose";
import { Enum_TipoObjetivo } from "./enums";
import { ProjectModel } from "./project";

interface Objetive {
  descripcion: string;
  tipo: Enum_TipoObjetivo;
  // proyecto: Schema.Types.ObjectId;
}

const objectiveSchema = new Schema<Objetive>({
  descripcion: {
    type: String,
    required: true,
  },
  tipo: {
    type: String,
    enum: Enum_TipoObjetivo,
    required: true,
  },
  // proyecto: {
  //   type: Schema.Types.ObjectId,
  //   ref: ProjectModel,
  // },
});

const objectiveModel = model("Objetivo", objectiveSchema);

export { objectiveModel };
