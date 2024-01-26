import { AfterViewInit, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { distinctUntilChanged } from 'rxjs';
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
    this.getExchangeValue();
  }

  getExchangeValue() {
    this.httpService
      .getExchangeValue(
        this.formGroup.value.baseCurrency,
        this.formGroup.value.targetCurrency,
        this.formGroup.value.currencyAmount
      )
      .pipe(distinctUntilChanged())
      .subscribe((value) => {
        this.formGroup.patchValue({
          amount: value.conversion_result.toFixed(2),
        });
      });
  }

  private getFormGroup() {
    return this.fb.group({
      amount: [1],
      currencyAmount: [100],
      baseCurrency: ['USD'],
      targetCurrency: ['EUR'],
    });
  }
}
