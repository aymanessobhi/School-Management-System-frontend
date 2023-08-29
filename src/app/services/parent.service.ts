import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Parent} from "../models/parent.model";

@Injectable({
  providedIn: 'root'
})
export class ParentService {
  private apiUrl = `http://localhost:8081`;

  constructor(private http: HttpClient) { }

  getAllParents(): Observable<Parent[]> {
    return this.http.get<Parent[]>(`${this.apiUrl}/api/parents`);
  }

  getParentById(id: number): Observable<Parent> {
    return this.http.get<Parent>(`${this.apiUrl}/api/parents/${id}`);
  }

  createParent(parent: Parent): Observable<Parent> {
    return this.http.post<Parent>(`${this.apiUrl}/api/parents`, parent);
  }

  updateParent(id: number, parent: Parent): Observable<Parent> {
    return this.http.put<Parent>(`${this.apiUrl}/api/parents/${id}`, parent);
  }

  deleteParent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/api/parents/${id}`);
  }

  getNationalities() {

  }

  getBloodTypes() {

  }

  getReligions() {

  }
}
