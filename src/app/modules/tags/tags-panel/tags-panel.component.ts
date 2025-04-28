import { Component, inject, OnInit } from '@angular/core';
import { TagFormComponent } from '../tag-form/tag-form.component';

import { convertToTableData, TableData } from '../../../core/interfaces/TableData';
import { TagService } from '@services/http/tag.service';
import { DataTableComponent } from '../../../core/shared/data-table/data-table.component';
import { TagDaoService } from '@dao/tag-dao.service';
import { Tag } from '@model/Tag';
import { ApiResponseCollection } from '@model/ApiResponseCollection';

@Component({
  selector: 'app-tags-panel',
  imports: [TagFormComponent, DataTableComponent],
  standalone: true,
  templateUrl: './tags-panel.component.html',
  styleUrls: ['./tags-panel.component.css', '../../../core/styles/panel.css'],
})
export default class TagsPanelComponent implements OnInit {
  private service = inject(TagService);
  private dao = inject(TagDaoService);
  tilte = 'Etiquetas';
  tagsColumns: string[] = [];
  tagsData: TableData[] = [];

  ngOnInit() {
    this.service.getAll().subscribe((res) => {
      Object.keys(res.data![0]).forEach((key) => {
        this.tagsColumns.push(key);
      });
      this.tagsData = convertToTableData(res.data!);
    });
  }

  handleEdit($event: Tag) {
    this.dao.setTag($event);
  }

  handleDelete($event: Tag) {
    this.service.delete($event.id!).subscribe();
  }
}
