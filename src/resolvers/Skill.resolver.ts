import { Arg, Field, FieldResolver, InputType, Mutation, Query, Resolver, Root } from "type-graphql";
import { Skill } from "../types/Skill.types";
import { UserSkill } from "../types/UserSkill.types";

@InputType()
export class GetSkillsInput {

    @Field({ nullable: true })
    min_frequency: number; 

    @Field({ nullable: true })
    max_frequency: number; 
}

@Resolver(of => Skill)
export class SkillResolver {

    @Query(() => [Skill])
    async getSkills(
        @Arg("options", { nullable: true }) options: GetSkillsInput
    ) {
        let skills = await Skill.find();
        let filtered = [];
        for (const skill of skills) {
            const freq = await skill.frequency();
            var insert = true;
            if (options?.min_frequency != undefined) {
                if (freq < options.min_frequency) insert = false;
            }
            if (options?.max_frequency != undefined) {
                if (freq > options.max_frequency) insert = false;
            }
            if (insert) filtered.push(skill);
        }

        return filtered;
    }

    @Mutation(() => Skill)
    async newSkill(
        @Arg("name", {}) name: String
    ) {
        return Skill.create({ name: name }).save();
    }
}