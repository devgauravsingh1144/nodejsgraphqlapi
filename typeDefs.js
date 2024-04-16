const { gql } = require('apollo-server');

// Define your GraphQL schema
const typeDefs = gql`
  type Attendence {
    id: ID!
    name: String!
    emailid: String!
    password:String!
    mobileno:String!
    img:String!
    type:String!
  }

  type LoginResponse {
    token: String!
  }

  type Query {
    todos: [Attendence!]!
    todo(id: ID!): Attendence
  }

  type Mutation { 
    registerEmployee(name: String!,emailid:String!,password:String!,mobileno:String!,img:String,type:String!): Attendence!
    login(emailOrMobile: String!, password: String!): LoginResponse!
    updateEmployeeData(id: ID!, name: String!,emailid:String!,password:String!,mobileno:String!,img:String,type:String!): Attendence!
    deleteEmployeeData(id: ID!): Attendence!
  }
`;

module.exports = typeDefs;
