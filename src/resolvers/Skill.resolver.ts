import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { Skill } from "../types/Skill.types";

@InputType()
export class GetSkillsInput {

    @Field({ nullable: true })
    min_frequency: number; 

    @Field({ nullable: true })
    max_frequency: number; 
}

@Resolver()
export class SkillResolver {

    @Query(() => [Skill])
    async getSkills(
        @Arg("options", { nullable: true }) options: GetSkillsInput
    ) {
        let skills = await Skill.find();

        return skills;
    }

    @Mutation(() => Skill)
    async newSkill(
        @Arg("name", {}) name: String
    ) {
        return Skill.create({ name: name }).save();
    }

}