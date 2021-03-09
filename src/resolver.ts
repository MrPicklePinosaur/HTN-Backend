import { Arg, Query, Resolver } from 'type-graphql';
import { User } from './types/User.types';
import { dummyUsers } from './services/db.service';

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
}