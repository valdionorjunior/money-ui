import { Component, OnInit } from '@angular/core';

import { ErrorHandlerService } from './../error-handler.service';
import { AuthService } from './../../seguranca/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  exibindoMenu = false;

  constructor(private authService : AuthService,
              private errorHandler : ErrorHandlerService) { }

  ngOnInit() {
  }

  // criarNovoAccessToken(){
  //   this.authService.obterNovoAccessToken().subscribe(
  //     data =>{
  //       alert('Entro nessa bagaça!');
  //       this.authService.armazenarToken(JSON.parse(JSON.stringify(data.access_token)));//repassado o token vindo da api. Embora ja me retorna um objeto json eu vo reconverter so por segurança
  //     },
  //     error =>{
  //       return this.errorHandler.handle('Erro ao criar novo access token!');
  //     }
  //   );
  // }

}
