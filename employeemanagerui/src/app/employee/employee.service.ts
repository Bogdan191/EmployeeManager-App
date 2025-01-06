import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError } from "rxjs";
import { Employee } from "./employee";


const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: 'my-auth-token'
    })
  };

@Injectable()
export class EmployeeService { 
    employeesUrl = 'http://localhost:8080/employee'; 

    constructor(private http: HttpClient) {

    }

      /** GET employees from the server */
  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.employeesUrl}/all`)
      .pipe();
  }

  addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.employeesUrl}/add`, employee);
  }


}