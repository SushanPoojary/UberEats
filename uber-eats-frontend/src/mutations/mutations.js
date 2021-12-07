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

const restaurantRegMutation = gql`
mutation restaurantReg(
    $name: String,
    $location: String,
    $email: String,
    $password: String) {
        restaurantReg(
            name: $name,
            location: $location,
            email: $email,
            password: $password
        )
        {
            name
            location
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

const RestaurantLoginMutation = gql`
mutation RestaurantLogin(
    $email: String,
    $password: String) {
        RestaurantLogin(
            email: $email,
            password: $password
        )
        {
            email
            password
        }
    }
`;

const userProfileMutation = gql`
mutation userProfile(
    $name: String,
    $add1: String,
    $add2: String,
    $location: String,
    $state: String,
    $country: String,
    $nickname: String,
    $dob: String,
    $about: String,
    $contact: String,
    $email: String) {
        userProfile(
            name: $name,
            contact: $contact,
            add1: $add1,
            add2: $add2,
            location: $location,
            state: $state,
            country: $country,
            nickname: $nickname,
            dob: $dob,
            about: $about,
            email: $email
        )
        {
            name
            contact
            add1
            add2
            location
            state
            country
            nickname
            dob
            about
            email
        }
    }
`;

const resProfileMutation = gql`
mutation resProfile(
    $name: String,
    $location: String,
    $description: String,
    $contact: String,
    $timings: String,
    $delivery: String,
    $pickup: String,) {
        resProfile(
            name: $name,
            location: $location,
            description: $description,
            contact: $contact,
            timings: $timings,
            delivery: $delivery,
            pickup: $pickup
        )
        {
            name
            location
            description
            contact
            timings
            delivery
            pickup
        }
    }
`;

const addMenuMutation = gql`
mutation addMenu(
    $p_id: Int,
    $p_name: String,
    $p_ingredients: String,
    $p_description: String,
    $p_category: String,
    $p_type: String,
    $p_price: String,) {
        addMenu(
            p_id: $p_id,
            p_name: $p_name,
            p_ingredients: $p_ingredients,
            p_description: $p_description,
            p_category: $p_category,
            p_type: $p_type,
            p_price: $p_price
        )
        {
            p_id
            p_name
            p_ingredients
            p_description
            p_category
            p_type
            p_price
        }
    }
`;

const UserRestaurant = gql`
mutation UserRestaurant(
    $email: String
    ) {
        UserRestaurant(
            email: $email
        )
        {
            email
        }
    }
`;

const addToCartMutation = gql`
mutation addToCart(
    $po_id: Int,
    $price: String,) {
        addToCart(
            po_id: $po_id,
            price: $price
        )
        {
            po_id
            price
        }
    }
`;

export {
  userRegMutation,
  UserLoginMutation,
  restaurantRegMutation,
  RestaurantLoginMutation,
  userProfileMutation,
  resProfileMutation,
  addMenuMutation,
  UserRestaurant,
  addToCartMutation,
};
