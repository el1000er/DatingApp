import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { AccountService } from '../_Services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
model:any={}

//loggedIn:boolean;

//in order to access this server from the template
//to use to get current user, we have to make this public
  constructor(public accountService:AccountService,
    private router:Router,
    private toastr:ToastrService) { }

  ngOnInit(): void {
   // this.getCurrentUser();
  }

  login(){
    this.accountService.login(this.model).subscribe(response=>{
      this.router.navigateByUrl('/members');
     // this.loggedIn=true;
    },error=>{
      console.log(error);
      this.toastr.error(error.error);
    });
  }
  logout(){
    this.accountService.logout();
   // this.loggedIn=false;
   this.router.navigateByUrl('/');
  }

  //We wont be using this method as here we are not subscribed to an http request,
  //then we never unsuscribe (http request unsuscribe ofter they return(I think, check))

  // getCurrentUser(){
  //   this.accountService.currentUser$.subscribe(user=>{
  //     // !! converts an object to boolean
  //     //if null this means false, if user is something then true
  //     this.loggedIn=!!user;
  //   },error=>{console.log(error)});
  // }

}


