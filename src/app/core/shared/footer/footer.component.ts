import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '@services/utils/auth.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent implements OnInit {
  private auth = inject(AuthService);
  showLogout = signal<boolean>(false);

  ngOnInit() {
    this.auth.login$.subscribe((data) => {
      this.showLogout.set(data);
    });
  }
}
