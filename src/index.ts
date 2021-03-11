import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import express from 'express';

import { initDB } from './services/db.service';
import { UserResolver } from './resolver';


const main = async () => {
    await initDB();
    console.log("db connected");

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