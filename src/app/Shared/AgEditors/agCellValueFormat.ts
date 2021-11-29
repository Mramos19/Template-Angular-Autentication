import { formatDate } from "@angular/common";
import { AfterViewInit, Component } from "@angular/core";

@Component({
    selector: 'app-cell-value-format',
    template: '<input #i [value]="params.value" />'
})

export class agCellValueFormat implements AfterViewInit {
    params;

    ngAfterViewInit(): void {
    }

    agInit(params: any): void {
        this.params = params;
    }

    public currencyFormat(params) {
        if (isNaN(params.value)) {
            return '';
        }

        var formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        });

        return formatter.format(params.value); /* $2,500.00 */
    }

    public numberIntFormat(params) {
        if (isNaN(params.value)) {
            return '';
        }

        var formatter = new Intl.NumberFormat('en-US', {
            maximumFractionDigits: 0
        });

        return formatter.format(params.value).replace('$', ''); /* $2,500.00 */
    }

    public numberFormat(params, decimalPlaces: number = 2) {
        if (isNaN(params.value)) {
            return '';
        }

        var formatter = new Intl.NumberFormat('en-US', {
            maximumFractionDigits: decimalPlaces,
            minimumFractionDigits: decimalPlaces
        });

        return formatter.format(params.value).replace('$', ''); /* $2,500.00 */
    }

    public dateFormatter(params) {
        if (params === null)
            return "";
        return formatDate(params.value, 'MM/d/yyyy', 'en-US');
    };
}