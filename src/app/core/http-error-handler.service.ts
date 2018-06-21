import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { NotifyService } from './notify.service';
interface Result {
    status?: number,
    success?: boolean,
    data?: Array<any>[],
    message?: string
}
/** Type of the handleError function returned by HttpErrorHandler.createHandleError */
export type HandleError =
    <T> (operation?: string, result?: Result) => (error: HttpErrorResponse) => Observable<Result>;

/** Handles HttpClient errors */
@Injectable()
export class HttpErrorHandler {
    constructor(private messageService: NotifyService) { }

    /** Create curried handleError function that already knows the service name */
    createHandleError = (serviceName = '') => <T>
        (operation = 'operation', result = {} as Result) => this.handleError(serviceName, operation, result);

    /**
     * Returns a function that handles Http operation failures.
     * This error handler lets the app continue to run as if no error occurred.
     * @param serviceName = name of the data service that attempted the operation
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    handleError<T>(serviceName = '', operation = 'operation', result = {} as Result) {

        return (error: HttpErrorResponse): Observable<Result> => {
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead
           /// TODO:check the errror obj for error event ---error.error.message :
            const message = (error.error instanceof ErrorEvent) ?
                error.error.message :
                `server returned code ${error.error.message} with body "${error.error.message}"`;

            // TODO: better job of transforming error for user consumption
            this.messageService.update(`${serviceName}: ${operation} failed: ${message}`, 'error');
             result.data = error.error.data;
             result.success = error.error.message;
             result.status = error.error.status;
             result.success = error.error.success;
            // Let the app keep running by returning a safe result.
            return Observable.of(result);
        };

    }
}


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/