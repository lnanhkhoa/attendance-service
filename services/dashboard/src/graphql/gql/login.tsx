import { gql } from "@apollo/client";

export const MUTATION_SIGN_IN = gql`
  mutation Mutation($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      ... on UserAuthenticationWithPasswordSuccess {
        item {
          email
          firstName
          lastName
          isSystemAdmin
        }
        sessionToken
      }
    }
  }
`;

export const MUTATION_CHECK_IN = gql`
  mutation AttendCheckin($type: String!, $date: String!) {
    attendCheckin(type: $type, date: $date)
  }
`;
