# Graph QL


## Libraries

### Server

Apollo Server:
```
npm install @apollo/server graphql
```

```js
//imports
const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')

//define typeDefs
const typeDefs = `
  type Person {
    name: String!
    phone: String
    street: String!
    city: String! 
    id: ID!
  }

  type Query {
    personCount: Int!
    allPersons: [Person!]!
    findPerson(name: String!): Person
  }
`

//define resolvers
const resolvers = {
  Query: {
    personCount: () => persons.length,
    allPersons: () => persons,
    findPerson: (root, args) =>
      persons.find(p => p.name === args.name)
  }
}

//create server
const server = new ApolloServer({
  typeDefs,
  resolvers,
})

//listen to server
startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})

```

### Client
options:
- Relay
- Apollo Client

#### Apollo Client
1. Install dependencies
```
npm install @apollo/client graphql
```
2. Imports
```js
import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
```
3. Create client
```js
const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
})
```
4. Define query
```js
const query = gql`
  query {
    allPersons  {
      name,
      phone,
      address {
        street,
        city
      }
      id
    }
  }
`
```
5. Execute query
```js
client.query({ query })
  .then((response) => {
    console.log(response.data)
  })
```

### Typical structure:

- **main.jsx:** creating client and wrapping App component with ApolloProvider
- **App.jsx:** querying the server
<div style="display:flex;gap:12px">

```js
//main.jsx
import ReactDOM from 'react-dom/client'
import App from './App'

import {
  ApolloClient,

  ApolloProvider,
  InMemoryCache,
} from '@apollo/client'

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
})

ReactDOM.createRoot(document.getElementById('root')).render(

  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)
```

```js
//App.jsx
import { gql, useQuery } from '@apollo/client'

const ALL_PERSONS = gql`
query {
  allPersons {
    name
    phone
    id
  }
}
`

const App = () => {
  const result = useQuery(ALL_PERSONS)

  if (result.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      {result.data.allPersons.map(p => p.name).join(', ')}
    </div>
  )
}

export default App
```
</div>

## Fragment and subscriptions

### Fragments
```js
//client side
const PERSON_DETAILS = gql`
  fragment PersonDetails on Person {
    id
    name
    phone 
    address {
      street 
      city
    }
  }
`
export const FIND_PERSON = gql`
  query findPersonByName($nameToSearch: String!) {
    findPerson(name: $nameToSearch) {
      ...PersonDetails
    }
  }
  ${PERSON_DETAILS}

`

```

### Subscriptions