import ApolloClient from "apollo-boost";

const client = new ApolloClient({
    uri: "https://heroku-merng.herokuapp.com/graphql",
});
// https://heroku-merng.herokuapp.com/graphql
export default client;