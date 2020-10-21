import { Field, ObjectType } from "type-graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class Post {
  @PrimaryGeneratedColumn()
  @Field()
  readonly id!: number;

  @Column({
    length: 100,
  })
  @Field()
  title!: string;

  @Column({
    length: 100,
  })
  @Field()
  author!: string;

  @Column("text")
  @Field()
  description?: string;
}
