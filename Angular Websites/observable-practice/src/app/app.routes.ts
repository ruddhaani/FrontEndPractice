import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { LifecycleMethodsComponent } from './components/lifecycle-methods/lifecycle-methods.component';
import { count } from 'rxjs';

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
    },{
        path : "lifecyclemethods",
        component : LifecycleMethodsComponent,
        data : {count : 20}
    }
];
