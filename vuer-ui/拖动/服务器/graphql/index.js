import  { gql } from "apollo-server"

// Define your GraphQL schema
const typeDefs = gql`
    type Book {
        title: String,
        author: String
    }
    type Query{
        books: [Book]
    }
`

export {typeDefs}



