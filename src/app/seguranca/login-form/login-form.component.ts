import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { AuthService } from './../auth.service';
import { ErrorHandlerService } from './../../core/error-handler.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  constructor(private authService : AuthService,
              private errorHandler : ErrorHandlerService,
              private title : Title) { }

  ngOnInit() {
    this.title.setTitle('Money-API Login');// serviço do angular que injeta o titulo na pagina.
  }

  login(usuario : string, senha : string){
    this.authService.login(usuario, senha).subscribe(
      data =>{
        console.log(data);
      },
      error =>{
        this.errorHandler.handle(error);
      }
    );
  }

}
