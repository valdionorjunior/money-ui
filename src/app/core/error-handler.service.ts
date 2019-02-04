import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private toastrService: ToastrService) { }

  handle(errorResponse: any){
    let msg: string;

    if(typeof errorResponse === 'string'){
      msg = errorResponse;

    }else if(errorResponse instanceof HttpErrorResponse 
      && errorResponse.status >=400 && errorResponse.status <=499){
      let errors;
      // alert(JSON.stringify(errorResponse.error[0].mensagemUsuario));
      msg = 'Ocorreu um erro ao processar a sua solicitação';

      try {
        errors = JSON.parse(JSON.stringify(errorResponse));

        msg = errors.error[0].mensagemUsuario;
      } catch (e) { }

      console.error('Ocorreu um erro', errorResponse);

  
    }else{
      msg = 'Erro ao processar serviço remoto. Tente novamente.';
      console.log('Ocorreu um erro: ', errorResponse);
    }

    this.toastrService.error(msg);
  }

}