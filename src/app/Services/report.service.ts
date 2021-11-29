import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private _HttpClient: HttpClient) { }


  public GetProductionByLot() {
    return this._HttpClient.get<any>(`${environment.apiUrl}DoneTable/GetAll`);
  }

}
