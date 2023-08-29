import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Section} from "../models/section.model";

@Injectable({
  providedIn: 'root'
})
export class SectionService {

  private apiUrl = 'http://localhost:8081/api/sections';

  constructor(private http: HttpClient) { }

  getSections(): Observable<Section[]> {
    return this.http.get<Section[]>(this.apiUrl);
  }
  getSectionById(id: number): Observable<Section> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Section>(url);
  }
  createSection(section: Section): Observable<Section> {
    return this.http.post<Section>(this.apiUrl, section);
  }
  updateSection(id : number,section: Section): Observable<Section> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.patch<Section>(url, section);
  }
  deleteSection(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
  getAllSectionsByGrade(id: number) : Observable<Section[]> {
    return this.http.get<Section[]>(`${this.apiUrl}/grade=${id}`);
  }
  statusSection(section: Section): Observable<Section> {
    const updatedSection = {
      ...section,
      status: section.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE'
    };
    return this.http.patch<Section>(`${this.apiUrl}/${section.id}`, updatedSection);
  }
}
