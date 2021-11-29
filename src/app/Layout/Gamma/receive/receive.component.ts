import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ReciveShipment } from '../../../Model/Response/ReciveShipment';
import { ReciveService } from '../../../Services/recive.service';
import { ColDef } from 'ag-grid-community';
import { MessageService } from '../../../@pages/components/message/message.service';
import { AuthenticationService } from  '../../../Services/authentication.service';
import { UserEntities } from '../../../Model/Entities/UserEntities.model';

//Ag Grid
import 'ag-grid-enterprise';
@Component({
  selector: 'app-receive',
  templateUrl: './receive.component.html',
  styleUrls: ['./receive.component.scss'],
  providers: [MessageService]
})

export class ReceiveComponent implements OnInit {
  public gridApi;
  public gridColumApi;
  public _ColumnDef: ColDef[];
  public _DefaultColDef: ColDef;
  public _gridOptions;
  public _LstRecive: ReciveShipment[] = [];
  public _UserEntities: UserEntities;
  public _UserId: number = 0;
  public _Loading = false;

  /* View Childs */
  @ViewChild('ShipNumber', { static: false }) ShipNumber: ElementRef;

  constructor (
    private _ReciveService: ReciveService, 
    private _MessageService: MessageService,
    private _Autentication: AuthenticationService
    ) {
    /* Columns Def */
    this._DefaultColDef = {
      flex: 1,
      resizable: true,
      sortable: true,
      filter: true,
      suppressMenu: true,
      menuTabs: ['filterMenuTab'],
      floatingFilter: true,
      floatingFilterComponentParams: { suppressFilterButton: true },
      cellStyle: { 'text-align': 'center' }
    };

    this._ColumnDef = [
      { field: 'prodCode', headerName: 'Item', filter: 'agTextColumnFilter', cellStyle: { 'text-align': 'left' } },
      { field: 'lotNum', headerName: 'Lot', filter: 'agTextColumnFilter' },
      { field: 'noShip', headerName: 'Ship', filter: 'agTextColumnFilter' },
      { field: 'plNica', headerName: 'Pl Nica', filter: 'agTextColumnFilter' },
      { field: 'qty', headerName: 'Sent Gamma', filter: 'agTextColumnFilter', maxWidth: 150, cellStyle: { 'text-align': 'right' } }
    ];
  }

  /****** Page Event's ******/
  ngOnInit() {
    this.loadUserInfo();
  }
  
  onGetShipment() {
    this.loadReciveData()
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumApi = params.columnApi;
  }

  onkeyupShipNumber(event) {
    let ShipNum: string = this.ShipNumber.nativeElement.value;
    if (ShipNum.trim() === "") {
      this._LstRecive = [];
    }
  }

  /****** Methods ******/
loadUserInfo() {
  this._Autentication.GetUser().then(data => {
    this._UserEntities = data.result;
    this._UserId = this._UserEntities.userId;
  }).catch(error => {
    this._UserId = 0;
  })
}

  loadReciveData() {
    let ShipNum: string = this.ShipNumber.nativeElement.value;
    if (ShipNum.trim() !== "") {
      this._Loading = true;
      this._ReciveService.SerchShipment(ShipNum)
        .then(data => {
          if (data.statusCode === "00") {
            this._LstRecive = data.result;
            this.displayMessage(data.statusCode, `Load ${data.result.length} items sucessfully`);
          }
          else {
            this.displayMessage('05', data.message);
          }
        });
    } else if (ShipNum.trim() === "") {
      this._LstRecive = [];
    }
  }

  reciveShipment() {
    this._Loading = true;
    let ShipNum: string = this.ShipNumber.nativeElement.value;

    if(this._UserId === 0) {
      this.displayMessage('04', 'Unable to obtain user data');
      this._Loading = false;
      return;
    }

    this._ReciveService.InsertScan(this._LstRecive).subscribe((data: any) => {
      this._Loading = false;
      this.displayMessage(data.statusCode, `Received ${this._LstRecive.length} items of shipment number "${ShipNum}" successfully`, 7000);
      this._LstRecive = [];
    }, (error: any) => {
      this._Loading = false;
      this.displayMessage('05', error.message + '. ' + error.error.message);
    });
  }

  displayMessage(StatusCode: string, Message: string, time: number = 5000) {
    this._MessageService.showCustomMessage(StatusCode, Message, time);
    this._Loading = false;
  }
}
