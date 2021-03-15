import { Arg, Field, FieldResolver, InputType, Mutation, Query, Resolver, Root } from "type-graphql";
import { Skill } from "../types/Skill.types";
import { UserSkill } from "../types/UserSkill.types";
@Resolver(of => Skill)
export class SkillResolver {

    @Query(() => [Skill])
    async getSkills(
        @Arg("min_frequency", { nullable: true }) min_frequency: number,
        @Arg("max_frequency", { nullable: true }) max_frequency: number
    ) {
        let skills = await Skill.find();
        let filtered = [];
        for (const skill of skills) {
            const freq = await skill.frequency();
            var insert = true;
            if (min_frequency != undefined) {
                if (freq < min_frequency) insert = false;
            }
            if (max_frequency != undefined) {
                if (freq > max_frequency) insert = false;
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