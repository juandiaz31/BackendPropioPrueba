import { gql } from "apollo-server-express";

const tiposAvance = gql`
  type Avance {
    _id: ID!
    fecha: Date!
    descripcion: String!
    observaciones: [String]
    proyecto: Proyecto!
    creadoPor: Usuario!
  }

  type Query {
    Avances(project: String): [Avance]
    filtrarAvance(_id: String!): [Avance]
    AvancesLiderados(_id: String!): [Avance]
  }

  type Mutation {
    crearAvance(
      fecha: Date!
      descripcion: String!
      proyecto: String!
      creadoPor: String!
    ): Avance

    crearObservacion(_id: String!, observacion: String!): Avance

    editarAvance(_id: String!, descripcion: String!): Avance
  }
`;

export { tiposAvance };
