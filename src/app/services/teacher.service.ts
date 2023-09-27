import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  private baseUrl = 'http://localhost:8081/api/teachers';

  constructor(private http: HttpClient) {}

  getAllTeachers(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getTeacherById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createTeacher(teacher: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, teacher);
  }

  updateTeacher(id: number, teacher: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, teacher);
  }

  deleteTeacher(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
