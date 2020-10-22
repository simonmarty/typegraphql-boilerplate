import { Query, Resolver } from "type-graphql";

@Resolver()
export class StatusResolver {
  @Query(returns => String)
  async status() {
    return "running";
  }
}
