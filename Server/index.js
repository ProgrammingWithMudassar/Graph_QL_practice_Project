const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const bodyParser = require("body-parser");
const cors = require("cors");


const startServer = async () =>{
    const app = express();
    const server = new ApolloServer({
        typeDefs : `
           type Todo {
            id: ID!
            title: String!
           }

           type Query {
            getTodos: [Todo]
           }


        `,
        resolvers: {},
    });

    app.use(bodyParser.json())
    app.use(cors());

    await server.start();
    app.use("/graphql", expressMiddleware(server))

    app.listen(8000, ()=>{
        console.log("Server is running on 8000");
    })
}

startServer();