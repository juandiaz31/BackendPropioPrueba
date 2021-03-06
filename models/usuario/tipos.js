import { gql } from "apollo-server-express";

const tiposUsuario = gql`
  type Usuario {
    _id: ID!
    nombre: String!
    apellido: String!
    identificacion: String!
    correo: String!
    rol: Enum_Rol!
    estado: Enum_EstadoUsuario
  }

  type Estado {
    estado: String!
  }

  input filtroUsuarios {
    _id: ID
    identificacion: String
    correo: String
    rol: Enum_Rol
    estado: Enum_EstadoUsuario
  }

  input CamposEditarPerfil {
    nombre: String
    apellido: String
    identificacion: String
    correo: String
  }

  type Query {
    Usuarios(filtro: filtroUsuarios): [Usuario]
    Usuario(_id: String!): Usuario
    Estudiantes: [Usuario]
    PerfilUsuario(_id: String!): Usuario
    Lideres: [Usuario]
    EstadoUsuario(_id: String!): Estado
  }

  type Mutation {
    crearUsuario(
      nombre: String!
      apellido: String!
      identificacion: String!
      correo: String!
      rol: Enum_Rol!
      estado: Enum_EstadoUsuario
      password: String!
    ): Usuario

    editarUsuario(
      _id: String!
      nombre: String!
      apellido: String!
      identificacion: String!
      correo: String!
      estado: Enum_EstadoUsuario
    ): Usuario

    editarPerfil(_id: String!, campos: CamposEditarPerfil!): Usuario

    eliminarUsuario(_id: String, correo: String): Usuario

    editarEstadoUsuario(_id: String!, estado: Enum_EstadoUsuario!): Usuario
  }
`;

export { tiposUsuario };
