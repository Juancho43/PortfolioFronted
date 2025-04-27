import { Component, inject, OnInit } from '@angular/core';
import { ProjectFormComponent } from '../project-form/project-form.component';
import { DataTableComponent } from '../../../core/shared/data-table/data-table.component';
import {
  convertToTableData,
  TableData,
} from '../../../core/interfaces/TableData';

import { ProjectService } from '@services/http/project.service';
import ProjectComponent from '@modules/projects/project/project.component';
import { ProjectDaoService } from '@dao/project-dao.service';

@Component({
  selector: 'app-project-panel',
  imports: [ProjectFormComponent, DataTableComponent, ProjectComponent],
  standalone: true,
  templateUrl: './project-panel.component.html',
  styleUrls: [
    './project-panel.component.css',
    '../../../core/styles/panel.css',
  ],
})
export default class ProjectPanelComponent implements OnInit {
  private service = inject(ProjectService);
  private dao = inject(ProjectDaoService);
  tilte = 'Proyectos';
  projectColumns: string[] = [];
  projectData: TableData[] = [];

  ngOnInit() {
    this.service.getAll().subscribe((res) => {
      Object.keys(res.data![0]).forEach((key) => {
        if (!key.includes('tags') && !key.includes('links')) {
          this.projectColumns.push(key);
        }
      });

      this.projectData = convertToTableData(res.data!);
    });
  }

  editHandler($event: any) {
    this.dao.setProject($event);
  }
}
