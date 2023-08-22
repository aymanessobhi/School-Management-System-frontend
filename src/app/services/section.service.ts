import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Section} from "../models/section.model";

@Injectable({
  providedIn: 'root'
})
export class SectionService {

  private apiUrl = 'http://localhost:8080/api/sections'; // Replace with your API endpoint URL

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

  updateSection(section: Section): Observable<Section> {
    const url = `${this.apiUrl}/${section.id}`;
    return this.http.put<Section>(url, section);
  }

  deleteSection(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
