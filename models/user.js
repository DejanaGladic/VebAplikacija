const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');

const config=require('../config/database');

//Sema
const UserSchema=mongoose.Schema({
    ime: {
        type:String
    },
    email:{
        type:String,
        require:true,
        unique: true        
    },
    brojTelefona:{
        type:String,
        required:true,
        unique: true
    },
    korisnickoIme:{
        type:String,
        require:true,
        unique: true        
    },
    lozinka:{
        type:String,
        require:true
    }
});

//eksportujemo model; ime modela, sema; nad tim modelom vrsimo fje baze podataka, ime kolekcije ce biti users!! jer se na ime modela dodaje s i pise se malim slovima
const User=module.exports=mongoose.model('User', UserSchema);

//postavljamo dve bazicne fje koje ce se koristiti; export da bi ostali mogli da ih koriste

//get korisnika preko id-a
module.exports.getUserById=function(id, callBack){ 
    User.findById(id, callBack);
};
//get korisnika preko imena
module.exports.getUserByUserName=function(korisnickoIme, callback){
    //objekat jer se tako prosledjuje upit bazi kad se trazi korisnik po odredjenom kriterijumu
    const query={ korisnickoIme : korisnickoIme };
    User.findOne(query, callback);
};
//dodavanje novog korisnika
module.exports.addUser=function(noviKorisnik, callBack){
    //hesovanje lozinke
    bcrypt.genSalt(10,function(err,salt){
        bcrypt.hash(noviKorisnik.lozinka,salt, function(err, hesovanaLozinka){
            if(err){
                throw err;
            }else{
                noviKorisnik.lozinka=hesovanaLozinka;
                //novi korisnik se cuva u bazi
                noviKorisnik.save(callBack);
            }
        });
    });
};

module.exports.comparePassword=function(lozinkaIzForme,stvarnaLozinkaPronadjenog, callback){
    bcrypt.compare(lozinkaIzForme,stvarnaLozinkaPronadjenog,function(err,podudaraSe){
        if(err){
            throw err;
        }else{
            //null znaci nem greske jer nasa callback fja u rutama prima ta dva parametra
            callback(null,podudaraSe);
        }
    });
};
