import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Skill {
    @Field()
    name: String;

    @Field()
    rating: number;
}

@ObjectType()
export class User {
    @Field()
    id: number;

    @Field()
    name: String;

    @Field({ nullable: true })
    picture?: String;

    @Field({ nullable: true })
    company?: String;

    @Field()
    email: String;

    @Field()
    phone: String;

    @Field(type => [Skill])
    skills: Skill[]
}