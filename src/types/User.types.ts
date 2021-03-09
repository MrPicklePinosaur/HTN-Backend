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
    name: String;

    @Field()
    picture: String;

    @Field()
    company: String;

    @Field()
    email: String;

    @Field()
    phone: String;

    @Field(type => [Skill])
    skills: Skill[]
}