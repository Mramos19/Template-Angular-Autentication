import * as moment from 'moment';
import { isNull } from "util";
//import { create, all } from 'mathjs'


export class FormatUtility {

    public static FormatChangeHistory(value): string {

        var _value = (isNull(value)) ? '' : value.toString();

        var _text = /[\*]/gi; //Regular expresion para obtener los asteriscos


        //si encuentra 1 asterisco
        if (_value.match(_text) != null && _value.match(_text).length == 1) {
            _value = _value.replace('*', ' ');
        }

        //si encuentra 2 asteriscos
        if (_value.match(_text) != null && _value.match(_text).length == 2) {
            _value = _value.replace('**', ' ');
        }

        return _value;
    }

    public static FormatDateLong(value): string {

        var _value = (isNull(value)) ? '' : value.toString();

        _value = moment(value).format('MM/DD/YYYY, h:mm:ss a');

        return _value
    }

    public static SetNumber(value: number): string {

        return `${value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}`.replace('$', '');
    }

    public static GetNumber(value: string): number {

        return Number((value != null) ? value.toString().trim().replace('$', '').replace('€', '').replace(',', '').replace(',','') : '0');
    }

   /* public static Round(value: Number): number {

        const config = {}
        const math = create(all, config);

        return Number(math.round(Number(value), 2));

    }*/

    public static SetNumberString(value: number, currency: string): string {

        return `${value.toLocaleString('en-US', { style: 'currency', currency: '' + currency + '' })}`;

    }


}