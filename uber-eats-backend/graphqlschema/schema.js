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

var globalSessionUemail;

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

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        userDeets: {
            type: userRegType,
            args: { email: { type: GraphQLString } },
            resolve: async function (parent, args, { req, res }) {
                console.log(req.session.uemail);
                console.log(globalSessionUemail);
                const user = await users.findOne({ email: globalSessionUemail })
                // console.log(user);
                if (user) {
                    console.log(user);
                    return user;
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
                    req.session.uemail = user.email;
                    globalSessionUemail = user.email;
                    req.session.isLoggedIn = true;
                    console.log(req.session.uemail);
                    console.log(req.session.isLoggedIn);

                    req.session.save();   
                    // const payload = { _id: user._id, name: user.email};
                    // console.log(payload);
                    // const tokenus = jwt.sign(payload, JWT_KEY, {
                    //     expiresIn: 1008000
                    // })
                    // let token = jwt.sign({email: user.email}, JWT_KEY);
                    res.status(200);
                    // res.end("Successful Login!");
                      }
                else {
                    throw new Error('Invalid credentials!')
                }
            }
        }

            }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});