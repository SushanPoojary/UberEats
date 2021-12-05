import { gql } from 'apollo-boost';

const userRegMutation = gql`
mutation userReg(
    $name: String,
    $contact: String,
    $email: String,
    $password: String) {
        userReg(
            name: $name,
            contact: $contact,
            email: $email,
            password: $password
        )
        {
            name
            contact
            email
            password
        }
    }
`;

const UserLoginMutation = gql`
mutation UserLogin(
    $email: String,
    $password: String) {
        UserLogin(
            email: $email,
            password: $password
        )
        {
            email
            password
        }
    }
`;

export { userRegMutation, UserLoginMutation };
