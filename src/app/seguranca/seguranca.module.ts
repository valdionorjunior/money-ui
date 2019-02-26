import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { ButtonModule } from 'primeng/components/button/button';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';

import { SegurancaRoutingModule } from './seguranca-routing.module';
import { LoginFormComponent } from './login-form/login-form.component';
import { AuthService } from './auth.service';

// export function jwtOptionsFactory(authService) {
//   return {
//     tokenGetter: () => {
//       return localStorage.getItem('access_token');
//     }
//   }
// }

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    InputTextModule,
    ButtonModule,

    SegurancaRoutingModule,

    // JwtModule.forRoot({
    //   jwtOptionsProvider: {
    //     provide: JWT_OPTIONS,
    //     useFactory: jwtOptionsFactory,
    //     deps: [AuthService]
    //   }
    // })
  ],
  declarations: [LoginFormComponent],
  providers:[
    // AuthService,
  ]
})
export class SegurancaModule { }