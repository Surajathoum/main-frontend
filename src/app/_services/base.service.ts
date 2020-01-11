import {HttpClient, HttpEvent, HttpHeaders, HttpParams, HttpResponse, HttpErrorResponse, HttpEventType} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {map, catchError, retry} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';

interface NetaResponse {
  status: any;
  msg: any;
}

@Injectable({providedIn: 'root'})
export class BaseRequestService {
  countryWiseTax: any = {};
  currentDomain: any;
  houmObj: any = {};
  currentSite: any; currentCompany: any;
  companyId = '5c8f1d594e3a5b2289efc3da';
  resources = {};
  overlayLoadingTemplate =
    '<span class="">' +
    '<i class="fa fa-spinner fa-spin"></i> Please wait while your rows are loading</span>';
  constructor(readonly httpClient: HttpClient) {
    this.getResourcesData();
  }

  public upload(url, data) {
    return this.httpClient.post<any>(url, data, {
      reportProgress: true,
      observe: 'events'
    }).pipe(map((event) => {
      switch (event.type) {
        case HttpEventType.UploadProgress:
          const progress = Math.round(100 * event.loaded / event.total);
          return { status: 'progress', message: progress };
        case HttpEventType.Response:
          return event.body;
        default:
          return `Unhandled event: ${event.type}`;
      }
    })
    );
  }

  public getResourcesData() {
    this.resources = {};
    /*this.httpClient.get('./assets/text/en-US/strings.json').subscribe(data => {
      this.resources = {};
    });*/
  }
  public setCurrentCompany (companyId) {
    this.companyId = companyId;
  }
  public nonce () {
      let val = '';
      const hex = 'abcdefghijklmnopqrstuvwxyz0123456789';
      for (let i = 0; i < 16; i++) { val += hex.charAt(Math.floor(Math.random() * hex.length)); }
      return val;
  }

  public unsafePublish(topic: string, message: string): void {
    // this._mqttService.unsafePublish(topic, message, {qos: 0, retain: false});
  }

  toHttpParams(obj) {
    const params = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const val = obj[key];
        if (val !== null && val !== undefined) {
          if (typeof val === 'object') {
            params[key] = JSON.stringify(val);
          } else {
            params[key] = val.toString();
          }
        }
      }
    }
    return params;
  }

  deleteRequest(endPointUrl: string) {
    return this.httpClient.delete<NetaResponse>(`${endPointUrl}`).pipe(map(response => this.handleResponse(response)));
  }

  doRequest(endPointUrl: string,
            method: string,
            data?: any,
            params?: any,
            headers?: HttpHeaders, hashOptions?: any) {
    const httpOptions = {
      headers: headers
        ? headers
        : new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      body: JSON.stringify(data),
      params: params,
    };
    if (params) {
      httpOptions.params = new HttpParams({
          fromObject: this.toHttpParams(params)
        }
      );
    }
    httpOptions.headers['hashOptions'] = hashOptions ? hashOptions : {isLoading: false};
    return this.httpClient
      .request<NetaResponse>(method, `${endPointUrl}`, httpOptions)
      .pipe(
        map(response => this.handleResponse(response))
      );
  }
  getSnakeCaseName(camelCase) {
      return camelCase.replace( /([A-Z])/g, '_$1').toLowerCase().replace(/^_(.*)/g, '$1');
  }

  private handleResponse(response: NetaResponse) {
    return response;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }
}
