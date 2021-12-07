const graphql = require('graphql');

const users = require('../models/user');
const restaurants = require('../models/restaurant');
const menus = require('../models/menu');
const favourites = require('../models/favourite');
const carts = require('../models/cart');
const orders = require('../models/order');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLBoolean,
    GraphQLDate
} = graphql;

const userRegType = new GraphQLObjectType({
    name: 'userReg',
    fields: () => ({
        name: { type: GraphQLString },
        contact: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        location: { type: GraphQLString },
        state: { type: GraphQLString },
        country: { type: GraphQLString },
        nickname: { type: GraphQLString },
        dob: { type: GraphQLString },
        about: { type: GraphQLString },
        add1: { type: GraphQLString },
        add2: { type: GraphQLString },
        uploadPublicID: { type: GraphQLString },
        uploadURL: { type: GraphQLString },
    })
})

const restaurantRegType = new GraphQLObjectType({
    name: 'restaurantReg',
    fields: () => ({
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        location: { type: GraphQLString },
        description: { type: GraphQLString },
        contact: { type: GraphQLString },
        timings: { type: GraphQLString },
        delivery: { type: GraphQLString },
        pickup: { type: GraphQLString },
        uploadPublicID: { type: GraphQLString },
        uploadURL: { type: GraphQLString },
    })
})

const menuType = new GraphQLObjectType({
    name: 'menu',
    fields: () => ({
        p_id: { type: GraphQLInt },
        p_name: { type: GraphQLString },
        p_ingredients: { type: GraphQLString },
        p_description: { type: GraphQLString },
        p_category: { type: GraphQLString },
        p_type: { type: GraphQLString },
        p_price: { type: GraphQLString },
        email: { type: GraphQLString },
        uploadPublicID: { type: GraphQLString },
        uploadURL: { type: GraphQLString },
    })
})

const cartType = new GraphQLObjectType({
    name: 'cart',
    fields: () => ({
        po_id: { type: GraphQLInt },
        quantity: { type: GraphQLString },
        price: { type: GraphQLString },
        user_email: { type: GraphQLString },
        owner_email: { type: GraphQLString },
        overallprice: { type: GraphQLString },
    })
})

const orderType = new GraphQLObjectType({
    name: 'order',
    fields: () => ({
        po_id: { type: GraphQLInt },
        user_email: { type: GraphQLString },
        quantity: { type: GraphQLString },
        sp_inst: { type: GraphQLString },
        order_status: { type: GraphQLString },
        ordertime: { type: GraphQLString },
    })
})

var globalSessionUemail;
var globalSessionRemail;

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        userDeets: {
            type: userRegType,
            args: { email: { type: GraphQLString } },
            resolve: async function (parent, args, { req, res }) {
                console.log(globalSessionUemail);
                const user = await users.findOne({ email: globalSessionUemail })
                if (user) {
                    console.log(user);
                    return user;
                }
            }
        },
        resDeets: {
            type: restaurantRegType,
            args: { email: { type: GraphQLString } },
            resolve: async function (parent, args, { req, res }) {
                console.log(globalSessionRemail);
                const user = await restaurants.findOne({ email: globalSessionRemail })
                if (user) {
                    console.log(user);
                    return user;
                }
            }
        },
        userHomeAllRes: {
            type: new GraphQLList(restaurantRegType),
            args: { email: { type: GraphQLString } },
            resolve: async function (parent, args, { req, res }) {
                const rest = await restaurants.find({})
                if (rest) {
                    console.log(rest);
                    return rest;
                }
            }
        },
        getResMenu: {
            type: new GraphQLList(menuType),
            args: { email: { type: GraphQLString } },
            resolve: async function (parent, args, { req, res }) {
                const menu = await menus.find({ email: globalSessionRemail })
                if (menu) {
                    console.log(menu);
                    return menu;
                }
            }
        },
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        userReg: {
            type: userRegType,
            args: {
                name: { type: GraphQLString },
                contact: { type: GraphQLString },
                email: { type: GraphQLString },
                password: { type: GraphQLString },
                
            },
            resolve: async function (parent, args, {req, res}) {
                    console.log("Inside userReg Mutation");
                    var user = new users({
                        name: args.name,
                        contact: args.contact,
                        email: args.email,
                        password: args.password,
                    });
                    // console.log(user);
                    user.save()
                        .then(() => {
                                    console.log('User register success');
                                })
                        .catch(err => console.log(err))
                        return user;
                        }
                    
                },
        UserLogin: {
            type: userRegType,
            args: {
                email: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            resolve: async function(parent, args, {req, res}) {
                const user = await users.findOne({ email: args.email, password: args.password })
                if (user) {
                    res.cookie('cookie',user.email,{maxAge: 900000, httpOnly: false, path : '/'});
                    globalSessionUemail = user.email;
                    req.session.isLoggedIn = true;

                    req.session.save();
                    res.status(200);
                      }
                else {
                    throw new Error('Invalid credentials!')
                }
            }
        },
        restaurantReg: {
            type: restaurantRegType,
            args: {
                name: { type: GraphQLString },
                location: { type: GraphQLString },
                email: { type: GraphQLString },
                password: { type: GraphQLString },
                
            },
            resolve: async function (parent, args, {req, res}) {
                    console.log("Inside restaurantReg Mutation");
                    var user = new restaurants({
                        name: args.name,
                        location: args.location,
                        email: args.email,
                        password: args.password,
                    });
                    // console.log(user);
                    user.save()
                        .then(() => {
                                    console.log('Restaurant register success');
                                })
                        .catch(err => console.log(err))
                        return user;
                        }
                    
                },
        RestaurantLogin: {
            type: restaurantRegType,
            args: {
                email: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            resolve: async function(parent, args, {req, res}) {
                const user = await restaurants.findOne({ email: args.email, password: args.password })
                if (user) {
                    res.cookie('cookie',user.email,{maxAge: 900000, httpOnly: false, path : '/'});
                    globalSessionRemail = user.email;
                    console.log(globalSessionRemail);
                    req.session.isLoggedIn = true;
                    req.session.save();
                    res.status(200);
                      }
                else {
                    throw new Error('Invalid credentials!')
                }
            }
        },
        userProfile: {
            type: userRegType,
            args: {
                name: { type: GraphQLString },
                contact: { type: GraphQLString },
                email: { type: GraphQLString },
                location: { type: GraphQLString },
                state: { type: GraphQLString },
                country: { type: GraphQLString },
                nickname: { type: GraphQLString },
                dob: { type: GraphQLString },
                about: { type: GraphQLString },
                add1: { type: GraphQLString },
                add2: { type: GraphQLString },  
            },
            resolve: async function (parent, args, {req, res}) {
                    console.log("Inside user Profile Mutation");
                    users.findOneAndUpdate({ email: globalSessionUemail }, 
                        { $set : 
                            {   name: args.name,
                                location: args.location,
                                state: args.state,
                                country: args.country,
                                contact: args.contact,
                                nickname: args.nickname,
                                dob: args.dob,
                                about: args.about,
                                add1: args.add1,
                                add2: args.add2, }  
                        }, (err, res) => {
                            if (err) throw err;
                            console.log("User profile Updated!");
                            console.log(res);
                            return res;
                        }
                    )}
                    
                },
        userProfile: {
            type: userRegType,
            args: {
                name: { type: GraphQLString },
                contact: { type: GraphQLString },
                email: { type: GraphQLString },
                location: { type: GraphQLString },
                state: { type: GraphQLString },
                country: { type: GraphQLString },
                nickname: { type: GraphQLString },
                dob: { type: GraphQLString },
                about: { type: GraphQLString },
                add1: { type: GraphQLString },
                add2: { type: GraphQLString },  
            },
            resolve: async function (parent, args, {req, res}) {
                    console.log("Inside user Profile Mutation");
                    users.findOneAndUpdate({ email: globalSessionUemail }, 
                        { $set : 
                            {   name: args.name,
                                location: args.location,
                                state: args.state,
                                country: args.country,
                                contact: args.contact,
                                nickname: args.nickname,
                                dob: args.dob,
                                about: args.about,
                                add1: args.add1,
                                add2: args.add2, }  
                        }, (err, res) => {
                            if (err) throw err;
                            console.log("User profile Updated!");
                            console.log(res);
                            return res;
                        }
                    )}
                    
                },
        userProfile: {
            type: userRegType,
            args: {
                name: { type: GraphQLString },
                contact: { type: GraphQLString },
                email: { type: GraphQLString },
                location: { type: GraphQLString },
                state: { type: GraphQLString },
                country: { type: GraphQLString },
                nickname: { type: GraphQLString },
                dob: { type: GraphQLString },
                about: { type: GraphQLString },
                add1: { type: GraphQLString },
                add2: { type: GraphQLString },  
            },
            resolve: async function (parent, args, {req, res}) {
                    console.log("Inside user Profile Mutation");
                    users.findOneAndUpdate({ email: globalSessionUemail }, 
                        { $set : 
                            {   name: args.name,
                                location: args.location,
                                state: args.state,
                                country: args.country,
                                contact: args.contact,
                                nickname: args.nickname,
                                dob: args.dob,
                                about: args.about,
                                add1: args.add1,
                                add2: args.add2, }  
                        }, (err, res) => {
                            if (err) throw err;
                            console.log("User profile Updated!");
                            console.log(res);
                            return res;
                        }
                    )}
                    
                },
        resProfile: {
            type: restaurantRegType,
            args: {
                name: { type: GraphQLString },
                email: { type: GraphQLString },
                password: { type: GraphQLString },
                location: { type: GraphQLString },
                description: { type: GraphQLString },
                contact: { type: GraphQLString },
                timings: { type: GraphQLString },
                delivery: { type: GraphQLString },
                pickup: { type: GraphQLString },  
            },
            resolve: async function (parent, args, {req, res}) {
                    console.log("Inside Rest Profile Mutation");
                    restaurants.findOneAndUpdate({ email: globalSessionRemail }, 
                        { $set : 
                            {   name: args.name,
                                location: args.location,
                                contact: args.contact,
                                description: args.description,
                                timings: args.timings,
                                delivery: args.delivery,
                                pickup: args.pickup,
                             }  
                        }, (err, res) => {
                            if (err) throw err;
                            console.log("Rest profile Updated!");
                            console.log(res);
                            return res;
                        }
                    )}
                    
                },
        addMenu: {
            type: menuType,
            args: {
                p_id: { type: GraphQLInt },
                p_name: { type: GraphQLString },
                p_ingredients: { type: GraphQLString },
                p_description: { type: GraphQLString },
                p_category: { type: GraphQLString },
                p_type: { type: GraphQLString },
                p_price: { type: GraphQLString },
            },
            resolve: async function (parent, args, {req, res}) {
                    console.log("Inside Add Menu Mutation");
                    var menu = new menus({
                        p_id: args.p_id,
                        p_name: args.p_name,
                        p_ingredients: args.p_ingredients,
                        p_description: args.p_description,
                        p_category: args.p_category,
                        p_type: args.p_type,
                        p_price: args.p_price,
                        email: globalSessionRemail,
                    });
                    // console.log(user);
                    menu.save()
                        .then(() => {
                                    console.log('Dish Added Successfully!');
                                })
                        .catch(err => console.log(err))
                        return menu;
                        }
                    
                },
        UserRestaurant: {
            type: restaurantRegType,
            args: {
                email: { type: GraphQLString },
            },
            resolve: async function (parent, args, {req, res}) {
                    console.log("Inside User Rest Visit Mutation");
                    globalSessionRemail = args.email;
                    // console.log(user);
                    console.log('User Visits Rest!')
                    console.log(globalSessionRemail);
                    return globalSessionRemail;
                    }
                },
        addToCart: {
            type: cartType,
            args: {
                po_id: { type: GraphQLInt },
                price: { type: GraphQLString }
            },
            resolve: async function (parent, args, {req, res}) {
                    console.log("Inside Add to Cart Mutation");
                    var cart = new carts({
                        po_id: args.po_id,
                        price: args.price,
                        user_email: globalSessionUemail,
                        owner_email: globalSessionRemail,
                    });
                    // console.log(user);
                    cart.save()
                        .then(() => {
                                    console.log('Added to cart Successfully!');
                                })
                        .catch(err => console.log(err))
                        return cart;
                        }
                    
                },
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});