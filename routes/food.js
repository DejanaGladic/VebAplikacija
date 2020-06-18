const express=require('express');
const router=express.Router();

const Food=require('../models/food');
const config=require('../config/database');


//ruta je food/jelovnik
router.get('/jelovnik',(req,res,next)=>{
    Food.getFood((err,hrana)=>{
        if(err){
            return res.json({success:false, msg: 'Neuspesno preuzimanje jelovnika'});
        }else{
            return res.json(hrana);
                
        }
    });
});

//izmena
router.put('/jelovnik/:id', function(req, res, next){
    console.log('Menjanje stavke');
    Food.izmeni({_id:req.params.id},
        //req.body.something ono poslato kao body zahteva
        { $set: {vrsta: req.body.vrsta, naziv: req.body.naziv, cena: req.body.cena, opis:req.body.opis}},
        { new:true},

        (err, izmenjenaStavka)=>{
            if(err){
                return res.json({success:false, msg: 'Neuspesna izmena stavke'});
            }else{
                return res.json(izmenjenaStavka);               
            }
        });
    
});


//brisanje
router.delete('/jelovnik/:id', function(req,res,next){
    console.log('Brisanje');
    Food.obrisati(req.params.id,(err, obrisanaStavka)=>{
        if(err){
            return res.json({success:false, msg: 'Neuspesno brisanje stavke'});
        }else{
            return res.json(obrisanaStavka);               
        }
    });
});

//postavljanje 
router.post('/jelovnik/novaStavka', function(req,res,next){
    console.log('Postavljanje stavke');
    var stavka=new Food();
    stavka.vrsta=req.body.vrsta;
    stavka.naziv=req.body.naziv;
    stavka.cena=req.body.cena;
    stavka.opis=req.body.opis;
    Food.dodajStavku(stavka,(err, postavljenaStavka)=>{
        if(err){
            return res.json({success:false, msg: 'Neuspesno dodavanje stavke'});
        }else{
            return res.json(postavljenaStavka);               
        }
    });
});



module.exports=router;