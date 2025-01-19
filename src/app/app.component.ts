import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/shared/header/header.component';
import { NavbarComponent } from './core/shared/navbar/navbar.component';
import { FooterComponent } from './core/shared/footer/footer.component';
import { CommonModule } from '@angular/common';
import { LoadingService } from './core/services/loading.service';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { ProfileService } from './core/services/profile.service';
import { ProfileDaoService } from './core/DAO/profile-dao.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    NavbarComponent,
    FooterComponent,
    MatProgressSpinner,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'portfolio';
  private loadingService = inject(LoadingService);
  isLoading$ = this.loadingService.loading$;

  private profileService = inject(ProfileService);
  private profileDao = inject(ProfileDaoService);

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.profileService
      .getProfile(1)
      .subscribe((profile) =>
        this.profileDao.setProfile(profile.Profile.profile),
      );
  }
}
