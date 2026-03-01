import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { Properties } from './pages/properties/properties';
import { About } from './pages/about/about';
import { Contact } from './pages/contact/contact';
import { Register } from './pages/register/register';
import { PropertyDetail } from './pages/property-detail/property-detail';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { ManageProperties } from './pages/manage-properties/manage-properties';
import { EditProperty } from './components/edit-property/edit-property';
import { InquiriesPage } from './pages/inquiries/inquiries';
import { MyProperties } from './pages/my-properties/my-properties';
import { UserManagementPage } from './pages/users/users';
import { SavedProperties } from './pages/saved-properties/saved-properties';
import { MyProfileComponent } from './pages/my-profile/my-profile';

export const routes: Routes = [
    {
        path: 'profile',
        component: MyProfileComponent
    },
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
        path: 'about',
        component: About
    },
    {
        path: 'contact',
        component: Contact
    },
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: 'manage-properties',
        component: ManageProperties
    },
    {
        path: 'my-properties',
        component: MyProperties
    },
    {
        path: 'edit-property',
        component: EditProperty
    },
    {
        path: 'inquiries',
        component: InquiriesPage
    },
    {
        path: 'users',
        component: UserManagementPage
    },
    {
        path: 'saved-properties',
        component: SavedProperties
    }
];
