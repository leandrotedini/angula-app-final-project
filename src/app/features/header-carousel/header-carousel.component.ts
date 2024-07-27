import { Component, inject, OnInit } from '@angular/core';
import { MoviesService } from '../../api/movies.service';
import { Movie, QueryResult } from '../../core/movie.interface';
import { environment } from '../../environments/environment.development';

const { imgUrl } = environment;

@Component({
  selector: 'app-header-carousel',
  standalone: true,
  imports: [],
  templateUrl: './header-carousel.component.html',
  styleUrl: './header-carousel.component.css'
})
export class HeaderCarouselComponent implements OnInit {

  private moviesSvc = inject(MoviesService)
  movies!: Movie[]

  ngOnInit(): void {
    this.loadMoviesTopRelated()
  }

  loadMoviesTopRelated() { }

}
