import { resolversProyecto } from "../models/proyecto/resolvers.js";
import { resolversUsuario } from "../models/usuario/resolvers.js";
import { resolversAvance } from "../models/avance/resolvers.js";
import { resolversInscripciones } from "../models/inscripcion/resolvers.js";

export const resolvers = [
  resolversProyecto,
  resolversUsuario,
  resolversAvance,
  resolversInscripciones,
];
