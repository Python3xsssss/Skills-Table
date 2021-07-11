import { Component, OnInit } from '@angular/core';

import {Router} from "@angular/router";
import {TeamService} from "../../../service/team.service";
import {Team} from "../../../model/team.model";

@Component({
  selector: 'app-list-team',
  templateUrl: './list-team.component.html',
  styleUrls: ['./list-team.component.css']
})
export class ListTeamComponent implements OnInit {

  constructor(private router: Router, private teamService: TeamService) {
  }

  teams: Team[] = [];

  ngOnInit() {
    this.teamService.getTeams()
      .subscribe(data => {
        this.teams = data.result;
      });
  }

  deleteTeam(team: Team): void {
    this.teamService.deleteTeam(team.id)
      .subscribe(data => {
        this.teams = this.teams.filter(t => t !== team);
      })
  };

  addTeam(): void {
    this.router.navigate(['add-team']);
  };
}