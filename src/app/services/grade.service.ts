import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Grade} from "../models/grade.model";

@Injectable({
  providedIn: 'root'
})
export class GradeService {
  private apiUrl = 'http://localhost:8081/api/grades';

  constructor(private http: HttpClient) {}

  getAllGrades(): Observable<Grade[]> {
    return this.http.get<Grade[]>(this.apiUrl);
  }

  getGradeById(id: number): Observable<Grade> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Grade>(url);
  }

  saveGrade(grade: Grade) :Observable<Grade>{
    return this.http.post<Grade>(this.apiUrl,grade);
  }

  updateGrade(id:number, data:Grade) :Observable<Grade>{
    return this.http.patch<Grade>(`${this.apiUrl}/${id}`,data);
  }

  deleteGrade(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
