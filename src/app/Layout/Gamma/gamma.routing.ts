import { Routes } from "@angular/router";
import { AuthenticationGuard } from "../../Guards/authentication.guard";
import { ReceiveComponent } from "./receive/receive.component";
import { ShipmentComponent } from "./shipment/shipment.component";

export const GammaRouterModule: Routes = [
    {
        path: '',
        children: [
            {
                path: 'Shipment',
                component: ShipmentComponent,
                canActivate: [AuthenticationGuard]
            },
            {
                path: 'Receive',
                component: ReceiveComponent,
                canActivate: [AuthenticationGuard]
            }
        ]
    }
]