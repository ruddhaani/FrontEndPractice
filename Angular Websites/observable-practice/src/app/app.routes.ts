import { Routes } from '@angular/router';
<<<<<<< Updated upstream
<<<<<<< Updated upstream

export const routes: Routes = [];
=======
=======
>>>>>>> Stashed changes
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { EmployeeComponent } from './components/employee/employee.component';
export const routes: Routes = [
    {
        path : "" , 
        component : HomeComponent
    },
    {
        path : "about",
        component : AboutComponent
    },
    {
        path : "contact",
        component: ContactComponent
    },
    {
        path : "employees",
        component : EmployeeComponent
    }
];
>>>>>>> Stashed changes
