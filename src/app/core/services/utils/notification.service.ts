import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private snackBar = inject(MatSnackBar);

  showNotification(message: string, action = 'Close', duration = 3000) {
    this.snackBar.open(message, action, {
      duration: duration,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
  showSuccesNotification() {
    this.showNotification('¡Operación exitosa!', 'Cerrar', 3000);
  }
  showErrorNotification() {
    this.showNotification('¡Hubo un error', 'Cerrar', 3000);
  }
}
