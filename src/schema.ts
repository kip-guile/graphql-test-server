const axios = require('axios')

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
} = require('graphql')

// const customers = [
//   { id: '1', name: 'John Doe', email: 'john@doe.com', age: 15 },
//   { id: '2', name: 'Steve Smith', email: 'ateve@smith.com', age: 15 },
//   { id: '3', name: 'Saraa Doe', email: 'sara@willy.com', age: 15 },
// ]

const CustomerType = new GraphQLObjectType({
  name: 'Customer',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    age: { type: GraphQLString },
  }),
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    customer: {
      type: CustomerType,
      args: {
        id: { type: GraphQLString },
      },
      resolve(parentValue: any, args: any) {
        // for (let i = 0; i < customers.length; i++) {
        //   if (customers[i].id == args.id) {
        //     return customers[i]
        //   }
        // }
        return axios
          .get('http://localhost:3000/customers/' + args.id)
          .then((res: any) => res.data)
      },
    },
    customers: {
      type: new GraphQLList(CustomerType),
      resolve(parentValue: any, args: any) {
        return axios
          .get('http://localhost:3000/customers/')
          .then((res: any) => res.data)
      },
    },
  },
})

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addCustomer: {
      type: CustomerType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve(parentValue: any, args: any) {
        return axios
          .post('http://localhost:3000/customers/', {
            name: args.name,
            email: args.email,
            age: args.age,
          })
          .then((res: any) => res.data)
      },
    },
    deleteCustomer: {
      type: CustomerType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parentValue: any, args: any) {
        return axios
          .delete('http://localhost:3000/customers/' + args.id)
          .then((res: any) => res.data)
      },
    },
    editCustomer: {
      type: CustomerType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        age: { type: GraphQLInt },
      },
      resolve(parentValue: any, args: any) {
        return axios
          .patch('http://localhost:3000/customers/' + args.id, args)
          .then((res: any) => res.data)
      },
    },
  },
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
})
