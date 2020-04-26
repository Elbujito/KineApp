import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class AlertService {

  constructor(private snackBar: MatSnackBar) {}

  public showToaster(msg: string): void {
    this.snackBar.open(msg, null, {
      duration: 3500,
    });
  }
}
