import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { General } from '../Shared/General'
@Injectable({
  providedIn: 'root'
})
export class GeneralService {

url: string = environment.apiBaseURL+'/Generals'


constructor(private http : HttpClient) { }

AddGeneral(general : General)
{
 return this.http.post(this.url,{general})
}

RemoveGeneral(id : number)
{
  return this.http.delete(this.url+'/'+id)
}

GetGeneral()
{
  return this.http.get(this.url)
}


}
