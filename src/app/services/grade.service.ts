import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Grade} from "../models/grade.model";

@Injectable({
  providedIn: 'root'
})
export class GradeService {
  private apiUrl = 'http://localhost:8080/api/grades'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  getAllGrades(): Observable<Grade[]> {
    return this.http.get<Grade[]>(this.apiUrl);
  }

  getGradeById(id: number): Observable<Grade> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Grade>(url);
  }
}
