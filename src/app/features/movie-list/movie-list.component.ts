import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {
  MatDialog,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { MoviesService } from '../../api/movies.service';
import { Movie } from '../../core/movie.interface';
import { environment } from '../../environments/environment.development';
import { MovieCardComponent } from '../movie-card/movie-card.component';

const { imgUrl } = environment;

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css'
})
export class MovieListComponent implements OnInit{

  @Input() movieGenreName!: String;
  @Input() movieGenreId!: Number;
  
  private moviesSvc = inject(MoviesService)
  readonly dialog = inject(MatDialog);

  movies: Movie[] = []

  ngOnInit(): void {
    this.loadMovies()
  }

  openDialog(movie: Movie): void {
    const dialogRef = this.dialog.open(MovieCardComponent, {
      data: movie,
    });

    dialogRef.afterClosed().subscribe(result => {});
  }

  loadMovies() {
    this.moviesSvc.getMoviesByGenres(this.movieGenreId).subscribe({
      next: (res:any) => {
        this.movies = res.results as Movie[];
      },
      error: (error) => console.log(error)
    })
  }

  getFullImageUrl(posterPath: String): String {
    return imgUrl + posterPath;
  }

  scrollMovies(scrollRight: Boolean) {
    const fila = document.getElementById(this.movieGenreId.toString()) as HTMLInputElement;

    if (scrollRight) {
      fila.scrollLeft +=  fila.offsetWidth
    } else {
      fila.scrollLeft -=  fila.offsetWidth
    }
  }
}
