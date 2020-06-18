//sve users rute
const express=require('express');
const router=express.Router();
const passport=require('passport');
const jwt=require('jsonwebtoken');

const User=require('../models/user');
const config=require('../config/database');

//REGISTER; ruta je users/register!
//res.send salje odg tj ovaj string na ovu putanju i onda se to prikazuje u browseru
router.post('/register',(req,res,next)=>{
    let noviKorisnik=new User({
        //preuzima se iz forme
        ime:req.body.ime,
        email:req.body.email,
        brojTelefona:req.body.brojTelefona,
        korisnickoIme:req.body.korisnickoIme,
        lozinka:req.body.lozinka
    });

    User.addUser(noviKorisnik,(err,korisnik)=>{
        if(err){
            if (err.name === 'MongoError' && err.code === 11000)//mongodb greska
               return res.json({success:false, msg: 'Korisnik vec postoji'});
            else 
             return res.json({success:false, msg: 'Neuspesno registrovanje korisnika'});
        }else{
            return res.json({success:true, msg: 'Korisnik je uspesno registrovan'});
        }
    });
});

//AUTENTIFIKACIJA-logovanje
router.post('/authenticate',function(req,res,next){
    //podaci iz submitovane forme
    const korisnickoIme=req.body.korisnickoIme;
    const lozinka=req.body.lozinka;

    User.getUserByUserName(korisnickoIme,function(err,user){
        if(err){
            throw err;
        }
        if(!user){
            return res.json({success:false, msg: 'Korisnik nije pronadjen'}); 
        }


        //ako korisnik postoji proveri lozinku
        User.comparePassword(lozinka,user.lozinka,function(err, podudaraSe){
            if(err){
                throw err;
            }

            if(podudaraSe){
                
                //pravimo token registrovanog korisnika i upisujemo korisnika u tajne informacije
                const token = jwt.sign({data:user},config.secret, {expiresIn: 604800});
                //vraca se odgovor korisniku app
                return res.json({
                    token:'Bearer '+token,
                    //podaci o korisniku koje smo dobili kad smo potrazili podatke u bazi na osnovu korisnickog imena; to radimo sa novim objektom jer ne zelimo da prosledimo lozinku
                    user: {
                        id:user._id,
                        ime:user.ime,
                        korisnickoIme:user.korisnickoIme,   
                        brojTelefona:user.brojTelefona,                     
                        email:user.email                                                                        
                    }
                });
            }
            //ako se ne podudara
            else{
                return res.json({success:false, msg: 'Pogresna lozinka'}); 
            }
        });
    });
});

//PROFIl;ako zelimo da zastitimo rutu postavimo ovo za drugi parametar
//potreban nam je token da bi neko video profile!
router.get('/profile',passport.authenticate('jwt',{session:false}),function(req,res,next){
    return res.json({user:req.user});
});

module.exports=router;