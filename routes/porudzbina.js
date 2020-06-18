const express=require('express');
const router=express.Router();

const passport=require('passport');
const jwt=require('jsonwebtoken');

//promenicemo model
const Porudz=require('../models/porudzbina');
const config=require('../config/database');

//ruta je porudzbina/poruciti
router.post('/poruciti',(req,res,next)=>{
    console.log('Postavljanje stavke');
    var stavka=new Porudz();
    stavka.korisnik=req.body.korisnik;
    stavka.stavke=req.body.stavke;
    stavka.cena=req.body.cena;
    stavka.datumIVreme=req.body.datumIVreme;
    Porudz.dodajStavku(stavka,(err, postavljenaStavka)=>{
        if(err){
            return res.json({success:false, msg: 'Neuspesno dodavanje porudzbine'});
        }else{
            return res.json(postavljenaStavka);               
        }
    });
});

router.get('/izlistati',passport.authenticate('jwt',{session:false}),(req,res,next)=>{
    Porudz.porudzbineUlogovanih(req.user,(err,listaP)=>{
        if(err){
            return res.json({success:false, msg: 'Neuspesno preuzimanje porudzbina'});
        }else{
            return res.json(listaP);
        }
    });
});

//brisanje
router.delete('/obrisati/:id', function(req,res,next){
    console.log('Brisanje');
    Porudz.obrisati(req.params.id,(err, obrisanaStavka)=>{
        if(err){
            return res.json({success:false, msg: 'Neuspesno brisanje stavke'});
        }else{
            return res.json(obrisanaStavka);               
        }
    });
});


module.exports=router;
