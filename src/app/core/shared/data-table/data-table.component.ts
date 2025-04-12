import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TableData } from '../../interfaces/TableData';

@Component({
  selector: 'app-data-table',
  imports: [],
  standalone: true,
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.css',
})
export class DataTableComponent {
  @Input() columns: string[] = [];
  @Input() data: TableData[] = [];
  @Input() tilte = '';
  @Output() onEdit = new EventEmitter<any>();
  @Output() onDelete = new EventEmitter<any>();
  handleEdit(data: any) {
    this.onEdit.emit(data);
  }
  handleDelete(data: any) {
    this.onDelete.emit(data);
  }
}
