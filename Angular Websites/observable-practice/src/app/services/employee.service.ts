import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../models/employee';
import { BehaviorSubject, Observable } from 'rxjs';
import { PeronalitySubject } from '../models/personalitySubject';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private readonly BASE_URL:string = "http://localhost:5248/api/Employee";

  paginatedDataSubject : PeronalitySubject<HttpResponse<any>> = new PeronalitySubject<HttpResponse<any>>(new HttpResponse());
  paginatedData$ : Observable<HttpResponse<any>> = this.paginatedDataSubject.asObservable();

  constructor(private http: HttpClient) {}
  
  createEmployee (employee:Employee) : Observable<HttpResponse<Employee>>{
    return this.http.post<Employee>(this.BASE_URL , employee , {
      observe : "response"
    });
  }

  getEmployees(pageNumber : number = 1 , pageSize : number = 2 , searchText : string = "" ){
    let url = `${this.BASE_URL}?pageNumber=${pageNumber}&pageSize=${pageSize}`;

    if(searchText!==""){
      url = `${this.BASE_URL}?pageNumber=${pageNumber}&pageSize=${pageSize}&searchText=${searchText}`;
    }
    this.http.get(url , {
      observe : "response"
    }).subscribe({
      "next" : (response : HttpResponse<any>) => {
        this.paginatedDataSubject.next(response);
      }
    })
  }
}
