import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { JwtModule } from '@auth0/angular-jwt';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { ButtonModule } from 'primeng/components/button/button';

import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { SegurancaRoutingModule } from './seguranca-routing.module';
import { LoginFormComponent } from './login-form/login-form.component';

export function tokenGetter() {
      return localStorage.getItem('access_token');
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    JwtModule.forRoot({
      config: {
        tokenGetter:tokenGetter,
        // whitelistedDomains: ['localhost:8080'],
        blacklistedRoutes : ['localhost:8080/api/auth']
      }
    }),
    InputTextModule,
    ButtonModule,

    SegurancaRoutingModule
  ],
  declarations: [LoginFormComponent],
  providers:[
    // AuthService,
    AuthGuard,
  ]
})
export class SegurancaModule { }