import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {SkillService} from "../../../service/skill.service";

@Component({
  selector: 'app-add-skill',
  templateUrl: './add-skill.component.html',
  styleUrls: ['./add-skill.component.css']
})
export class AddSkillComponent implements OnInit {
  addForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private skillService: SkillService) {
  }

  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      id: [],
      name: ['', Validators.required],
      about: ['', Validators.required],
    });

  }

  onSubmit() {
    this.skillService.createSkill(this.addForm.value)
      .subscribe(data => {
        this.router.navigate(['home']);
      });
  }

}