import gql from "graphql-tag";

export const GET_SCHOOLS = gql`
  query Schools($skip: Int!, $take: Int, $orderBy: [SchoolOrderByInput!]!, $where: SchoolWhereInput!) {
    schools(skip: $skip, take: $take, orderBy: $orderBy, where: $where) {
      id
      schoolName
      schoolPhotoUrl
      createdAt
      updatedAt
    }
    schoolsCount
  }
`;
