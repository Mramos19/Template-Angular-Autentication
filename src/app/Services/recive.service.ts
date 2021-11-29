import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ReciveShipment } from '../Model/Response/ReciveShipment';
import { ResponseEntities } from '../Model/ResponseEntities.model';

@Injectable({
  providedIn: 'root'
})
export class ReciveService {

  constructor(private _HttpClient: HttpClient) { }
  
  public SerchShipment(MohNum: string): Promise<ResponseEntities<ReciveShipment[]>> {
    return this._HttpClient.get<any>(`${environment.apiUrl}Shipment/SearchShipment?ShipNo=${MohNum}`)
    .toPromise()
    .then(data => <ResponseEntities<ReciveShipment[]>>data)
    .then(data => { return data; })
    .catch(error => { return error; });
  }

  public InsertScan(Shipment: ReciveShipment[]) {
    return this._HttpClient.post<any>(`${environment.apiUrl}Shipment/InsertScan`, Shipment);
  }
}