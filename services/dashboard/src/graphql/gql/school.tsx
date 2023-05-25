import gql from "graphql-tag";

export const GET_SCHOOLS = gql`
  query Schools($skip: Int!, $take: Int, $orderBy: [SchoolOrderByInput!]!, $where: SchoolWhereInput!) {
    schools(skip: $skip, take: $take, orderBy: $orderBy, where: $where) {
      id
      schoolName
      schoolPhotoUrl
      city
      country
      createdAt
      updatedAt
    }
    schoolsCount(where: $where)
  }
`;

export const GET_SCHOOL = gql`
  query Query($where: SchoolWhereUniqueInput!) {
    school(where: $where) {
      id
      schoolName
      schoolPhotoUrl
      city
      country
      updatedAt
      createdAt
    }
  }
`;

export const GET_ATTENDANCES = gql`
  query Attendances($where: AttendanceWhereInput!, $take: Int, $skip: Int!, $orderBy: [AttendanceOrderByInput!]!) {
    attendances(where: $where, take: $take, skip: $skip, orderBy: $orderBy) {
      capturePhotoUrl
      id
      temperature
      type
      user {
        id
        email
        firstName
        lastName
        userPhotoUrl
      }
      createdAt
    }
    attendancesCount(where: $where)
  }
`;
