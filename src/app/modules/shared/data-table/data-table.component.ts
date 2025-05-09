import { Component, input, output } from '@angular/core';
import { TableData } from '@model/TableData';

@Component({
  selector: 'app-data-table',
  imports: [],
  standalone: true,
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.css',
})
export class DataTableComponent {
  readonly columns = input<string[]>([]);
  readonly data = input<TableData[]>([]);
  readonly tilte = input('');
  readonly onEdit = output<any>();
  readonly onDelete = output<any>();
  handleEdit(data: any) {
    this.onEdit.emit(data);
  }
  handleDelete(data: any) {
    this.onDelete.emit(data);
  }
}
