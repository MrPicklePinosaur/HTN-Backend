import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@ObjectType() @Entity()
export class Skill extends BaseEntity {

    @Field(() => ID) @PrimaryColumn()
    name: String;

    constructor() {
        super();
    }
}
