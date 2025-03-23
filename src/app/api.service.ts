import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable } from 'rxjs';

interface User {
  userId: number;
  id: number;
  title: string;
  body: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:5000/api/masterData';
  private dataSubject = new BehaviorSubject<User[]>([]);

  constructor(private http: HttpClient) {}

  getData(): Observable<User[]> {
    return this.http.get<any>(this.apiUrl);
  }
  getCatagoryData(catagory:string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${catagory}`);
  }
  addUser(users:{name:string, email:string}): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/users`, users);
  }
}
