import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import {map} from 'rxjs/operators';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
baseUrl ='https://localhost:5001/api/';

//Create an observable to store the user
//ReplySubject is like a buffer object, store values inside and any time
//a subscriber subscribes to it, it will return the last value inside  it or however many values inside it we want to emit
// (1) size of the buffer, how many versions of the current user we want to store
private currentUserSource = new ReplaySubject<User>(1);

//By convention if this is an observable we use $ at the end
currentUser$= this.currentUserSource.asObservable();

  constructor(private http:HttpClient) { }

  login(model:any){
    return this.http.post(this.baseUrl+'account/login',model).pipe(
      map((response:User)=>{
        const user=response;
        if(user){
          localStorage.setItem('user',JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      })
    )
  }

  register(model:any){
    return this.http.post(this.baseUrl+'account/register',model).pipe(
     map((user:User)=>{
       if(user){
         localStorage.setItem('user',JSON.stringify(user));
         this.currentUserSource.next(user);
       }
      //  return user;
     })
    )
  }


//Helper method to set current user
setCurrentUser(user:User)
{
  this.currentUserSource.next(user);
}

  logout(){
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }
}
