import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule, NgForm } from "@angular/forms";
import { EmployeeService } from "./employee.service";
import { Employee } from "./employee";
import { HttpErrorResponse } from "@angular/common/http";


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
    public editEmployee: Employee | undefined;
    public deleteEmployee: Employee | undefined;
    showEmployees = true; 
    hideEmployees = false; 
    constructor (private employeeService: EmployeeService) {
        
    }

    ngOnInit() {
        this.getEmployees();
    }

    toggleEmployees() {
        var aux = this.showEmployees;
        this.showEmployees = this.hideEmployees;
        this.hideEmployees = aux; 
      }

    getEmployees() : void {
        this.employeeService.getEmployees().subscribe(employees => (this.employees = employees));
    }

    public onAddEmployee(addForm: NgForm): void {
        document.getElementById('add-employee-form')?.click(); 
        this.employeeService.addEmployee(addForm.value).subscribe(
            (reposnse: Employee) => {
                console.log(reposnse);
                this.getEmployees();
                addForm.reset();
            },
            (error: HttpErrorResponse) => {
                alert(error.message);
                addForm.reset();
            }

        );
    }

    public onUpdateEmployee(employee: Employee) : void {
        this.employeeService.updateEmployee(employee).subscribe(
            (response: Employee) => {
                console.log(response); 
                this.getEmployees();
            },
            (error: HttpErrorResponse) => {
                alert(error.message);
                
            }
        );
    }

    public onDeleteEmployee(employeeId : number | undefined) : void {
        if(employeeId != undefined)
        this.employeeService.deleteEmployee(employeeId).subscribe(
            (response: void) => {
                console.log(response);
                alert('The employee was successfully removed'); 
                this.getEmployees();
            },
            (error: HttpErrorResponse) => {
                alert(error.message); 
            }
        );
    }


    
  public onOpenModal(employee: Employee | null, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addEmployeeModal');
    }
    if (mode === 'edit' && employee != null) {
      this.editEmployee = employee;
      button.setAttribute('data-target', '#updateEmployeeModal');
    }
    if (mode === 'delete' && employee != null) {
      this.deleteEmployee = employee;
      button.setAttribute('data-target', '#deleteEmployeeModal');
    }
   if(container != null) 
        container.appendChild(button);
        button.click();
  }
    
       
}

