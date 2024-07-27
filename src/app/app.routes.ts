import { Routes } from '@angular/router';
import { MovieListComponent } from './features/movie-list/movie-list.component';
import { MovieCardComponent } from './features/movie-card/movie-card.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    { path: 'movie-list', component: MovieListComponent },
    { path: 'movie-card', component: MovieCardComponent },
    { path: 'home', component: HomeComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', redirectTo: '/login' }
];
