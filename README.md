`npm install`

`npm start` to develop.

`npm run build:dev` to see how minimization works.

`npm run build:prod` to see the final product

# TODO

* https://search.google.com/test/mobile-friendly
* https://backlinko.com/actionable-seo-tips
* HTML Microdata specifications
* Spelling cleanup
* fleshing out documents

## Apollo Best Practices

* https://blog.apollographql.com/graphql-dx-d35bcf51c943
** Fragment explosions are lame, use `graphql-document-collector` to compile them into one big static JSON
** Use `apollo-codegen` to convert server schema into TypeScript objects to improve lint and IntelliJ.
* https://blog.apollographql.com/persisted-graphql-queries-with-apollo-client-119fd7e6bba5
** `persistgraphql` allows transport protocol improvements to reference static queries by ID instead of passing up the entire query over and over again.
** Prevents circular N+1 queries from taking down your server (GraphQL + self-referential recursion = auto DDoS that CORS can't prevent)
*** Additional techniques: https://blog.apollographql.com/securing-your-graphql-api-from-malicious-queries-16130a324a6b
* https://blog.apollographql.com/how-server-side-rendering-works-with-react-apollo-20f31b0c7348
** Component trees with slow queries that rely on N+1 cascades will transfer those accumulated HTTP delays to the ENTIRE **render** loop.  (How did thousands of technical people sign off on that like that's okay...!?)
** To get around that absolutely bad "wisdom of the crowds" design decision, this blog entry suggests moving all requests that load data into a higher-order composition resolver/mapper and expose its accumulator via a `fetchData` method on each component.
* https://www.apollographql.com/docs/link/links/batch-http/
** Supports persisted queries and allows multiple GraphQL queries to be send in one network request
* https://github.com/ecerroni/apollo-cache-updater
** Updating local cache becomes expensive when they include multiple variables/queries and ensuring order-of-update with things like adding/removing from a list, list moving, updating filters, and other atomic operations within sets, etc.
** Decouple the view from the caching later (THANK YOU) by assuming exact correspondance between operation and query parameters.
** While this package may or may not work, it reveals a problem with tightly binding view layer and cache layer through the queries concept.
* https://github.com/apollographql/react-apollo/issues/1535#issuecomment-366427430
** Recommending a normalized singleton structure for app state when dealing with subscription-heavy applications that will grind the render engines to a complete halt.
** This approach allows `debounce` to be a reliable throttling effort to reduce event floods that will trigger a high number of redraws.