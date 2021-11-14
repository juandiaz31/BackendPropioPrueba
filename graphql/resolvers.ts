const resolvers = {
  Query: {
    Usuarios: async (parent, args) => {
      const usuarios = [
        {
          nombre: "Sebastian",
        },
        {
          nombre: "Daniel",
        },
        {
          nombre: "Miguel",
        },
      ];

      return usuarios;
    },
  },

  // Mutation: {

  // }
};

export { resolvers };
