import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { TableValues } from './TableValues';
@Injectable({
  providedIn: 'root'
})
export class TableValuesService {

  url: string = environment.apiBaseURL+'/TableValues'

  constructor(private http : HttpClient) { }

  GetAllTableValues(generalId: number) {
    return this.http.get(`${this.url}/ByGeneralId/${generalId}`);
  }
  
  AddTableValues(generalId: number) {
    // Send the POST request with generalId as a parameter
    return this.http.post<any>(`${this.url}?generalId=${generalId}`, {});
  }


  RemoveTableValues(generalId: number, tableValues: TableValues[]) {
    return this.http.delete( `${this.url}/DeleteByGeneralId/${generalId}`, { body: tableValues });
  }

  updateTableValues(tableValues: TableValues[]) {
    return this.http.put(`${this.url}`, tableValues);
  }

  AddMultipleTableValues(tableValues: TableValues[]) {
    return this.http.post<TableValues[]>(`${this.url}/AddMultiple`, tableValues);
  }

  
}