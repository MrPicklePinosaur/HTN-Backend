## PinoHacks - HTN backend challenge

### ❓ Overview

This is a submission to the **Hack the North 2021 Backend Challenge**.

Some technologies that were involved includes:
- Apollo
- TypeGraphQL
- TypeORM
- Sqlite

### 📦 Try it out

The GraphQL playground can be found at [http://api.pinohacks.xyz:3000/graphql](http://api.pinohacks.xyz:3000/graphql). If you want to reset
the database, you can hit the '/purge' endpoint with a GET request. Full spec can be found in the usage section.

Here's a sample request using curl:
```
curl \
  --request POST \
  --header 'Content-Type: application/json' \
  --data '{"query": "query { getUsers { name } }"}' \
  http://api.pinohacks.xyz:3000/graphql
```

### ⚙️ Types

**User**
```
type User {
    id: ID!
    name: String!
    picture: String
    company: String
    email: String!
    phone: String!
    skills: [UserSkill]!
}
```

**Skill**
```
type Skill {
    id: ID!
    name: String!
    frequency: Float!
}
```

**UserSkills** - relates User and Skill
```
type UserSkill {
    skillname: String!
    rating: Float!
}
```

### 🗄️ Queries

**getUserSkills** - no paramter returns all users
```
query {
    getUserSkills(id: ID) {
        id
        name
        picture
        company
        email
        phone
        skills {
            skillname
            rating
        }
    }
    
}
```

**getSkills** - can filter by how many users have this skill
```
query {
    getSkills(min_frequency: Float, max_frequency: Float) {
        id
        name
    }
}
```

**getUserSkills** - returns all UserSkill objects
```
query {
    getUserSkils {
        skillname
        rating
    }
}
```

### 🧬 Mutations

**newUser** - create new user
```
type NewUserInput {
    name: String!
    picture: String
    company: String
    email: String!
    phone: String!
    skills: [NewSkillInput!]
}
type NewSkillInput {
    name: String!
    rating: Float!
}

mutation {
    newUser(newdata: NewUserInput!) {
        id
        name
        picture
        company
        email
        phone
        skills
    }
}
```

**newSkill** - creates a new skill (does not associate any users with any skills)
```
mutation {
    newSkill(name: String!) {
        id
        name
        frequency
    }
}
```

**newUserSkill** - associates a user with a skill
```
mutation {
    newUserSkill(userId: ID!, skillId: ID!, rating: Float!) {
        skillname: String!
        rating: Float!
    }
}

```

**updateUser** - when skills is left as null, user skill does not get modified, when it is not null, the skills array passed replaces the user's skills
```
type UpdateUserInput {
    picture: String
    company: String
    email: String
    phone: String
    skills: [NewSkillInput!]
}

mutation {
    updateUser(id: ID!, newdata: UpdateUserInput!) {
        id
        name
        picture
        company
        email
        phone
        skills
    }
}
```
