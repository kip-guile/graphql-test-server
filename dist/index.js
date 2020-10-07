const express = require('express');
const mongoose = require('mongoose');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema.js');
const app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true,
}));
mongoose
    .connect('mongodb://127.0.0.1:27018/graphql', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
})
    .then((conn) => console.log(`MongoDB plugged in just fine: ${conn.connection.host}`))
    .catch((err) => console.log(err));
app.listen(4000, () => {
    console.log('Server is running on port 4000...');
});
//# sourceMappingURL=index.js.map