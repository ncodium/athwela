import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { HttpErrorModalComponent } from '../components/shared/http-error-modal/http-error-modal.component'

export class HttpErrorInterceptor implements HttpInterceptor {
  bsModalRef: BsModalRef;
  constructor(private modalService: BsModalService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        retry(1),
        catchError((error: HttpErrorResponse) => {
          let errorMessage = '';
          if (error.error instanceof ErrorEvent)
            errorMessage = `Error: ${error.error.message}` // client-side error
          else
            errorMessage = `<b>Error ${error.status} occured.</b> ${error.message}`; // server-side error

          const initialState = {
            text: errorMessage,
            title: 'Internal server error'
          };

          this.bsModalRef = this.modalService.show(HttpErrorModalComponent, { initialState });
          return throwError(error.message);
        })
      )
  }
}
