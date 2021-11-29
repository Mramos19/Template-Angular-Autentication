import { LoginRequest } from './../../../Model/Request/LoginRequest.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { AuthenticationService } from '../../../Services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  public _FormLogin: FormGroup = null;
  private _LoginRequest: LoginRequest = {};


  constructor(private _FormBuilder: FormBuilder, private _AutenticationService: AuthenticationService, private _Router: Router) {

    this._FormLogin = this._FormBuilder.group({

      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })


  }

  ngOnInit() {

    //this._MessageService.success('asdfadfaf', {Position: 'top', Title:'Testing'});
  }


  public onSubmit() {

    if (this._FormLogin.valid) {

      this._LoginRequest.userName = this._FormLogin.controls['userName'].value;
      this._LoginRequest.password = this._FormLogin.controls['password'].value;
      this._LoginRequest.applicationId = environment.applicationId;


      this._AutenticationService.Login(this._LoginRequest).then(_Response => {


        if (_Response.statusCode == "00") {

          this._AutenticationService.SetToken((_Response.token));
          this._Router.navigate(['Home']);

        } 
               
      }).catch(log => {

        console.log(log);

      });

    }
  }

}
