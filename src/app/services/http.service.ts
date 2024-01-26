import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, catchError } from 'rxjs';
import { ICurrency } from '../models/ICurrency.interface';
import { Currency } from '../types/Currency.type';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  getExchangeValue(
    baseCurrency: Currency = 'USD',
    targetCurrency: Currency = 'UAH',
    amount?: number
  ) {
    return this.http
      .get<ICurrency>(
        `https://v6.exchangerate-api.com/v6/e5d7c2d051f62fd14ea806a6/pair/${baseCurrency}/${targetCurrency}${
          amount ? '/' + amount : ''
        }`
      )
      .pipe(
        catchError((err) => {
          console.log(err);
          return EMPTY;
        })
      );
  }
}
