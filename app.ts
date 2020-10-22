import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { useContainer, createConnection } from "typeorm";
import { Container } from "typedi";
import { ApolloServer } from "apollo-server";

import { Post } from "./entities/posts/Post";

import { PostResolver } from "./entities/posts/PostResolver";
import { StatusResolver } from "./entities/status/StatusResolver";

export interface Context {
  user: string;
}

useContainer(Container);

const start = async () => {
  await createConnection({
    type: "sqlite",
    database: "test.db",
    entities: [Post],
    logging: false,
    synchronize: true,
  });

  const schema = await buildSchema({
    resolvers: [PostResolver, StatusResolver],
    container: Container,
  });

  const context: Context = { user: "Simon Marty" };

  const app = new ApolloServer({ schema, context });
  await app.listen(3000, () => console.log("Server is running"));
};

start();
