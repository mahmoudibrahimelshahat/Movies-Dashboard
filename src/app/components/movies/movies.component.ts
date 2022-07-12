import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { Movie } from 'src/app/models/movie';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  movies: Movie[] = []
  catList: Category[] = []
  imagePrefix: string = "https://test-api.storexweb.com/";
  selectedMovie: Movie;

  bioSection: FormGroup
  displayImage: any




  constructor(private movieService: MoviesService, private formBuilder: FormBuilder) {

    this.bioSection = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      category_id: ['', Validators.required],
      image: ['', Validators.required],
    });

  }

  ngOnInit(): void {

    this._getMovies()
  }


  private _getMovies() {
    this.movieService.getCategories().subscribe((cat) => {
      this.catList = cat.message
    })

    this.movieService.getMovies().subscribe((movies) => {
      this.movies = movies.message
    });


  }


  // here i pass or spread object in property to able to delete the object + i move it to new model out for loop 
  selectMovie(movie: Movie) {
    this.selectedMovie = { ...movie }
  }

  deleteMovie(selected: Movie | undefined) {
    this.movieService.deleteMovie(selected?.id!).subscribe(() => {
      this.movies = this.movies.filter(el => {
        return el.id !== selected?.id
      })
    })
  }

  reset() {
    this.bioSection.reset();
    this.displayImage = null
  }

  uploadFile(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.bioSection.patchValue({ image: file });
      this.bioSection.get('image')!.updateValueAndValidity();
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.displayImage = fileReader.result
      }
      fileReader.readAsDataURL(file)

    }
  }


  toggleMovieUpdate(selectedeed: Movie){
    this.selectedMovie = {...selectedeed}
    this.bioSection.patchValue({
      name : selectedeed?.name,
      description : selectedeed?.description,
      category_id : selectedeed?.category_id,
      image: selectedeed?.image,
    })        
    this.displayImage= `${this.imagePrefix}${selectedeed.image}`
   }


   editUser(){
    const formData = new FormData();
    Object.keys(this.bioSection.controls).map((key) => {
      formData.append(key, this.bioSection.controls[key].value);
    });
     const {id} = this.selectedMovie;
     this.movieService.editMovie(formData,id).subscribe((res)=>{      
       const index = this.movies.findIndex(u => u.id === id);
       this.movies[index] = {...res.message,id}
       this.selectedMovie = {}
     })
   }




  callingFunction(form: FormGroup) {
    const formData = new FormData();
    Object.keys(this.bioSection.controls).map((key) => {
      formData.append(key, this.bioSection.controls[key].value);
    });
    if (form.valid) {
      this.movieService.postMovie(formData).subscribe((data) => {
        this.movies.push(data.message)
        form.reset();
        this.displayImage = null
      }, error => console.log(error))
    }
  }


}

