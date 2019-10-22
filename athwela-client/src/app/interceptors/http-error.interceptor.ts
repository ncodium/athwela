import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
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
          if (error.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = `Error: ${error.error.message}`;
          } else {
            // server-side error
            errorMessage = `<b>Error ${error.status} occured.</b> ${error.message}`;
          }

          const initialState = {
            text: errorMessage,
            title: 'Internal server error'
          };

          this.bsModalRef = this.modalService.show(HttpErrorModalComponent, { initialState });
          this.bsModalRef.content.closeBtnName = 'Close';
          return throwError(error.message);
        })
      )
  }
}
