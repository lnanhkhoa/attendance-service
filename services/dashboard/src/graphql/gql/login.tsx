import { gql } from "@apollo/client";

export const MUTATION_REQUEST_SIGN_IN = gql`
  mutation RequestSignIn($email: String!, $password: String!) {
    landing {
      requestSignIn(email: $email, password: $password) {
        isSentRequestSignInCode
      }
    }
  }
`;

export const QUERY_GET_SESSION_BY_CODE = gql`
  query GetUserTokenByCode($code: String!) {
    auth {
      getUserTokenByCode(code: $code) {
        accessToken
        refreshToken
        isRevoked
      }
    }
  }
`;
