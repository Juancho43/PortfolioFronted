import { HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { Observable, finalize } from "rxjs";
import {LoadingService} from './loading.service';



const loadingService : LoadingService = new LoadingService;
export function loadingIntercept(req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> {
  loadingService.show();

  return next(req).pipe(
    finalize(() => {
      console.log("hola");
      loadingService.hide();
    })
  );
}
