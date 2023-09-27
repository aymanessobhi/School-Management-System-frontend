import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Parent} from "../models/parent.model";
import {Nationality} from "../models/Nationality.model";
import {BloodType} from "../models/BloodType.model";
import {Religion} from "../models/religion.model";

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

  getNationalities():Observable<Nationality[]> {
    return this.http.get<Nationality[]>(`${this.apiUrl}/api/nationalities`)
  }

  getBloodTypes() :Observable<BloodType[]> {
    return this.http.get<BloodType[]>(`${this.apiUrl}/api/typeBloods`)
  }

  getReligions() :Observable<Religion[]> {
    return this.http.get<Religion[]>(`${this.apiUrl}/api/religions`)
  }
  uploadParentFiles(parentId: number, files: File[]): Observable<any> {
    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append(`files`, file); // Use the correct parameter name 'files'
    });
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');

    // Use responseType: 'text' to indicate that you expect a non-JSON response
    return this.http.post(`${this.apiUrl}/api/parents/${parentId}/upload`, formData, {
      headers,
      responseType: 'text' // Set the response type to text
    });
  }
  getFilesByParentId(parentId: number): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/api/parents/${parentId}/files`);
  }

}
