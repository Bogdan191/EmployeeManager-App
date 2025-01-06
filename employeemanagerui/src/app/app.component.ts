import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EmployeesComponent } from './employee/employees.component';
import { CommonModule } from '@angular/common';
import { Employee } from './employee/employee';

@Component({
  selector: 'app-root',
  imports: [CommonModule,  EmployeesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  {
  title = 'employeemanagerui';
  showEmployees = true; 
  hideEmployees = false; 
 
  toggleEmployees() {
    var aux = this.showEmployees;
    this.showEmployees = this.hideEmployees;
    this.hideEmployees = aux; 
  }

}
