import ApolloClient from "apollo-boost";
import { createHttpLink } from 'apollo-link-http';

const link = createHttpLink({
    uri: 'http://localhost:4000/graphql',
    credentials: 'include',
  });

const client = new ApolloClient({
    uri: "http://localhost:4000/graphql",
    link,
    
});
// https://heroku-merng.herokuapp.com/graphql




export default client;