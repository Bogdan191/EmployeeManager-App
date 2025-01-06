package com.dev.bogdan.employeemanager.service;

import com.dev.bogdan.employeemanager.exception.UserNotFoundException;
import com.dev.bogdan.employeemanager.model.Employee;
import com.dev.bogdan.employeemanager.repo.EmployeeRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class EmployeeService {
    private final EmployeeRepo employeeRepo;

    @Autowired
    public EmployeeService(EmployeeRepo employeeRepo) {
        this.employeeRepo = employeeRepo;
    }

    public Employee addEmployee(Employee employee) {
        employee.setEmployeeCode(UUID.randomUUID().toString());
        return employeeRepo.save(employee);
    }

    public List<Employee> findAllEmployees() {
        return employeeRepo.findAll();
    }

    public Employee editEmployee(Employee employee) {
        return employeeRepo.save(employee);
    }

    public Employee findEmployeeById(Long id) {
        return employeeRepo.findEmployeeById(id).orElseThrow(() -> new UserNotFoundException("User by id" + id + "was not found"));
    }

    public void deleteEmployeeById(Long id) {
        employeeRepo.delete(findEmployeeById(id));
    }
}
