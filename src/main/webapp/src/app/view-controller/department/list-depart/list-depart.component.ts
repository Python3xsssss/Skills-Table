import { Component, OnInit } from '@angular/core';

import {Router} from "@angular/router";
import {DepartmentService} from "../../../service/department.service";
import {Department} from "../../../model/department.model";

@Component({
  selector: 'app-list-depart',
  templateUrl: './list-depart.component.html',
  styleUrls: ['./list-depart.component.css']
})
export class ListDepartComponent implements OnInit {

  constructor(private router: Router, private departService: DepartmentService) {
  }

  departments: Department[] = [];

  ngOnInit() {
    this.departService.getDepartments()
      .subscribe(data => {
        this.departments = data.result;
      });
  }

  deleteDepart(department: Department): void {
    this.departService.deleteDepartment(department.id)
      .subscribe(data => {
        this.departments = this.departments.filter(d => d !== department);
      })
  };

  addDepart(): void {
    this.router.navigate(['add-depart']);
  };
}