import { VariablesInAllowedPositionRule } from "graphql";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Context } from "../app";
import { Post } from "./Post";
import { PostInput } from "./PostInput";

@Resolver(Post)
export class PostResolver {
  constructor(@InjectRepository(Post) private postRepo: Repository<Post>) {}

  @Query((returns) => [Post])
  async posts() {
    return this.postRepo.find();
  }

  @Mutation((returns) => Post)
  async addPost(@Arg("post") postInput: PostInput, @Ctx() { user }: Context) {
    const post = this.postRepo.create({
      ...postInput,
      author: user,
    });
    await this.postRepo.save(post);
    return post;
  }
}
