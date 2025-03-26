import { Component, inject, Input, OnInit } from '@angular/core';
import { Project } from '../../../core/interfaces/Project';
import { CommonModule } from '@angular/common';
import { TagComponent } from '../../tags/tag/tag.component';
import { ProyectDaoService } from '../../../core/DAO/proyect-dao.service';
import { DialogService } from '../../../core/utils/dialog.service';

@Component({
  selector: 'app-proyect',
  standalone: true,
  imports: [CommonModule, TagComponent],
  templateUrl: './proyect.component.html',
  styleUrl: './proyect.component.css',
})
export class ProyectComponent {
  private proyectoDao = inject(ProyectDaoService);
  @Input() Proyect: Project = this.proyectoDao.getEmptyProyecto();

  ngOnInit() {
    this.proyectoDao.getProyecto().subscribe((data) => (this.Proyect = data));
    console.log(this.Proyect);
  }
}
