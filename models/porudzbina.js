const mongoose=require('mongoose');
const config=require('../config/database');

const semaPorudzbine=mongoose.Schema({
    korisnik: {
        type:Object
    },
    stavke: {
        type:String
    },
    cena:  {
        type:String
    },
    datumIVreme:  {
        type:String
    }

});


//model se naziva Porudzbina , ime kolekcije ce biti porudzbinas ja mislim
const Porudzbina=module.exports=mongoose.model('Porudzbina',semaPorudzbine);

module.exports.porudzbineUlogovanih=function(korisnik,callBack){
    if(korisnik.korisnickoIme=='dejanaGladic')
    {
        Porudzbina.find(null,callBack);        
    }
    else{
        const query={ "korisnik.korisnickoIme" : korisnik.korisnickoIme };
        Porudzbina.find(query,callBack); 
    }
       
};

module.exports.obrisati=function(id,callBack){
    Porudzbina.findByIdAndRemove(id,callBack);
}

module.exports.dodajStavku=function(stavka,callBack){
    Porudzbina.create(stavka,callBack);
}