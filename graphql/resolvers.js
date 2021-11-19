import { resolversProyecto } from "../models/proyecto/resolvers.js";
import { resolversUsuario } from "../models/usuario/resolver.js";
import { resolverAvance } from "../models/avance/resolvers.js";

export const resolvers = [resolversProyecto, resolversUsuario, resolverAvance];
