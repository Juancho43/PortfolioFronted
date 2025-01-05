import { Injectable } from '@angular/core';
import {Profile} from '../interfaces/Profile';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  private _token : boolean = false;

  get token(): boolean {
    return this._token;
  }

  // login(profile : Profile){
  //   if("bravojuan@gmail.com" == profile.email && "pepe" == profile.password){
  //     this._token = true;
  //     console.log("tol")
  //   }
  // }

  logout(){
    this._token = false;
  }
}
