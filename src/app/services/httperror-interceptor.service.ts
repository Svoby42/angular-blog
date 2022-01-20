import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, Observable, throwError } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class HttpErrorInterceptorService implements HttpInterceptor{

    constructor(private router: Router){

    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log("HTTP Request started");
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                if(error.status == 404){
                    this.router.navigate(['/404']);
                }
                if(error.status == 401){
                    this.router.navigate(['/401']);
                }
                console.log(error.status);
                return throwError(() => error);
            })
        );
    }
    
}