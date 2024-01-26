import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { forkJoin } from 'rxjs';
import { HttpService } from '../../services/http.service';
@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [MatToolbarModule, AsyncPipe, CurrencyPipe],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css',
})
export class ToolbarComponent {
  courses$ = forkJoin([
    this.httpService.getExchangeValue(),
    this.httpService.getExchangeValue('EUR'),
  ]);
  constructor(private httpService: HttpService) {}
}
