import { Schema, model } from "mongoose";
import { Enum_EstadoProyecto, Enum_FaseProyecto } from "./enums";
import { objectiveModel } from "./objetive";
import { UserModel } from "./user";

//TYPESCRIPT
interface Proyecto {
  nombre: string;
  presupuesto: number;
  fechaInicio: Date;
  fechaFin: Date;
  estado: Enum_EstadoProyecto;
  fase: Enum_FaseProyecto;
  lider: Schema.Types.ObjectId;
  objetivos: [Schema.Types.ObjectId];
}

const projectSchema = new Schema<Proyecto>({
  //VALIDACION MONGOOSE
  nombre: {
    type: String,
    required: true,
    unique: true,
  },
  presupuesto: {
    type: Number,
    required: true,
  },
  fechaInicio: {
    type: Date,
    required: true,
  },
  fechaFin: {
    type: Date,
    required: true,
  },
  estado: {
    type: String,
    enum: Enum_EstadoProyecto,
    default: Enum_EstadoProyecto.inactivo,
  },
  fase: {
    type: String,
    enum: Enum_FaseProyecto,
    default: Enum_FaseProyecto.nula,
  },
  lider: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: UserModel,
  },
  objetivos: [
    {
      type: Schema.Types.ObjectId,
      ref: objectiveModel,
    },
  ],
});

const ProjectModel = model("Proyecto", projectSchema);

export { ProjectModel };