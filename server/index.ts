import "graphql-import-node"
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
import cors from "cors";
import cookiePerser from "cookie-parser";
import schema from "./schema";
import createContext from "./context";
const app = express();

// const server = new ApolloServer({
//   typeDefs: `
//   type Query {
//   hello:String
//   }
//   `,
//   resolvers: {
//     Query: {
//       hello: () => "hello world"
//     }
//   }
// });

const server = new ApolloServer({ schema });

async function startServer() {
  await server.start();

  app.use("/graphql", cors({
    origin: "http://localhost:3000",
    credentials: true
  }),
    cookiePerser(),
    express.json(),
       expressMiddleware(server, {
      context: async ({ req, res }) => createContext({ req, res }),
    })
  );

  app.listen(4000, () => {
    console.log("Server is running on http://localhost:4000/graphql");
  });
}

startServer();
