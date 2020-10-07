const axios = require('axios');
const Users = require('./users');
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema, GraphQLList, GraphQLNonNull, } = require('graphql');
const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        _id: { type: GraphQLString },
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        createdAt: { type: GraphQLString },
        updatedAt: { type: GraphQLString },
    }),
});
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        users: {
            type: new GraphQLList(UserType),
            resolve(parentValue, args) {
                return Users.find({}).then((users) => users);
            },
        },
    },
});
const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: UserType,
            args: {
                username: { type: new GraphQLNonNull(GraphQLString) },
                email: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parentValue, args) {
                const newUser = new Users({
                    username: args.username,
                    email: args.email,
                });
                newUser.id = newUser._id;
                return newUser.save().then((user) => user);
            },
        },
        deleteUser: {
            type: UserType,
            args: {
                _id: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parentValue, args) {
                return Users.deleteOne({ _id: args._id }).then((res) => res);
            },
        },
        editUser: {
            type: UserType,
            args: {
                _id: { type: new GraphQLNonNull(GraphQLString) },
                username: { type: GraphQLString },
                email: { type: GraphQLString },
            },
            resolve(parentValue, args) {
                return Users.findOneAndUpdate({ _id: args._id }, {
                    $set: {
                        username: args.username,
                        email: args.email,
                    },
                }, { new: true }).then((res) => res);
            },
        },
    },
});
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation,
});
//# sourceMappingURL=schema.js.map