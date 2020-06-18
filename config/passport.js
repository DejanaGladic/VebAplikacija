//sluzi za autentifikaciju i tokene
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const User=require('../models/user');
const config=require('../config/database')

//tokeni sluze za autorizaciju i dozvoljavaju odredjenom korisniku da pristupa odredjenim resursima

//preuzimaju se podaci o prijavljenom korisniku na osnovu autorizacije
module.exports=function(passport){
    let options = {};
    //preuzimamo token iz zaglavlja autorizacije
    options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    //tajne informacije
    options.secretOrKey = config.secret;
    //payload su podaci o prijavljenom korisniku-korisniku tokena
    passport.use(new JwtStrategy(options, function(jwt_payload, done) {
        //iz podataka o korisniku tokena preuzimamo id korisnika i trazimo ga u bazi
        User.getUserById(jwt_payload.data._id, function(err, user) {
            if (err) {
                //postoji greska
                return done(err, false);
            }
            if (user) {
                //pronadjen je korisnik
                return done(null, user);
            } else {
                //nema gresaka i nije pronadjen korisnik
                return done(null, false);
            }
        });
    }));
};

