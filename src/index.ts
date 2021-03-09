import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema, Query, Resolver } from 'type-graphql';
import express from 'express';
import { User } from './types/User.types';

@Resolver()
class UserResolver {

    @Query(() => String)
    async getUser() {
        return "test"
    }

}

const main = async () => {
    const schema = await buildSchema({
        resolvers: [ UserResolver ]
    });

    const apollo = new ApolloServer({ schema });
    const app = express();
    apollo.applyMiddleware({ app });

    app.listen(3000, () => {
        console.log("server started");
    });
}

main();