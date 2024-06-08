import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Facture } from './Facture';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FactureServiceService {

  url: string = environment.apiBaseURL+'/Factures'


  constructor(private http : HttpClient) { }

  AddFacture(facture : Facture)
  {
    return this.http.post(this.url,{facture})
  }

  GetFacture(generalid : number,)
  {
    return this.http.get(`${this.url}/ByGeneral/${generalid}`);
  }

  updateFacture(factureId: number, facture: Facture): Observable<Facture> {
    const url = `${this.url}/${factureId}`;
    return this.http.put<Facture>(url, facture);
  }
  
}
