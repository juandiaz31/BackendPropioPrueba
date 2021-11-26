import express from "express";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import dotenv from "dotenv";
import conectarBD from "./db/db.js";
import { tipos } from "./graphql/types.js";
import { resolvers } from "./graphql/resolvers.js";
import { validateToken } from "./utils/tokensUtils.js";

dotenv.config();

const getUserData = (token) => {
  const verificacion = validateToken(token.split(" ")[1]);
  if (verificacion.data) {
    return verificacion.data;
  } else {
    return null;
  }
};

const server = new ApolloServer({
  typeDefs: tipos,
  resolvers: resolvers,
  context: ({ req }) => {
    //Para obtener el token
    const token = req.headers?.authorization ?? null;
    if (token) {
      const userData = getUserData(token);
      if (userData) {
        return { userData };
      }
    }
    return null;
  },
});

const app = express();

app.use(express.json());

app.use(cors());

app.listen({ port: process.env.PORT || 4000 }, async () => {
  await conectarBD();
  //prender el servidor de apollo
  await server.start();

  server.applyMiddleware({ app });
  console.log("Servidor listo");
});
