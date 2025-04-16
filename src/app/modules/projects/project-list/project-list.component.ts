import { Component, effect, inject, Input, input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '@model/Project';
import { ProjectCardComponent } from '../project-card/project-card.component';
import { RouterLink } from '@angular/router';
import { ProjectService } from '@http/project.service';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule, ProjectCardComponent, RouterLink],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.css',
})
export class ProjectListComponent implements OnInit {
  private service = inject(ProjectService);
  readonly tag = input<number | null>(null);
  @Input() projectsList: Project[] = [];

  constructor() {
    effect(() => {
      this.tag();
      if (this.tag()) {
        this.getProjectsByTagId(this.tag()!);
      }
    });
  }

  ngOnInit(): void {
    if (!this.tag() && !this.projectsList) {
      this.getProjects();
    }
  }

  getProjects(): void {
    this.service.getAll().subscribe((res) => {
      this.projectsList = res.data!;
    });
  }

  getProjectsByTagId(id: number) {
    this.service.getByTag(id).subscribe((res) => {
      this.projectsList = res.data!;
    });
  }
}
