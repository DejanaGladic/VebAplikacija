const mongoose=require('mongoose');
const config=require('../config/database');

const semaHrane=mongoose.Schema({
    vrsta: {
        type:String
    },
    naziv: {
        type:String
    },
    cena:  {
        type:String
    },
    opis:  {
        type:String
    }
});


//model se naziva food , ime kolekcije ce biti foods
const Food=module.exports=mongoose.model('Food',semaHrane);

//get hrane
module.exports.getFood=function(callBack){ 
    Food.find(null,callBack);
};

//nepotrebna
module.exports.pronadjiIzmeni=function(id,setovaniPodaci,izmena,callBack){
    Food.findByIdAndUpdate(id,setovaniPodaci,izmena,callBack);
}

module.exports.obrisati=function(id,callBack){
    Food.findByIdAndRemove(id,callBack);
}

module.exports.izmeni=function(id,telo,nova,callBack){
    Food.updateOne(id,telo,nova,callBack);
}

module.exports.dodajStavku=function(stavka,callBack){
    Food.create(stavka,callBack);
}