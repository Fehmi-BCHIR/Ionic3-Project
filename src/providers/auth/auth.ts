import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Storage } from '@ionic/storage';
import {Observable} from "rxjs/Observable";

let apiUrl = "http://192.168.1.7:8080/upload";

@Injectable()
export class AuthProvider {
  path = 'http://localhost:3000/api/patient';
  baseUrl:any="http://localhost:3000";

  gouvernorat:any;
  specialite:any;
  longitude:any;
  latitude:any;
  _id:any;

  constructor(public http: HttpClient, public storage:Storage,public http2: Http) {
  }

  getrdv(){
    return this.http.get("http://localhost:3000/api/rdv/",{} )
  }

  ajoutrdv(idmedecin,idpatient,dateRdv,tempsRdv,jourRdv){
    return this.http.post("http://localhost:3000/api/rdv?dateRdv=" + dateRdv + "&tempsRdv=" + tempsRdv +
      "&jourRdv=" +jourRdv+ "&idmedecin=" + idmedecin +"&idpatient=" + idpatient,{} )
  }

  getmedecin(email) : Observable<any[]>{


      console.log(this.baseUrl+"/api/medecin/medecinemail?email="+email)
   // const myheaders =new HttpHeaders({'x-access-token':localStorage.getItem('user')})
    return this.http.get(this.baseUrl+"/api/medecin/medecinemail?email="+email/*,{headers:myheaders}*/)
  }

  getAllMedecin(){
    //const myheaders =new HttpHeaders({'x-access-token':localStorage.getItem('user')})
    return this.http.get(this.baseUrl+"/api/medecin/"/*,{headers:myheaders}*/)
  }

  getAllPharmacie(){
   //const myheaders =new HttpHeaders({'x-access-token':localStorage.getItem('user')})
    return this.http.get(this.baseUrl+"/api/pharmacie/"/*,{headers:myheaders}*/)
  }

  getProfils(id) {
    //const myheaders =new HttpHeaders({'x-access-token':localStorage.getItem('user')})
    return this.http.get("http://localhost:3000/api/patient/"+id/*,{headers:myheaders}*/)
  }

  updateProfils(id,nom,prenom,email,password,newpassword) {
    return this.http.put("http://localhost:3000/api/patient/" + id,  {"nom":nom ,"prenom": prenom,
      "email":email, "password":password , "newpassword":newpassword})

  }

  registerUser(nom,prenom,email,password,tel,sexe,dateNaissance,_id) {
    return this.http.post("http://localhost:3000/api/patient?nom=" + nom + "&prenom=" + prenom + "&email="+email+
      "&password=" + password + "&tel=" + tel + "&sexe=" + sexe + "&dateNaissance=" + dateNaissance + "&_id=" + _id, {})
  }

  loginUser(loginData) {
    return this.http.post<any>(this.path + '/loginpatient', loginData,)
  }

  registermedecin(gouvernorat, cnam, longitude , latitude , specialite ,adresse, _id){
    return this.http.post("http://localhost:3000/api/medecin?gouvernorat="+gouvernorat+"&cnam="+ cnam +
      "&longitude="+longitude+"&latitude="+latitude+"&specialite="+specialite+"&adresse="+adresse+"&_id="+_id , {})
  }

    getItem(){
      return this.storage.get("key")
  }

  setItem(item){
     this.storage.set("key", item)
  }

  //camera
  postData(credentials, type){

    return new Promise((resolve, reject) =>{
      let headers = new Headers();
      this.http2.post("http:localhost:8080/upload"+type, JSON.stringify(credentials), {headers: headers}).
      subscribe(res =>{
        resolve(res.json());
      }, (err) =>{
        reject(err);
      });

    });

  }

/*  getAllMaps(){
    const myheaders =new HttpHeaders({'x-access-token':localStorage.getItem('user')})
    return this.http.get("http://localhost:3000/api/medecin/",{headers:myheaders})
  }*/
}
