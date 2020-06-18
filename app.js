const express=require('express');
const path=require('path');
//parsira body iz request-a
const bodyParser=require('body-parser');
//prima zahteve sa bilo kog domenskog imena; tj npr sabilo kog porta
const cors=require('cors');
const passport=require('passport');


const mongoose=require('mongoose');
const config=require('./config/database');
mongoose.connect(config.database,{ useNewUrlParser: true });
mongoose.connection.on('connected',function(){
    console.log('Connected to database: '+config.database);
});//poruka kad se konektuje
mongoose.connection.on('error',function(err){
    console.log('Database error: '+err);
});//poruka kad se desi eror

const app=express();

const users=require('./routes/users');
const food=require('./routes/food');
const porudzbina=require('./routes/porudzbina');


const port=3000;

//CORS middleware
app.use(cors());
/*ovo bi bila zamena za cors
  app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});*/

//setujemo static fajl gde ce se nalaziti sav angular kod
app.use(express.static(path.join(__dirname, 'public')));

//Body Parser Middleware
app.use(bodyParser.json());
//Passport; okruzenje za autentifikaciju
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);


//rute sa localhost:3000/users/something
app.use('/users', users);
app.use('/food', food);
app.use('/porudzbina', porudzbina);



//jedna ruta ka homepage; Index Route; tj index.html, da li to sluzi necemu??
app.get('/', function(req,res){
    res.send('Invalid endpoint');
});
app.get('*', function(req,res){
    res.sendFile(path.join(__dirname,'public/index.html'));
});

app.listen(port,()=>{
    console.log('Server started on port'+port);
});