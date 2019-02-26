import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
              private router : Router,
              private title : Title) { }

  ngOnInit() {
    this.title.setTitle('Money-API Login');// serviço do angular que injeta o titulo na pagina.
  }

  login(usuario : string, senha : string){
    this.authService.login(usuario, senha).subscribe(
      data =>{
        this.authService.armazenarToken(JSON.parse(JSON.stringify(data.access_token)));//repassado o token vindo da api. Embora ja me retorna um objeto json eu vo reconverter so por segurança
        this.router.navigate(['/lancamentos']);
      },
      error =>{
        if(error.status === 400){ // verifico se o erro é status 400 badRequest
          if(error.error.error === 'invalid_grant'){// verifica se o tipo do erro é invalid_grant - erro de usuario ou senha
            return this.errorHandler.handle('Usuario ou senha Invalida'); // Retorna um usuario ou senha invalida
          }
        }
        return this.errorHandler.handle(error);
      }
    );
  }

}
