import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import express from 'express';
import morgan from 'morgan';

import { initDB, populateDB } from './services/db.service';
import { UserResolver } from './resolvers/User.resolver';
import { SkillResolver } from './resolvers/Skill.resolver';
import { UserSkillResolver } from './resolvers/UserSkill.resolver';

const main = async () => {
    await initDB();
    console.log("db connected");

    const schema = await buildSchema({
        resolvers: [ UserResolver, SkillResolver, UserSkillResolver ]
    });

    const apollo = new ApolloServer({ schema });
    const app = express();
    app.use(morgan('combined'));
    apollo.applyMiddleware({ app });

    app.get('/purge', async (req, res) => {
        await populateDB;
        res.send('Reinitialized db');
    })

    app.listen(3000, () => {
        console.log("server started");
    });
}

main();