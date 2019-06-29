const express = require('express'),
    app = express(),
    bodyParser = require('body-parser');
    port = process.env.PORT || 3000;

const mysql = require('mysql');
// connection configurations
const mc = mysql.createConnection({
    host: 'localhost',
    user : 'root',
    password: '123456',
    database : 'nanyukidb'
})

//connect to database
mc.connect();

app.listen(port, () => console.log(`Server listening on port ${port}!`))

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

var routes = require('./app/routes/approutes'); //importing route
routes(app); //register the route

