const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const { ApolloServer, gql } = require('apollo-server-koa');

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello, GraphQL with Koa2 and Koa-Router!',
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = new Koa();
const router = new Router();

app.use(bodyParser());

// 异步启动 Apollo Server，然后再将中间件绑定到 Koa 应用
async function startServer() {
  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });
}

startServer().then(() => {
  // 添加自定义路由
  router.get('/custom', async (ctx) => {
    ctx.body = 'Custom route';
  });

  app.use(router.routes());
  app.use(router.allowedMethods());

  const port = 4000;
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
});
