import { gql } from "@apollo/client";

export const MUTATION_SIGN_UP = gql`
  mutation SignUpByEmailPass($email: String!, $password: String!, $firstName: String!, $lastName: String!) {
    landing {
      signUpByEmailPass(email: $email, password: $password, firstName: $firstName, lastName: $lastName) {
        isSignUpSuccess
        isEmailSent
        isActivated
      }
    }
  }
`;
