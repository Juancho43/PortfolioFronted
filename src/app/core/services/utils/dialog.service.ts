import {Inject, inject, Injectable, Optional} from '@angular/core';
import {ComponentType} from "@angular/cdk/portal";
import {MAT_DIALOG_DEFAULT_OPTIONS, MatDialog, MatDialogConfig} from "@angular/material/dialog";

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private readonly _dialog = inject(MatDialog);

  openModal<CT, T>(ComponentRef: ComponentType<CT>, data? : T, isEditing = false) : void{
    const dialogConfig = new MatDialogConfig();

    // dialogConfig.disableClose = true;
    // dialogConfig.autoFocus = true;
    // dialogConfig.data = data;
    // dialogConfig.hasBackdrop = true;
    const config = {data, isEditing};
    this._dialog.open(ComponentRef, dialogConfig);
  }


  getModal(){
    return this._dialog;
  }
  closeModal() : void{
    this._dialog.closeAll();
  }
}
