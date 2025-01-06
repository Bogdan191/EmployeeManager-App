import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { EmployeeService } from "./employee.service";
import { Employee } from "./employee";


@Component({
    standalone: true, 
    selector: 'api-employees', 
    templateUrl: './employees.template.html',
    imports: [CommonModule, FormsModule],
    providers: [EmployeeService],
    styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
    employees: Employee[] = []; 
    
    constructor (private employeeService: EmployeeService) {}

    ngOnInit() {
        this.getEmployees();
    }

    

    getEmployees() : void {
        this.employeeService.getEmployees().subscribe(employees => (this.employees = employees));
    }

    
       
}

