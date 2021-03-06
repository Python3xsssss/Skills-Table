import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../../../service/user.service";
import {Department} from "../../../model/department.model";
import {Team} from "../../../model/team.model";
import {DepartmentService} from "../../../service/department.service";
import {TeamService} from "../../../service/team.service";
import {User} from "../../../model/user.model";
import {Position} from "../../../model/position.model";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  userForm!: FormGroup;
  departments: Department[] = [];
  teams: Team[] = [];
  teamsInDepart: Team[] = [];
  positions = Object.keys(Position).filter(key => isNaN(Number(key)));
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private departService: DepartmentService,
    private teamService: TeamService
  ) {
  }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirm_password: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: [''],
      about: [''],
      department: [null],
      team: [null],
      position: ['NEWCOMER', Validators.required]
    }, {
      validator: this.ConfirmedValidator('password', 'confirm_password')
    });

    this.departService.getDepartments()
      .subscribe((departments) => {
        this.departments = departments;
      });

    this.teamService.getTeams()
      .subscribe((teams) => {
        this.teams = teams;
      });
  }

  get f() {
    return this.userForm.controls;
  }

  ConfirmedValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({confirmedValidator: true});
      } else {
        matchingControl.setErrors(null);
      }
    }
  }

  onDepartSelect(departId: number | null) {
    this.teamsInDepart = [];
    for (let team of this.teams) {
      if (team.superior.id === Number(departId)) {
        this.teamsInDepart.push(team);
      }
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.userForm.invalid) {
      console.log("Form is invalid!");
      return;
    }

    let value = this.userForm.value;
    if (value.department === "null") {
      value.department = null;
      value.team = null;
    }
    if (value.team === "null") {
      value.team = null;
    }

    for (let depart of this.departments) {
      if (depart.id === Number(value.department)) {
        value.department = depart;
      }
    }

    for (let team of this.teams) {
      if (team.id === Number(value.team)) {
        value.team = team;
      }
    }

    let user: User = value;
    user.isNonLocked = true;
    user.isActive = true;
    user.roles = [];
    user.roles.push('USER');

    this.userService.createUser(user)
      .subscribe((user) => {
        this.router.navigate(['user', user.id]);
      });
  }

}
