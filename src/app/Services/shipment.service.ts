import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseEntities } from '../Model/ResponseEntities.model';
import { environment } from '../../environments/environment';
import { Shipment } from '../Model/Entities/Shipment';
import { PrintingLT } from '../Model/Entities/PrintingLT';

@Injectable({
  providedIn: 'root'
})
export class ShipmentService {

  constructor(private _HttpClient: HttpClient) { }

  public GetInfoToShip(LotNo: string):  Promise<ResponseEntities<any[]>> {
    return this._HttpClient.get<any>(`${environment.apiUrl}Shipment/GetInfoToShip?LotNo=${LotNo}`)
    .toPromise()
    .then(data => <ResponseEntities<any[]>><unknown>data)
    .then(data => { return data; })
    .catch(error => { return error; });
  }

  public GetLastShipment(): Promise<ResponseEntities<Shipment>> {
    return this._HttpClient.get<any>(`${environment.apiUrl}Shipment/GetLastShipment`)
    .toPromise()
    .then(data => data)
    .then(data => { return data; })
    .catch(error => { return error; });
  }

  public GetlabelShipment(LotNo: string): Promise<ResponseEntities<PrintingLT>> {
    return this._HttpClient.get<any>(`${environment.apiUrl}PrintingLT/GetPrintingLTByLot?LotNo=${LotNo}`)
    .toPromise()
    .then(data => data)
    .then(data => { return data; })
    .catch(error => { return error; });
  }

  public SaveShipment(JsonShipment: string) {
    return this._HttpClient
    .get<any>(`${environment.apiUrl}Shipment/SaveShipment?JsonShipment=${JsonShipment}`)
    .toPromise()
    .then(data => { return data })
    .then(data => { return data })
    .catch(error => { return error });
    //return this._HttpClient.get<any>(`${environment.apiUrl}Shipment/SaveShipment?JsonShipment=${JsonShipment}`);
  }
}
