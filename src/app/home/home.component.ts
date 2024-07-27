import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MovieGenre } from '../core/movie.interface';
import { MoviesService } from '../api/movies.service';
import { MovieListComponent } from '../features/movie-list/movie-list.component';
import { HeaderCarouselComponent } from '../features/header-carousel/header-carousel.component';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../api/auth.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, RouterOutlet, MovieListComponent, HeaderCarouselComponent, MatButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  constructor(private router: Router) { };
  
  private moviesSvc = inject(MoviesService)
  private authSvc = inject(AuthService)

  moviesGenres: MovieGenre[] = []

  ngOnInit(): void {
    this.getMovieGenres()
  }

  getMovieGenres() {
    this.moviesSvc.getMoviesGenres().subscribe({
      next: (res:any) => {
        this.moviesGenres = res.genres as MovieGenre[]; 
      },
      error: (error) => console.log(error)
    })
  }

  logOut() {
    this.authSvc.logout()
    this.router.navigate(['login'])
  }
}
