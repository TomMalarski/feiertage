import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HolidaysService {

  private apiUrl = 'https://get.api-feiertage.de';

  constructor(private http: HttpClient) { }

  public getFeiertage(year?: number): Observable<any> {
    const url = `${this.apiUrl}?years=${year}`;
    return this.http.get(url);
  }

  public saveFeiertage(feiertage: any[]): Observable<any> {
    return this.http.post(this.apiUrl, { feiertage });
  }
}
