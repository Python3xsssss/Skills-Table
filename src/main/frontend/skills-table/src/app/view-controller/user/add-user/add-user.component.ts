import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../../../service/user.service";
import {Department} from "../../../model/department.model";
import {Team} from "../../../model/team.model";
import {DepartmentService} from "../../../service/department.service";
import {TeamService} from "../../../service/team.service";
import {Role} from "../../../model/role.model";
import {User} from "../../../model/user.model";
import {Position} from "../../../model/position.model";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  addForm!: FormGroup;
  departs: Department[] = [];
  teams: Team[] = [];
  teamsInDepart: Team[] = [];
  positions = Object.keys(Position).filter(key => isNaN(Number(key)));

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private departService: DepartmentService,
    private teamService: TeamService
  ) {
  }

  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      about: ['', Validators.required],
      department: [null, Validators.required],
      team: [null, Validators.required],
      position: ['NEWCOMER', Validators.required]
    });

    this.departService.getDepartments()
      .subscribe(data => {
        this.departs = data.result;
      });

    this.teamService.getTeams()
      .subscribe(data => {
        this.teams = data.result;
      });
  }

  onDepartSelect(departId: any) {
    this.teamsInDepart = [];
    for (let team of this.teams) {
      if (team.superior.id === Number(departId)) {
        this.teamsInDepart.push(team);
      }
    }
  }

  onSubmit() {
    let value = this.addForm.value;

    for (let depart of this.departs) {
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

    console.log(user);
    this.userService.createUser(user)
      .subscribe(data => {
        this.router.navigate(['users']);
      }, error => console.log(error));
  }

}