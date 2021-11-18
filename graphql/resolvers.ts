import { resolversProyecto } from "../models/proyecto/resolvers";
import { resolversUsuario } from "../models/usuario/resolver";
import { resolverAvance } from "../models/avance/resolvers";

export const resolvers = [resolversProyecto, resolversUsuario, resolverAvance];
