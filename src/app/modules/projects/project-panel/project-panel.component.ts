import { Component, inject, OnInit } from '@angular/core';
import { ProjectFormComponent } from '../project-form/project-form.component';
import { DataTableComponent } from '../../../core/shared/data-table/data-table.component';
import {
  convertToTableData,
  TableData,
} from '../../../core/interfaces/TableData';

import { ProjectService } from '@services/http/project.service';

@Component({
  selector: 'app-project-panel',
  imports: [ProjectFormComponent, DataTableComponent],
  standalone: true,
  templateUrl: './project-panel.component.html',
  styleUrls: [
    './project-panel.component.css',
    '../../../core/styles/panel.css',
  ],
})
export default class ProjectPanelComponent implements OnInit {
  private service = inject(ProjectService);
  tilte = 'Proyectos';
  projectColumns: string[] = [];
  projectData: TableData[] = [];

  ngOnInit() {
    this.service.getAll().subscribe((res) => {
      Object.keys(res.data![0]).forEach((key) => {
        this.projectColumns.push(key);
      });

      this.projectData = convertToTableData(res.data!);
    });
  }
}
