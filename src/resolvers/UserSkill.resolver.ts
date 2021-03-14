import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { UserSkill } from "../types/UserSkill.types";

@Resolver()
export class UserSkillResolver {

    @Query(() => [UserSkill])
    async getUserSkills() {
        return UserSkill.find();
    }

    @Mutation(() => UserSkill)
    async newUserSkill(
        @Arg("userId", {}) userId: number,
        @Arg("skillId", {}) skillId: number,
        @Arg("rating", {}) rating: number
    ) {
        return UserSkill.create({ userId, skillId, rating }).save();
    }

}