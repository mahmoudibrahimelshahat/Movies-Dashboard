import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { Movie } from 'src/app/models/movie';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
  id: string;
  moviesDetail: Movie;
  imagePrefix: string = "https://test-api.storexweb.com/";
  catList: Category[] = []
  

  constructor(
    private _activatedRoute: ActivatedRoute,
    private movieService: MoviesService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.movieService.getCategories().subscribe((cat) => {
      this.catList = cat.message
    })
    this.id = this._activatedRoute.snapshot.params?.['id'];

    this.movieService.getMovieDetails(this.id).subscribe((res) => {
      this.moviesDetail = res.message;
    });
  }
}
