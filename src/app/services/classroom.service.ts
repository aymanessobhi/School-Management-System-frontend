import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Classroom} from "../models/classroom.model";

@Injectable({
  providedIn: 'root'
})
export class ClassroomService {
  private apiUrl = 'http://localhost:8080/api/classrooms';

  constructor(private http: HttpClient) {}

  getAllClassroomsByGradeId(gradeId: number): Observable<Classroom[]> {
    const url = `${this.apiUrl}/grade=${gradeId}`;
    return this.http.get<Classroom[]>(url);
  }

  getClassroomById(id: number): Observable<Classroom> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Classroom>(url);
  }

  saveClassroom(classroom: Classroom): Observable<Classroom> {
    return this.http.post<Classroom>(this.apiUrl, classroom);
  }

  updateClassroom(id: number, data: Classroom): Observable<Classroom> {
    return this.http.patch<Classroom>(`${this.apiUrl}/${id}`, data);
  }

  deleteClassroom(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getAllClassrooms():Observable<Classroom[]>{
    return this.http.get<Classroom[]>(this.apiUrl);
  }

}
