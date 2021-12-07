import { gql } from 'apollo-boost';

const getUserQuery = gql`
{
    userDeets {
        name
        email
        contact
        add1
        add2
        location
        state
        country
        nickname
        dob
        about
        uploadPublicID
    }
}
`;

const getResQuery = gql`
{
    resDeets {
        name
        email
        password
        location
        description
        contact
        timings
        delivery
        pickup
        uploadURL
        uploadPublicID
    }
}
`;

const getAllResQuery = gql`
{
    userHomeAllRes {
        name
        email
        password
        location
        description
        contact
        timings
        delivery
        pickup
        uploadURL
        uploadPublicID
    }
}
`;

export {
  getUserQuery,
  getResQuery,
  getAllResQuery,
};
