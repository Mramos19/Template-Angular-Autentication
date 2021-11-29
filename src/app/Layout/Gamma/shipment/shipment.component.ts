import { Component, ElementRef, OnChanges, OnInit, ViewChild } from '@angular/core';
import { ColDef, GridApi, RowSelectedEvent } from 'ag-grid-community';
import { ShipmentService } from '../../../Services/shipment.service';
import { ShipmentData } from '../../../Model/Request/ShipmentData';
import { ShipmentBo } from '../../../Model/Request/ShipmentBo';
import { AuthenticationService } from '../../../Services/authentication.service';
import { UserEntities } from '../../../Model/Entities/UserEntities.model';
import { Shipment } from '../../../Model/Entities/Shipment';
import { MessageService } from '../../../@pages/components/message/message.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { PrintingLT } from '../../../Model/Entities/PrintingLT';
import { NumericEditorComponent } from '../../../Shared/AgEditors/agNumericEditorComponent';
import { agCellValueFormat } from '../../../Shared/AgEditors/agCellValueFormat';
import { FormatUtility } from '../../../Utils/FormatUtility';

@Component({
  selector: 'app-shipment',
  templateUrl: './shipment.component.html',
  styleUrls: ['./shipment.component.scss'],
  providers: [MessageService, agCellValueFormat]
})
export class ShipmentComponent implements OnInit {
  /* Ag grid variables */
  public gridApi: GridApi;
  public gridColumApi;
  public _ColumnDefShip: ColDef[];
  public _ColumnDefBO: ColDef[];
  public _DefaultColDef: ColDef;
  public _DefaultColShip: ColDef;
  public _frameworkComponents;
  public _Components;
  public context;
  /* Lists and Entities */
  public _LstBackorder: ShipmentBo[] = [];
  public _LstShipment: ShipmentData[] = [];
  public _UserEntity: UserEntities;
  public _ShipmentEntity: Shipment;
  public _PrintingLTEntity: PrintingLT;
  /* Validators */
  public _LoadData: boolean = false;
  public _SaveShip: boolean = false;
  public _Loading = false;


  /* View Childs */
  @ViewChild('ShipmentNo', { static: false }) ShipmentNo: ElementRef;
  @ViewChild('Lot', { static: false }) Lot: ElementRef;
  @ViewChild('mdBackorder', { static: true }) mdBackorder: ModalDirective;

  //Shipment Detail
  @ViewChild('PO', { static: false }) PO: ElementRef;
  @ViewChild('ProdCode', { static: false }) ProdCode: ElementRef;
  @ViewChild('Customer', { static: false }) Customer: ElementRef;
  @ViewChild('Traveler', { static: false }) Traveler: ElementRef;
  @ViewChild('TotalQty', { static: false }) TotalQty: ElementRef;
  @ViewChild('TotalQtyMeerp', { static: false }) TotalQtyMeerp: ElementRef;
  @ViewChild('Shipped', { static: false }) Shipped: ElementRef;
  @ViewChild('ShipNica', { static: false }) ShipNica: ElementRef;
  @ViewChild('SentNica', { static: false }) SentNica: ElementRef;
  @ViewChild('Approved', { static: false }) Approved: ElementRef;
  @ViewChild('Generated', { static: false }) Generated: ElementRef;


  /****** Constructor ******/
  constructor(
    private _ShipmentService: ShipmentService,
    private _AuthenticationService: AuthenticationService,
    private _MessageService: MessageService,
    private _agCellValueFormat: agCellValueFormat) {
    this.context = { componentParent: this };

    /* Grid Column Definition */
    this._DefaultColDef = {
      flex: 1,
      resizable: true,
      sortable: true,
      filter: true,
      menuTabs: ['filterMenuTab'],
      cellStyle: { 'text-align': 'center' }
    }

    this._DefaultColShip = {
      flex: 1,
      resizable: true,
      sortable: true,
      filter: true,
      menuTabs: ['filterMenuTab'],
      cellStyle: { 'text-align': 'center' },
      singleClickEdit: true
    }

    this._ColumnDefShip = [
      { headerName: '# Ship', field: 'NoShip', maxWidth: 150 },
      { headerName: 'Lot', field: 'Lot', maxWidth: 150 },
      { headerName: 'PO', field: 'PO', maxWidth: 150 },
      { headerName: 'MohId', field: 'MohId', maxWidth: 150 },

      { headerName: 'Item', field: 'ProdCode', hide: true },
      { headerName: 'QtyTotal', field: 'QtyTotal', hide: true, 
        valueFormatter: this._agCellValueFormat.numberIntFormat },
      { headerName: 'qtyMeerpTotal', field: 'qtyMeerpTotal', hide: true, 
        valueFormatter: this._agCellValueFormat.numberIntFormat },
      { headerName: 'Traveler', field: 'Description', hide: true },
      { headerName: 'ShipNica', field: 'ShipNica', hide: true },
      { headerName: 'SentNica', field: 'SentNica', hide: true, 
        valueFormatter: this._agCellValueFormat.numberIntFormat },
      { headerName: 'Shipped', field: 'Shipped', hide: true, 
        valueFormatter: this._agCellValueFormat.numberIntFormat },
      { headerName: 'PermitShip', field: 'PermitShip', hide: true },
      { headerName: 'lbapp', field: 'lbapp', hide: true },
      { headerName: 'lbgen', field: 'lbgen', hide: true },


      { headerName: 'Qty', 
        field: 'Qty', 
        maxWidth: 120, 
        cellEditor: 'numericEditorComponent', 
        editable: true, 
        cellStyle: getQtyValidStyled, 
        valueFormatter: this._agCellValueFormat.numberIntFormat 
      },
      { headerName: 'Qty Bag', 
        field: 'QtyBag', 
        maxWidth: 120, 
        cellEditor: 'numericEditorComponent', editable: true, 
        cellStyle: { 'text-align': 'right', 'background-color': '#d0f0c0' }, 
        valueFormatter: this._agCellValueFormat.numberIntFormat 
      },
      { headerName: 'Qty Box', 
        field: 'QtyBox', 
        maxWidth: 120, 
        cellEditor: 'numericEditorComponent', 
        editable: true, 
        cellStyle: { 'text-align': 'right', 'background-color': '#d0f0c0' }, 
        valueFormatter: this._agCellValueFormat.numberIntFormat 
      },
      { headerName: 'Comment', field: 'Comment', editable: true, cellStyle: { 'text-align': 'left', 'background-color': '#d0f0c0' } }
    ];//#cd853f

    this._ColumnDefBO = [
      { headerName: 'Lot', field: 'Lot', maxWidth: 150 },
      { headerName: 'PO', field: 'PO', maxWidth: 150 },
      { headerName: 'Item', field: 'Item' },
      { headerName: 'Customer', field: 'Customer' },
      { headerName: 'Traveler', field: 'Traveler' },
      { headerName: 'Qty', field: 'Qty', 
        maxWidth: 120, cellStyle: { 'text-align': 'right' }, 
        valueFormatter: this._agCellValueFormat.numberIntFormat 
      },
      { headerName: 'QtyMeerp', field: 'QtyMeerp', 
        maxWidth: 120, cellStyle: { 'text-align': 'right' }, 
        valueFormatter: this._agCellValueFormat.numberIntFormat 
      }
    ];

    this._frameworkComponents = {
      numericEditorComponent: NumericEditorComponent
    };

    /* Imput Mask */
  
  }


  /* Control Event's */
  ngOnInit() {
    this.getUserData();
    this.getLastShipment();
  }

  onGridShipmentReady(params: any) {
    this.gridApi = params.api;
    this.gridColumApi = params.columnApi;
  }


  onGridBackorderReady(params: any) {
    /*
    this.gridApi = params.api;
    this.gridColumApi = params.columnApi;
    */
  }

  onKeyupLoadShipment(event) {
    let LotNo = this.Lot.nativeElement.value;
    let ShipNo = this.ShipmentNo.nativeElement.value;

    if (LotNo.trim().length > 0 && ShipNo.trim().length > 0) {
      this._LoadData = true;
    }
    else {
      this._LoadData = false;
    }
  }

  onLoadShipmentData(event) {
    this.getPrintingLabelData();
  }

  onRowSelectedShipment(event: RowSelectedEvent) {
    const selectedRows = event.api.getSelectedRows();
    let grdData: ShipmentData = selectedRows[0];

    this.PO.nativeElement.value = grdData.PO;
    this.ProdCode.nativeElement.value = grdData.ProdCode;
    this.Customer.nativeElement.value = grdData.Customer;
    this.Traveler.nativeElement.value = grdData.Description;
    this.TotalQty.nativeElement.value = FormatUtility.SetNumber(grdData.QtyTotal);
    this.TotalQtyMeerp.nativeElement.value = FormatUtility.SetNumber(grdData.qtyMeerpTotal);
    this.Shipped.nativeElement.value = FormatUtility.SetNumber(grdData.Shipped);
    this.ShipNica.nativeElement.value = grdData.ShipNica;
    this.SentNica.nativeElement.value = FormatUtility.SetNumber(grdData.SentNica);
    this.Approved.nativeElement.value = grdData.lbapp;
    this.Generated.nativeElement.value = grdData.lbgen;
  }

  oncellValueChangedShipment(params) {
    const colId = params.column.getId();
    if (colId === "Qty") {
      if (params.data.Qty > params.data.PermitShip) {
        this.displayMessage('01', 'Exceeds the remaining quantity allowed to ship');
        this._SaveShip = false;
      }
      else {
        this._SaveShip = true;
      }
    }
  }

  onchageFormatNumber(event) {
    event.target.value = FormatUtility.SetNumber(event.target.value);
  }

  /* Metods */
  getUserData() {
    this._AuthenticationService.GetUser().then(response => {
      this._UserEntity = response.result;
    }).catch(error => {
      console.log(error.message.message);
    });
  }

  getLastShipment() {
    this._Loading = true;
    this._ShipmentService.GetLastShipment().then(response => {
      this._ShipmentEntity = response.result[0];
      let ShipNumber = Number(this._ShipmentEntity.noship);

      switch (this._ShipmentEntity.status) {
        case 0 || undefined:
          this.ShipmentNo.nativeElement.value = 1000;
          break;
        case 1:
          this.ShipmentNo.nativeElement.value = ShipNumber;
          break;
        case 2:
          this.ShipmentNo.nativeElement.value = ShipNumber + 1;
          break;
      }
      this._Loading = false;
    }).catch(error => {
      this.displayMessage('05', error.error.message);
    });
  }

  getShipmentData() {
    this._Loading = true;
    let LotNo = this.Lot.nativeElement.value;
    let ShipNo = this.ShipmentNo.nativeElement.value;

    this._ShipmentService.GetInfoToShip(LotNo).then(response => {
      if (response.statusCode === "00") {
        if (response.result[0].length > 0) {
          this._LstBackorder = [...this._LstBackorder, ...response.result[0]];
        }

        if (response.result[1].length > 0) {
          let NewList: ShipmentData[] = [];
          NewList = [...response.result[1]];

          NewList.map(item => {
            item.NoShip = ShipNo
            item.Operator = this._UserEntity.userName

            if (this._PrintingLTEntity !== undefined) {
              item.lbapp = this._PrintingLTEntity.lbApp
              item.lbgen = this._PrintingLTEntity.lbGen
            }
          });

          this._LstShipment = [...this._LstShipment, ...NewList];
        }
        else {
          this.displayMessage('01', `Lot "${LotNo}" not exists`);
        }

        this.Lot.nativeElement.value = "";
        this._LoadData = false;
        this._Loading = false;
      }
      else {
        this.displayMessage('05', response.message);
      }
    }).catch(error => {
      this.displayMessage('05', error.message);
    });
  }

  getPrintingLabelData() {
    this._Loading = true;
    let LotNo = this.Lot.nativeElement.value;

    this._ShipmentService.GetlabelShipment(LotNo).then(response => {
      this._PrintingLTEntity = response.result[0];
      this.getShipmentData();
    }).catch(error => {
      this.displayMessage('05', error.message.message);
    });
  }

  saveShipment() {
    this._Loading = true;
    let rowData: Shipment[] = [];
    let sumQty: number = 0;

    this.gridApi.forEachNode(node => {
      // TODO: Validate Checked rows
      if (node.data.Qty > 0) {
        rowData.push(node.data);
        sumQty += node.data.Qty
      }
    });

    if (sumQty === 0) {
      this.displayMessage('01', 'Please enter the quantities to send');
      return;
    }

    this._ShipmentService.SaveShipment(JSON.stringify(rowData)).then(response => {
      this.displayMessage(response.statusCode, `${rowData.length} items Shipment successfully`, 7000);
      this.CleanData();
      this._Loading = false;
    }).catch(error => {
      this.displayMessage('05', error.message + '. ' + error.error.message);
    });
  }

  displayMessage(StatusCode: string, Message: string, time: number = 5000) {
    this._MessageService.showCustomMessage(StatusCode, Message, time);
    this._Loading = false;
  }

  CleanData() {
    // Clear Grids
    this._LstShipment = [];
    this._LstBackorder = [];
    // Clear Form
    this.PO.nativeElement.value = "";
    this.ProdCode.nativeElement.value = "";
    this.Customer.nativeElement.value = "";
    this.Traveler.nativeElement.value = "";
    this.TotalQty.nativeElement.value = "";
    this.TotalQtyMeerp.nativeElement.value = "";
    this.Shipped.nativeElement.value = "";
    this.ShipNica.nativeElement.value = "";
    this.SentNica.nativeElement.value = "";
    this.Approved.nativeElement.value = "";
    this.Generated.nativeElement.value = "";
  }

}

function getQtyValidStyled(params) {
  const celValue = params.value;
  let Style = { 'text-align': 'right', 'background-color': '#d0f0c0' };
  if (celValue > params.data.PermitShip) {
    Style['background-color'] = "#ff5a5a";
  }

  return Style;
};

/*
function getCharCodeFromEvent(event) {
  event = event || window.event;
  return typeof event.which == 'undefined' ? event.keyCode : event.which;
}
function isCharNumeric(charStr) {
  return !!/\d/.test(charStr);
}
function isKeyPressedNumeric(event) {
  var charCode = getCharCodeFromEvent(event);
  var charStr = String.fromCharCode(charCode);
  return isCharNumeric(charStr);
}*/