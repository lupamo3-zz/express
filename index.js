
const express = require('express'),
    app = express(),
    bodyParser = require('body-parser');
    port = process.env.PORT || 3000;


const sql = require('./app/model/db.js');
const jwt  =  require('jsonwebtoken');
const bcrypt  =  require('bcryptjs'); 
const SECRET_KEY = "secretkey23456";

app.listen(port, () => console.log(`Server listening on port ${port}!`))

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

var routes = require('./app/routes/approutes'); //importing route
routes(app); //register the route

const findUser = (email, result) => {
    return sql.query("SELECT * FROM personnel WHERE personnel_email = ?", email, function (err, res){
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);
      
        }
    });
};

const createUser = (user, result) => {
    return sql.query("INSERT INTO personnel (personnel_onames, personnel_email, personnel_phone, personnel_fname, personnel_password) VALUES (?,?,?,?,?)", user, function(err, res){
        console.log(sql, "sql")
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });
};

app.post('/register',  (req, res) => {
    const onames = req.body.onames;
    const email = req.body.email;
    const phone = req.body.phone;
    const fname = req.body.fname;
    const password = bcrypt.hashSync(req.body.password);

    createUser([onames, fname, email, phone, password], (err)=>{
        if (err) return res.status(500).send("server error");
        findUser(email, (err, user)=>{
           if (err) return  res.status(500).send('Server error!');  
           const  expiresIn  =  24  *  60  *  60;
           const  accessToken  =  jwt.sign({ id:  user.id }, SECRET_KEY, {
               expiresIn:  expiresIn
           });
           res.status(200).send({"user": user, "accessToken": accessToken, "expires_in":  expiresIn
        }); 
        });
    });
});


app.post('/login', (req, res) => {
    const  email  =  req.body.email;
    const  password  =  req.body.password;
    findUser(email, (err, user)=>{
        if (err) return  res.status(500).send('Server error!');
        if (!user) return  res.status(404).send('User not found!');
        const  result  =  bcrypt.compareSync(password, user.password);
        if(!result) return  res.status(401).send('Password not valid!');

        const  expiresIn  =  24  *  60  *  60;
        const  accessToken  =  jwt.sign({ id:  user.id }, SECRET_KEY, {
            expiresIn:  expiresIn
        });
        res.status(200).send({ "user":  user, "access_token":  accessToken, "expires_in":  expiresIn});
    });
});