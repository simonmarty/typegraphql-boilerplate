import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { useContainer, createConnection } from "typeorm";
import { Post } from "./posts/Post";
import { PostResolver } from "./posts/PostResolver";
import { ApolloServer } from "apollo-server";
import { Container } from "typedi";

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
    resolvers: [PostResolver],
    container: Container,
  });

  const context: Context = { user: "Simon Marty" };

  const app = new ApolloServer({ schema, context });
  await app.listen(3000, () => console.log("Server is running"));
};

start();
