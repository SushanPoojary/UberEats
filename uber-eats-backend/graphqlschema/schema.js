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

const cartOrderType = new GraphQLObjectType({
    name: 'cartorder',
    fields: () => ({
        po_id: { type: GraphQLInt },
        name: { type: GraphQLString },
        quantity: { type: GraphQLString },
        p_name: { type: GraphQLString },
        p_category: { type: GraphQLString },
        p_price: { type: GraphQLString },
    })
})

const orderResType = new GraphQLObjectType({
    name: 'orderRes',
    fields: () => ({
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        location: { type: GraphQLString },
        contact: { type: GraphQLString },
        order_status: { type: GraphQLString },
        ordertime: { type: GraphQLString },
    })
})

const userReceiptType = new GraphQLObjectType({
    name: 'userReceipt',
    fields: () => ({
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        location: { type: GraphQLString },
        contact: { type: GraphQLString },
        order_status: { type: GraphQLString },
        quantity: { type: GraphQLString },
        p_name: { type: GraphQLString },
        p_price: { type: GraphQLString },
        add1: { type: GraphQLString },
        add2: { type: GraphQLString },
        sp_inst: { type: GraphQLString },
        ordertime: { type: GraphQLString },
    })
})

var globalSessionUemail;
var globalSessionRemail;
var globalOrderID;

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
        getCart: {
            type: new GraphQLList(cartOrderType),
            args: { email: { type: GraphQLString } },
            resolve: async function (parent, args, { req, res }) {
                const cart = await carts.aggregate([
                    {"$lookup": {
                    "from": "menus",
                    "localField": "po_id",
                    "foreignField": "p_id",
                    as: "Search"
                    }},
                    {"$unwind": "$Search"},
                    {"$lookup": {
                        "from": "restaurants",
                        "localField": "owner_email",
                        "foreignField": "email",
                        as: "Search1"
                        }},
                    {"$unwind": "$Search1"},
                    {"$match": {"user_email": globalSessionUemail}},
                    {"$project": {"_id": 0, "po_id": 1, "Search1.name": 1, "quantity": 1, "Search.p_name": 1, "Search.p_category": 1, "Search.p_price": 1}},
                    {"$group": {_id: {po_id: "$po_id", name: "$Search1.name",  quantity: "$quantity", p_name: "$Search.p_name", p_category: "$Search.p_category", p_price: "$Search.p_price"}}},
                    {"$replaceRoot": {newRoot: '$_id'}}])
                if (cart) {
                    console.log(cart);
                    return cart;
                }
            }
        },
        getAllOrders: {
            type: new GraphQLList(orderResType),
            args: { email: { type: GraphQLString } },
            resolve: async function (parent, args, { req, res }) {
                const order = await orders.aggregate([
                    {"$lookup": {
                    "from": "menus",
                    "localField": "po_id",
                    "foreignField": "p_id",
                    as: "Search"
                    }},
                    {"$unwind": "$Search"},
                    {"$lookup": {
                        "from": "restaurants",
                        "localField": "Search.email",
                        "foreignField": "email",
                        as: "Search1"
                        }},
                    {"$unwind": "$Search1"},
                    {"$match": {"user_email": globalSessionUemail}},
                    {"$project": {"_id": 0, "Search1.name": 1, "Search1.location": 1, "Search1.contact": 1, "order_status": 1, "ordertime": 1}},
                    {"$group": {_id: {name: "$Search1.name",  location: "$Search1.location", contact: "$Search1.contact", order_status: "$order_status", ordertime: "$ordertime"}}},
                    {"$replaceRoot": {newRoot: '$_id'}}],)
                if (order) {
                    console.log(order);
                    return order;
                }
            }
        },
        getUserReceipt: {
            type: new GraphQLList(userReceiptType),
            args: { email: { type: GraphQLString } },
            resolve: async function (parent, args, { req, res }) {
                const receipt = await orders.aggregate([
                    {"$lookup": {
                    "from": "menus",
                    "localField": "po_id",
                    "foreignField": "p_id",
                    as: "Search"
                    }},
                    {"$unwind": "$Search"},
                    {"$lookup": {
                        "from": "users",
                        "localField": "user_email",
                        "foreignField": "email",
                        as: "Search1"
                        }},
                    {"$unwind": "$Search1"},
                    {"$match": {$and: [{"user_email": globalSessionUemail}, {"ordertime": globalOrderID}]}},
                    {"$project": {"_id": 0, "Search1.name": 1, "Search1.email": 1, "Search1.location": 1, "Search1.contact": 1, "order_status": 1, "quantity": 1, "Search.p_name": 1, "Search.p_price": 1, "Search1.add1": 1, "Search1.add2": 1, "sp_inst": 1}},
                    {"$group": {_id: {name: "$Search1.name", email: "$Search1.email", location: "$Search1.location", contact: "$Search1.contact", order_status: "$order_status", quantity: "$quantity", p_name: "$Search.p_name", p_price: "$Search.p_price", add1: "$Search1.add1", add2: "$Search1.add2", sp_inst: "$sp_inst"}}},
                    {"$replaceRoot": {newRoot: '$_id'}}
                ],)
                if (receipt) {
                    console.log(receipt);
                    return receipt;
                }
            }
        },
        getResAllOrders: {
            type: new GraphQLList(orderResType),
            args: { email: { type: GraphQLString } },
            resolve: async function (parent, args, { req, res }) {
                const order = await orders.aggregate([
                    {"$lookup": {
                    "from": "menus",
                    "localField": "po_id",
                    "foreignField": "p_id",
                    as: "Search"
                    }},
                    {"$unwind": "$Search"},
                    {"$lookup": {
                        "from": "users",
                        "localField": "user_email",
                        "foreignField": "email",
                        as: "Search1"
                        }},
                    {"$unwind": "$Search1"},
                    {"$match": {"Search.email": globalSessionRemail}},
                    {"$project": {"_id": 0, "Search1.name": 1, "Search1.email": 1, "Search1.location": 1, "Search1.contact": 1, "order_status": 1, "ordertime": 1}},
                    {"$group": {_id: {name: "$Search1.name", email: "$Search1.email", location: "$Search1.location", contact: "$Search1.contact", order_status: "$order_status", ordertime: "$ordertime"}}},
                    {"$replaceRoot": {newRoot: '$_id'}}],)
                if (order) {
                    console.log(order);
                    return order;
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
            order: {
            type: orderType,
            args: {
                po_id: { type: GraphQLInt }
            },
            resolve: async function (parent, args, {req, res}) {
                    console.log("Inside Order Mutation");
                    let date_ob = new Date();
                    let date = ("0" + date_ob.getDate()).slice(-2);
                    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
                    let year = date_ob.getFullYear();
                    let hours = ("0" + date_ob.getHours()).slice(-2);
                    let minutes = ("0" + date_ob.getMinutes()).slice(-2);
                    let ordertime = year + "-" + month + "-" + date + " " + hours + ":" + minutes;
                    console.log(ordertime);
                    var order = new orders({
                        po_id: args.po_id,
                        user_email: globalSessionUemail,
                        ordertime: ordertime,
                        order_status: 'Ordered',
                    });
                    // console.log(user);
                    order.save()
                        .then(() => {
                                    console.log('Ordered Successfully!');
                                })
                        .catch(err => console.log(err))
                        return order;
                        }
                    
                },
            cartDel: {
                type: cartType,
                args: {
                    po_id: { type: GraphQLInt }
                },
                resolve: async function (parent, args, {req, res}) {
                        console.log("Inside Delete Cart After Order Mutation");
                        carts.deleteMany({user_email: globalSessionUemail}, (err, results) => {
                            if (err) {
                                throw err;
                            } else {
                                console.log("Deleted from cart, Post order!");
                                return results;
                            }
                        });
                        }
                    },
            userReciept: {
                type: orderType,
                args: {
                    ordertime: { type: GraphQLString },
                },
                resolve: async function (parent, args, {req, res}) {
                        console.log("Inside User View Reciept Click Mutation!");
                        globalOrderID = args.ordertime;
                        // console.log(user);
                        console.log('User Clicks Reciept!')
                        console.log(globalOrderID);
                        return globalOrderID;
                        }
                    },
            resOrderActions: {
                type: orderResType,
                args: {
                    order_status: { type: GraphQLString },
                    ordertime: { type: GraphQLString },
                },
                resolve: async function (parent, args, {req, res}) {
                        console.log("Inside Restaurant Order Processing Mutation!");
                        orders.findOneAndUpdate({ ordertime: args.ordertime}, 
                            { $set : 
                                {order_status: args.order_status}
                            }, { returnOriginal: false },
                            (err, documents) => {
                            if (err) {
                                throw err;
                            } else {
                                console.log("Restaurant changed the order status successfully!");
                                console.log(documents);
                                var retData = { order_status: documents.order_status, ordertime: documents.ordertime}
                                console.log(retData);
                                return retData;
                            }
                        });
                        }
                    },
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});