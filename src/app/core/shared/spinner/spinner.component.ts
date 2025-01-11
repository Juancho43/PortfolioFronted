import { Component } from '@angular/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {BrowserModule} from '@angular/platform-browser';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [BrowserModule,MatProgressSpinnerModule],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.css'
})

export class SpinnerComponent {
  isLoading = true;

  constructor() {
    // Simula una operación en progreso
    setTimeout(() => {
      this.isLoading = false;
    }, 3000); // Ocultar el spinner después de 3 segundos
  }
}
