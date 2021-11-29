import { Component } from '@angular/core';
import { AgRendererComponent } from 'ag-grid-angular';

@Component({
  selector: 'app-checbox-renderer',
  templateUrl: './checbox-renderer.component.html',
  styleUrls: ['./checbox-renderer.component.scss']
})
export class ChecboxRendererComponent implements AgRendererComponent {

  constructor() { }

  public params: any;

  agInit(params: any): void {
    this.params = params;
  }

  checkedHandler(event) {
      const checked = event.target.checked;
      const colId = this.params.column.colId;
      this.params.node.setDataValue(colId, checked);

      this.params.context.componentParent.updateSuggested(
        this.params.node.data
      );
  }
  refresh(): boolean {
    return false;
  }

}
