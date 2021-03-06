import { AfterViewInit, Component, ViewChild } from "@angular/core";

@Component({
    selector: 'app-numeric-editor-cell',
    template: '<input #i [value]="params.value" (keypress)="onKeyPress($event)" (keydown)="onKeyDown($event)" (focus)="$event.target.select()" />'
})

export class NumericEditorComponent implements AfterViewInit {
    @ViewChild('i', { static: false }) textInput;
    params;

    ngAfterViewInit() {
        setTimeout(() => {
            this.textInput.nativeElement.focus();
        });
    }

    agInit(params: any): void {
        this.params = params;
    }

    getValue() {
        return this.textInput.nativeElement.value;
    }

    onKeyPress(event) {
        if (!isNumeric(event)) {
            event.preventDefault();
        }

        function isNumeric(ev) {
            return /\d/.test(ev.key);
        }
    }

    onKeyDown(event) {

        if (event.keyCode === 39 || event.keyCode === 37) {
            event.stopPropagation();
        }
    }
}