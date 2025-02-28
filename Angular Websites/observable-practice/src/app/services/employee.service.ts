import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../models/employee';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private readonly BASE_URL:string = "http://localhost:5248/api/Employee";

  // paginatedDataSubject : BehaviorSubject<any> = new BehaviorSubject<any>(new Any);

  constructor(private http: HttpClient) {}
  
  createEmployee (employee:Employee) : Observable<HttpResponse<Employee>>{
    return this.http.post<Employee>(this.BASE_URL , employee , {
      observe : "response"
    });
  }

  getEmployees(pageNumber : number = 1 , pageSize : number = 2 , searchText : string = "" ) : Observable<HttpResponse<any>>{
    let url = `${this.BASE_URL}?pageNumber=${pageNumber}&pageSize=${pageSize}`;

    if(searchText!==""){
      url = `${this.BASE_URL}?pageNumber=${pageNumber}&pageSize=${pageSize}&searchText=${searchText}`;
    }
    return this.http.get(url , {
      observe : "response"
    })
  }
}
