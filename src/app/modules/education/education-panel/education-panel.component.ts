import { Component, inject, OnInit } from '@angular/core';
import { EducationFormComponent } from '../education-form/education-form.component';
import { DataTableComponent } from '../../../core/shared/data-table/data-table.component';
import { convertToTableData, TableData } from '../../../core/interfaces/TableData';
import { EducationService } from '@services/http/education.service';
import { EducationDaoService } from '../../../core/services/DAO/education-dao.service';

@Component({
  selector: 'app-education-panel',
  imports: [EducationFormComponent, DataTableComponent],
  standalone: true,
  templateUrl: './education-panel.component.html',
  styleUrls: ['./education-panel.component.css', '../../../core/styles/panel.css'],
})
export default class EducationPanelComponent implements OnInit {
  private service = inject(EducationService);
  private dao = inject(EducationDaoService);
  tilte = 'Formación';
  educationColumns: string[] = [];
  educationData: TableData[] = [];

  ngOnInit() {
    this.service.getAll().subscribe((res) => {
      Object.keys(res.data![0]).forEach((key) => {
        this.educationColumns.push(key);
      });

      this.educationData = convertToTableData(res.data!);
    });
  }

  handleEdit(datos: any) {
    this.dao.setEducation(datos);
  }
}
