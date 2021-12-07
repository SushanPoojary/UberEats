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

const getResMenuQuery = gql`
{
    getResMenu {
        p_id
        p_name
        p_ingredients
        p_description
        p_category
        p_type
        p_price
        email
        uploadPublicID
        uploadURL
    }
}
`;

const getCartQuery = gql`
{
    getCart {
        po_id
        name
        quantity
        p_name
        p_category
        p_price
    }
}
`;

const getAllOrdersQuery = gql`
{
    getAllOrders {
        name
        location
        contact
        order_status
        ordertime
    }
}
`;

export {
  getUserQuery,
  getResQuery,
  getAllResQuery,
  getResMenuQuery,
  getCartQuery,
  getAllOrdersQuery,
};
