import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { Properties } from './pages/properties/properties';
import { Agents } from './pages/agents/agents';
import { About } from './pages/about/about';

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
        path: 'properties',
        component: Properties
    },
    {
        path: 'agents',
        component: Agents
    },
    {
        path: 'about',
        component:About
    }
];
