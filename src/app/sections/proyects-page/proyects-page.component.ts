import {Component, inject} from '@angular/core';
import {ProyectListComponent} from "../../modules/proyects/proyect-list/proyect-list.component";
import {TagFormComponent} from "../../modules/tags/tag-form/tag-form.component";
import {TagListComponent} from "../../modules/tags/tag-list/tag-list.component";
import {AuthService} from '../../core/services/auth.service';
import {ProyectFormComponent} from '../../modules/proyects/proyect-form/proyect-form.component';
import {OptionListComponent} from '../../modules/tags/option-list/option-list.component';

@Component({
  selector: 'app-proyects-page',
  standalone: true,
  imports: [
    ProyectListComponent,
    TagFormComponent,
    TagListComponent,
    ProyectFormComponent,
    OptionListComponent
  ],
  templateUrl: './proyects-page.component.html',
  styleUrl: './proyects-page.component.css'
})
export class ProyectsPageComponent {
  protected auth =  inject(AuthService);
  ngOnInit() {

  }
}
