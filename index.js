// SPDX-License-Identifier: GPL-2.0-or-later
// Copyright (C) 2026 Marcus Beauregard

const { ApolloServer } = require('apollo-server');
const { typeDefs, resolvers } = require('./schema');

const server = new ApolloServer({ typeDefs, resolvers });
server.listen(4000).then(({ url }) => console.log('graphql-forum ready at ' + url));
