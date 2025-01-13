import { Component, inject } from '@angular/core';
import { TagFormComponent } from '../tag-form/tag-form.component';
import { TagListComponent } from '../tag-list/tag-list.component';
import { EducationService } from '../../../core/services/education.service';
import {
  convertToTableData,
  TableData,
} from '../../../core/interfaces/TableData';
import { TagsService } from '../../../core/services/tags.service';
import { DataTableComponent } from '../../../core/shared/data-table/data-table.component';

@Component({
  selector: 'app-tags-panel',
  imports: [TagFormComponent, TagListComponent, DataTableComponent],
  standalone: true,
  templateUrl: './tags-panel.component.html',
  styleUrl: './tags-panel.component.css',
})
export class TagsPanelComponent {
  private service = inject(TagsService);
  tilte: string = 'Etiquetas';
  tagsColumns: string[] = [];
  tagsData: TableData[] = [];

  ngOnInit() {
    this.service.getTags().subscribe((res) => {
      Object.keys(res.Tags[0]).forEach((key) => {
        this.tagsColumns.push(key);
      });

      this.tagsData = convertToTableData(res.Tags);
    });
  }
}
