import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, Observable, of, throwError } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class HttpErrorInterceptorService implements HttpInterceptor{

    constructor(private router: Router){

    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                if(error.status === 404){
                    this.router.navigate(['/404']);
                    return of();
                }
                if(error.status === 401){
                    this.router.navigate(['/401']);
                    return of();
                }
                return throwError(() => {});
            })
        );
    }

    handleErrors(error: any, request: HttpRequest<any>, next: HttpHandler){
        if(error.status === 404){
            this.router.navigate(['/404']);
        }
        return of();
    }
    
}