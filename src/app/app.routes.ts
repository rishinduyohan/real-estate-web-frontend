import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { Properties } from './pages/properties/properties';
import { Agents } from './pages/agents/agents';
import { About } from './pages/about/about';
import { Contact } from './pages/contact/contact';
import { Register } from './pages/register/register';
import { PropertyDetail } from './pages/property-detail/property-detail';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { ManageProperties } from './pages/manage-properties/manage-properties';
import { EditProperty } from './components/edit-property/edit-property';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: Register
    },
    {
        path: 'properties',
        component: Properties
    },
    {
        path: 'propertyDetail/:id',
        component: PropertyDetail
    },
    {
        path: 'agents',
        component: Agents
    },
    {
        path: 'about',
        component:About
    },
    {
        path:'contact',
        component:Contact
    },
    {
        path:'dashboard',
        component: DashboardComponent
    },
    {
        path: 'manage-properties',
        component: ManageProperties
    },
    {
        path:'edit-property',
        component:EditProperty
    }
];
