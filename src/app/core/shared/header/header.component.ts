import {Component, inject} from '@angular/core';
import {ProfileService} from "../../services/profile.service";
import {Profile} from "../../interfaces/Profile";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
private profileService = inject(ProfileService);
profile : Profile = {
  nombre:'',
  id: 0,
  presentacion: '',
  rol: '',
  email: '',
  password: ''
};

  ngOnInit(){
    this.getData();
  }

  getData(){
    this.profileService.getProfile(1).subscribe(profile => this.profile = profile);
  }
}
