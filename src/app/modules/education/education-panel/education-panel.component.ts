import { Component, inject } from '@angular/core';
import { EducationFormComponent } from '../education-form/education-form.component';
import { DataTableComponent } from '../../../core/shared/data-table/data-table.component';
import {
  convertToTableData,
  TableData,
} from '../../../core/interfaces/TableData';
import { EducationService } from '../../../core/services/education.service';

@Component({
  selector: 'app-education-panel',
  imports: [EducationFormComponent, DataTableComponent],
  standalone: true,
  templateUrl: './education-panel.component.html',
  styleUrls: [
    './education-panel.component.css',
    '../../../core/styles/panel.css',
  ],
})
export class EducationPanelComponent {
  private service = inject(EducationService);
  tilte: string = 'Formación';
  educationColumns: string[] = [];
  educationData: TableData[] = [];

  ngOnInit() {
    this.service.getAll().subscribe((res) => {
      Object.keys(res.education[0]).forEach((key) => {
        this.educationColumns.push(key);
      });

      this.educationData = convertToTableData(res.education);
    });
  }
}
