import { Field, ID, ObjectType } from "type-graphql";
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@ObjectType()
export class Skill {

    @Field()
    name: String;

    @Field()
    rating: number;
}

@ObjectType() @Entity()
export class User extends BaseEntity {

    @Field(() => ID) @PrimaryGeneratedColumn()
    id: number | null = null;

    @Field() @Column()
    name: String;

    @Field({ nullable: true }) @Column({ nullable: true })
    picture?: String;

    @Field({ nullable: true }) @Column({ nullable: true })
    company?: String;

    @Field() @Column()
    email: String;

    @Field() @Column()
    phone: String;

    // @Field(type => [Skill]) @Column()
    // skills: Skill[]

    constructor() {
        super();
    }
}