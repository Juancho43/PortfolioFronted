import { Component, inject } from '@angular/core';
import { ProyectFormComponent } from '../proyect-form/proyect-form.component';
import { DataTableComponent } from '../../../core/shared/data-table/data-table.component';
import {
  convertToTableData,
  TableData,
} from '../../../core/interfaces/TableData';
import { ProyectsService } from '../../../core/services/proyects.service';

@Component({
  selector: 'app-project-panel',
  imports: [ProyectFormComponent, DataTableComponent],
  standalone: true,
  templateUrl: './project-panel.component.html',
  styleUrls: [
    './project-panel.component.css',
    '../../../core/styles/panel.css',
  ],
})
export class ProjectPanelComponent {
  private service = inject(ProyectsService);
  tilte: string = 'Proyectos';
  projectColumns: string[] = [];
  projectData: TableData[] = [];

  ngOnInit() {
    this.service.getProyects().subscribe((res) => {
      Object.keys(res.data![0]).forEach((key) => {
        this.projectColumns.push(key);
      });

      this.projectData = convertToTableData(res.data!);
    });
  }
}
