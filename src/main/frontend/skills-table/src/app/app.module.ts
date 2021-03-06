import {ErrorHandler, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';
import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {AppRoutingModule} from './app-routing.module';
import {MdbAccordionModule} from 'mdb-angular-ui-kit/accordion';
import {MdbCarouselModule} from 'mdb-angular-ui-kit/carousel';
import {MdbCheckboxModule} from 'mdb-angular-ui-kit/checkbox';
import {MdbCollapseModule} from 'mdb-angular-ui-kit/collapse';
import {MdbDropdownModule} from 'mdb-angular-ui-kit/dropdown';
import {MdbFormsModule} from 'mdb-angular-ui-kit/forms';
import {MdbModalModule} from 'mdb-angular-ui-kit/modal';
import {MdbPopoverModule} from 'mdb-angular-ui-kit/popover';
import {MdbRadioModule} from 'mdb-angular-ui-kit/radio';
import {MdbRangeModule} from 'mdb-angular-ui-kit/range';
import {MdbRippleModule} from 'mdb-angular-ui-kit/ripple';
import {MdbScrollspyModule} from 'mdb-angular-ui-kit/scrollspy';
import {MdbTabsModule} from 'mdb-angular-ui-kit/tabs';
import {MdbTooltipModule} from 'mdb-angular-ui-kit/tooltip';
import {MdbValidationModule} from 'mdb-angular-ui-kit/validation';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppComponent} from './app.component';
import {HomeComponent} from './view-controller/home/home.component';
import {AddUserComponent} from './view-controller/user/add-user/add-user.component';
import {ListUserComponent} from './view-controller/user/list-user/list-user.component';
import {FormDepartComponent} from './view-controller/department/form-depart/form-depart.component';
import {ListDepartComponent} from './view-controller/department/list-depart/list-depart.component';
import {FormTeamComponent} from "./view-controller/team/form-team/form-team.component";
import {ListTeamComponent} from "./view-controller/team/list-team/list-team.component";
import {FormSkillComponent} from "./view-controller/skill/form-skill/form-skill.component";
import {ListSkillComponent} from "./view-controller/skill/list-skill/list-skill.component";
import {ShowTeamComponent} from "./view-controller/team/show-team/show-team.component";
import {ShowUserComponent} from './view-controller/user/show-user/show-user.component';
import {UpdateUserComponent} from './view-controller/user/update-user/update-user.component';
import {LoginComponent} from './view-controller/login/login.component';
import {ShowReportComponent} from './view-controller/team/show-report/show-report.component';
import {AuthService} from "./service/auth.service";
import {AuthInterceptor} from "./helper/auth.interceptor";

import {PlotlyViaCDNModule} from 'angular-plotly.js';
import {GlobalErrorHandler} from "./helper/global-error-handler";
import {MatSnackBarModule} from "@angular/material/snack-bar";

PlotlyViaCDNModule.setPlotlyVersion(`latest`); // can be `latest` or any version number (i.e.: '1.40.0')
PlotlyViaCDNModule.setPlotlyBundle('basic'); // optional: can be null (for full) or 'basic', 'cartesian', 'geo', 'gl3d', 'gl2d', 'mapbox' or 'finance'


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,

    AddUserComponent,
    ListUserComponent,
    ShowUserComponent,
    UpdateUserComponent,

    FormDepartComponent,
    ListDepartComponent,

    FormTeamComponent,
    ListTeamComponent,
    ShowTeamComponent,
    ShowReportComponent,

    FormSkillComponent,
    ListSkillComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MdbAccordionModule,
    MdbCarouselModule,
    MdbCheckboxModule,
    MdbCollapseModule,
    MdbDropdownModule,
    MdbFormsModule,
    MdbModalModule,
    MdbPopoverModule,
    MdbRadioModule,
    MdbRangeModule,
    MdbRippleModule,
    MdbScrollspyModule,
    MdbTabsModule,
    MdbTooltipModule,
    MdbValidationModule,
    BrowserAnimationsModule,
    PlotlyViaCDNModule,
    FormsModule,
    MatSnackBarModule
  ],
  providers: [AuthService,
    {provide: ErrorHandler, useClass: GlobalErrorHandler},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
