export interface Shipment {
    id?: number;
    po?: string; //Product Order
    customer?: string; 
    mohId?: string; //Manofacturing Order Id of material
    desc?: string; 
    prodcode?: string; //Product Code
    qtybag?: number; //Quantity of product per bag
    noship?: string; //Shipment Number
    nobox?: number; //Box Number
    lot?: number;
    comment?: string; 
    Operator?: number; //User who registers the process 
    status?: number; 
    fecha?: Date //Fecha
    ordqty?: number; //Order Quantity
    plnica?: number; //Package List Nicaragua
    sentnica?: number; //Sent to Nicaragua
    lbapp?: string; //Label Approved
    lbgen?: string; //Label Generated
}