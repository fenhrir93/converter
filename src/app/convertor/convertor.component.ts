import { AfterViewInit, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { take } from 'rxjs';
import { HttpService } from '../services/http.service';
import { Currency } from '../types/Currency.type';
@Component({
  selector: 'app-convertor',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
  ],
  templateUrl: './convertor.component.html',
  styleUrl: './convertor.component.css',
  providers: [HttpService],
})
export class ConvertorComponent implements AfterViewInit {
  formGroup: FormGroup;
  currencies: Currency[] = ['EUR', 'USD', 'UAH'];

  constructor(private httpService: HttpService, private fb: FormBuilder) {
    this.formGroup = this.getFormGroup();
  }

  ngAfterViewInit(): void {
    this.setConversionAmount();
  }

  setConversionAmount() {
    const { baseCurrency, targetCurrency, currencyAmount } =
      this.formGroup.value;

    this.httpService
      .getExchangeValue(baseCurrency, targetCurrency, currencyAmount)
      .pipe(take(1))
      .subscribe(({ conversion_result }) => {
        this.formGroup.patchValue({
          amount: conversion_result.toFixed(2),
        });
      });
  }

  private getFormGroup() {
    return this.fb.group({
      amount: [{ value: '', disabled: true }],
      currencyAmount: [100],
      baseCurrency: ['USD'],
      targetCurrency: ['EUR'],
    });
  }
}
