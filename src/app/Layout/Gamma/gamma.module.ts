//Modules
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../../@pages/components/shared.module";
import { GammaRouterModule } from "./gamma.routing";
import { MessageModule } from "../../@pages/components/message/message.module";
import { LoadingModule } from "../../@pages/components/loading/loading.module";
import { pgCardModule } from "../../@pages/components/card/card.module";
import { ModalModule } from 'ngx-bootstrap';
import { TabsModule } from "ngx-bootstrap";
import { pgTabsModule } from '../../@pages/components/tabs/tabs.module';

//Components
import { ReceiveComponent } from "./receive/receive.component";
import { ShipmentComponent } from './shipment/shipment.component';
import { NumericEditorComponent } from "../../Shared/AgEditors/agNumericEditorComponent";

//AgGrid Module
import { AgGridModule } from "ag-grid-angular";
import 'ag-grid-enterprise';

// Thirdparty components
import { TextMaskModule } from 'angular2-text-mask';

@NgModule({
    declarations: [
        ReceiveComponent,
        ShipmentComponent,
        NumericEditorComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        LoadingModule,
        RouterModule.forChild(GammaRouterModule),
        MessageModule,
        pgCardModule,
        AgGridModule.withComponents([NumericEditorComponent]),
        ModalModule.forRoot(),
        TabsModule.forRoot(),
        pgTabsModule,
        TextMaskModule
    ],
    exports: [
        ReceiveComponent
    ]

})

export class GammaModule {

}