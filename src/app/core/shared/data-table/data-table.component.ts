import { Component, Input } from '@angular/core';
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
  @Input() tilte: string = '';
}
