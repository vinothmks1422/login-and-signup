import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiservicesService {

  constructor(private http: HttpClient) { }

  url = "http://localhost:3000/Profile";

  getUser() {
    return lastValueFrom(this.http.get<any[]>(this.url));
  }

  createUser(data: any) {
    return lastValueFrom(this.http.post(this.url, data));
  }

  deleteUser(id: string) {
    return lastValueFrom(this.http.delete<any>(`${this.url}/${id}`));
  }

}
