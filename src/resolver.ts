import { Arg, Field, InputType, Mutation, Query, Resolver } from 'type-graphql';
import { Skill, User } from './types/User.types';
import { dummyUsers } from './services/db.service';

/* bit of code duplication, sorta ugly */
@InputType()
class UpdateUserInput implements Partial<User> {

    @Field({ nullable: true })
    picture?: String;

    @Field({ nullable: true })
    company?: String;

    @Field({ nullable: true })
    email: String;

    @Field({ nullable: true })
    phone: String;
}

@Resolver()
export class UserResolver {
    private userCollection: User[] = dummyUsers;

    @Query(() => [User])
    async getUsers (
        @Arg("id", { nullable: true }) id: number
    ): Promise<User[]> {

        let filtered = this.userCollection;

        if (id != null) filtered = filtered.filter(user => user.id === id);

        return filtered;
    }

    @Mutation(() => String)
    async updateUser(
        @Arg("id", {}) id: number,
        @Arg('newdata', {}) newdata: UpdateUserInput
    ) {
        var updateuser: User|undefined = this.userCollection.find(user => user.id === id);

        if (updateuser != undefined) {
            console.log( {
                ...updateuser,
                ...newdata
            });
        }

        return "updated";

        // do some error stuff
    }

}