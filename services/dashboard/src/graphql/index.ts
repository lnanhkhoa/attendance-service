import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const NEXT_PUBLIC_LANDING_API_ENDPOINT =
  process.env.NEXT_PUBLIC_LANDING_API_ENDPOINT || "http://localhost:4000/api/graphql";

export const apiUri = NEXT_PUBLIC_LANDING_API_ENDPOINT;
export const apiOrigin = new URL(apiUri).origin;

const httpLink = createHttpLink({
  uri: apiUri,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("accessToken");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
