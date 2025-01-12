import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { getValidatorErrorMessage } from '../../utils/validators-utils';

@Component({
  selector: 'app-error-messages',
  imports: [CommonModule],
  standalone: true,
  // templateUrl: ',
  template: `<ng-container *ngIf="errorMessage !== null"
    >{{ errorMessage }}
  </ng-container>`,
  styleUrl: './error-messages.component.scss',
})
export class ErrorMessagesComponent {
  @Input()
  control!: AbstractControl;

  constructor() {}

  get errorMessage() {
    for (const validatorName in this.control?.errors) {
      if (this.control.touched)
        return getValidatorErrorMessage(
          validatorName,
          this.control.errors[validatorName]
        );
    }
    return null;
  }
}
