import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExchangeRateService {

  apiUrl = 'https://v6.exchangerate-api.com/v6/c0b03577a1f808dc260acb92/latest/TND';

  constructor(private http: HttpClient) { }

  getExchangeRate() {
    return this.http.get(this.apiUrl);
  }
}
