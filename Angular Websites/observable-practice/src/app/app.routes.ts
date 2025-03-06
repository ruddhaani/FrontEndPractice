import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';

export const routes: Routes = [
    {
        path : "",
        component : HomeComponent
    },
    {
        path : "employees",
        component : EmployeeComponent
    },
    {
        path : "contact",
        component : ContactComponent
    },
    {
        path : "about",
        component : AboutComponent
    }
];
