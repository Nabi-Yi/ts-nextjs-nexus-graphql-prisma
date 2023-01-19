import express from "express";
import { BigInt, DateTime } from "nexus-prisma/scalars";
import { makeSchema } from "nexus";
import * as allTypes from "./schema";
import { createContext } from "./context";
import cors from "cors";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import http from "http";
import { json } from "body-parser";
import { Context } from "./types";

const schema = makeSchema({
  types: [BigInt, DateTime, allTypes],
});

const app = express();
const httpServer = http.createServer(app);

const server = new ApolloServer<Context>({
  schema,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
async function apolloServerHandler(){
await server.start();
app.use(
  "/graphql",
  cors({
    origin: ["http://localhost:3000", "https://studio.apollographql.com"],
    credentials: true,
  }),
  json(),
  expressMiddleware(server, {
    context: async ({ req, res }) => {
      return createContext(req, res);
    },
  })
);

await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));
console.log(`🚀 Server ready at http://localhost:4000/graphql`);
}

apolloServerHandler();
