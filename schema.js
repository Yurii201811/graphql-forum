const fs = require('fs');
const typeDefs = fs.readFileSync('./schema.graphql', 'utf8');

const users = [
  { id: '1', name: 'Marcus' },
  { id: '2', name: 'Ada' },
];
const posts = [
  { id: '1', title: 'Hello GraphQL', body: 'This is my first post.', authorId: '1' },
];
const comments = [];

const resolvers = {
  Query: {
    posts: () => posts,
    post: (_, { id }) => posts.find((p) => p.id === id),
    users: () => users,
  },
  Post: {
    author: (p) => users.find((u) => u.id === p.authorId),
    comments: (p) => comments.filter((c) => c.postId === p.id),
  },
  Comment: {
    author: (c) => users.find((u) => u.id === c.authorId),
  },
  Mutation: {
    createPost: (_, { title, body }) => {
      const post = { id: String(posts.length + 1), title, body, authorId: '1' };
      posts.push(post);
      return post;
    },
    addComment: (_, { postId, body }) => {
      const c = { id: String(comments.length + 1), body, postId, authorId: '2' };
      comments.push(c);
      return c;
    },
  },
};

module.exports = { typeDefs, resolvers };
