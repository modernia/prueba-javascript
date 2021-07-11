import { GraphQLClient, gql } from "graphql-request";

const API_URL = 'http://localhost:4000/'

let token = ''
if (typeof window !== 'undefined') {
    localStorage.getItem('token');
}


const graphQLClient = new GraphQLClient(API_URL, {
  headers: {
    Authorization: `Bearer ${token}`
  }
});

export default graphQLClient