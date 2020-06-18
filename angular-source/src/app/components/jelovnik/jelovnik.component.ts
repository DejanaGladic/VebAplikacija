import { Component, OnInit } from '@angular/core';
import { JelovnikService } from '../../services/jelovnik.service';
import {Router} from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { PorudzbinaService } from '../../services/porudzbina.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ValidateService } from '../../services/validate.service';



@Component({
  selector: 'app-jelovnik',
  templateUrl: './jelovnik.component.html',
  styleUrls: ['./jelovnik.component.css']
})
export class JelovnikComponent implements OnInit {

  listaHrane:any;
  private sakrijNovuStavku: boolean=true;

  trentnaPorudzbina:string="";
  trentnaCena:number=0;
  cena:string="";
  krajnjaCena:string;


  constructor(
    private jelovnikS: JelovnikService,
    private router: Router,
    private auth: AuthService,
    private porudzbinaS: PorudzbinaService,
    private messages: FlashMessagesService,
    private validation: ValidateService,    
                
  ) { }

  ngOnInit() {
    this.jelovnikS.getJelovnik().subscribe(poslatJelovnik =>this.listaHrane=poslatJelovnik);
  }

   //handler za dogadjaj klika na stavku u listi
   public odabranaStavka:any;
   odabratiStavku(stavka:any){
     this.odabranaStavka=stavka;
     this.sakrijNovuStavku=true;
     //u objektu odabrana stavka bice informacije sve iz baze o toj stavci
     console.log(this.odabranaStavka);
   }

  
  izmeniStavku(stavka:any){
    this.jelovnikS.izmeniStavku(stavka)
      .subscribe(izmenjenaStavka => {stavka=izmenjenaStavka},
        err=>{
          console.log(err);
          return false;
        });
    this.odabranaStavka=null;
  }

  obrisiStavku(stavka:any){
    let jelovnik=this.listaHrane;
    this.jelovnikS.obrisiStavku(stavka)
      .subscribe(obrisanaStavka=>{
        for(let i=0; i<jelovnik.length; i++)
        {
          if(jelovnik[i]._id===stavka._id)
          {
            //obrisati od indexa i ukljucujuci njega 1 element
            jelovnik.splice(i,1);
          }        
        }
      },
      err=>{
        console.log(err);
        return false;
      });
      this.odabranaStavka=null;
  }

  //kada se submituje forma
  //znamo gde se koja vrednost ubacuje zbog name
  dodajStavku(stavka:any){
    if(!this.validation.validateNewFood(stavka)){
      this.messages.show("Popunite naziv, vrstu, cenu!", {cssClass:'alert-info', timeout:5000});
      return false;
    }

    this.jelovnikS.dodajStavku(stavka)
    //subscribujemo odg od servisa; 
      .subscribe(novaStavka=>{
          this.listaHrane.push(stavka);
          this.sakrijNovuStavku=true;
          //this.odabranaStavka=novaStavka;
      },
      err=>{
        console.log(err);
        return false;
      });

  }

  novaStavka(){
    this.sakrijNovuStavku=false;
  }

  nazadSelektovanaStavka(){
    this.odabranaStavka=null;
  }

  nazadNovaStavka(){
    this.sakrijNovuStavku=true;
    this.odabranaStavka=null;    
  }

  dodajUKorpu(stavka:any){
    this.trentnaPorudzbina=this.trentnaPorudzbina+stavka.naziv+" ";
    this.cena="";
    for(let i=0; i<stavka.cena.length; i++)
    {
      for(let j=0; j<10; j++){       
        if(stavka.cena[i]==j){
          this.cena=this.cena+stavka.cena[i];
        }
        else
          continue;          
      }
                
    }    

    console.log(this.trentnaPorudzbina);         
    console.log(this.cena);    
    
    
    this.trentnaCena+=parseInt(this.cena);
    console.log(this.trentnaCena);
    this.krajnjaCena=this.trentnaCena.toString();
    
  }



  korisnik=this.auth.loggedIn();
  vracenaPorudzbina:any;

  poruci(){

    if(this.trentnaPorudzbina==""){
      this.messages.show("Ne postoji nista u korpi!", {cssClass:'alert-info', timeout:5000});      
      return false;
    }
    const date=new Date();
    const stavka={
      korisnik:this.korisnik,
      stavke:this.trentnaPorudzbina,
      cena:this.krajnjaCena,
      datumIVreme:(date.getDay()+1)+"/"+(date.getMonth()+1)+"/"+date.getFullYear()+" "+date.getHours()+":"+date.getMinutes()

    }
    var potvrda=confirm("Vasa porudzbina: "+stavka.stavke+", cena: "+stavka.cena+"rsd");
    if(potvrda){
      this.porudzbinaS.dodajStavku(stavka)
        .subscribe(vraceno=>{
          this.vracenaPorudzbina=vraceno;
          this.messages.show("Porudzbina je potvrdjena!", {cssClass:'alert-success', timeout:1500}); 
        },
        err=>{
          console.log(err);
          return false;
        });
      
    }           
    else
      this.messages.show("Odustali ste od porucivanja!", {cssClass:'alert-info', timeout:1500});


      this.trentnaPorudzbina="";
      this.trentnaCena=0;
      this.cena="";
      this.krajnjaCena="";
    
  }


}
