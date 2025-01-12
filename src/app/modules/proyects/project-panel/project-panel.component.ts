import { Component } from '@angular/core';
import { ProyectFormComponent } from '../proyect-form/proyect-form.component';
import { ProyectListComponent } from '../proyect-list/proyect-list.component';
import { ProyectComponent } from '../proyect/proyect.component';

@Component({
  selector: 'app-project-panel',
  imports: [ProyectFormComponent, ProyectListComponent, ProyectComponent],
  standalone: true,
  templateUrl: './project-panel.component.html',
  styleUrl: './project-panel.component.css',
})
export class ProjectPanelComponent {}
