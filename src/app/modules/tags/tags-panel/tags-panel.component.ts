import { Component, inject } from '@angular/core';
import { TagFormComponent } from '../tag-form/tag-form.component';

import {
  convertToTableData,
  TableData,
} from '../../../core/interfaces/TableData';
import { TagService } from '../../../core/services/tag.service';
import { DataTableComponent } from '../../../core/shared/data-table/data-table.component';

@Component({
  selector: 'app-tags-panel',
  imports: [TagFormComponent, DataTableComponent],
  standalone: true,
  templateUrl: './tags-panel.component.html',
  styleUrls: ['./tags-panel.component.css', '../../../core/styles/panel.css'],
})
export class TagsPanelComponent {
  private service = inject(TagService);
  tilte: string = 'Etiquetas';
  tagsColumns: string[] = [];
  tagsData: TableData[] = [];

  ngOnInit() {
    this.service.getTags().subscribe((res) => {
      Object.keys(res.data![0]).forEach((key) => {
        this.tagsColumns.push(key);
      });

      this.tagsData = convertToTableData(res.data!);
    });
  }
}
