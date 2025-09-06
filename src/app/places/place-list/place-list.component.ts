import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { PlaceService, RatingRequest } from 'src/app/services/place.service';
import { PlaceDTO } from 'src/app/shared/models/place.model';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-place-list',
  templateUrl: './place-list.component.html',
  styleUrl: './place-list.component.css'
})
export class PlaceListComponent implements OnInit {

  places: PlaceDTO[] = [];

  @ViewChild('ratingDialog') ratingDialog!: TemplateRef<any>;
  selectedPlace: PlaceDTO | undefined;
  score = 0;
  ratingDescription = '';
  ratingHashtag = '';
  currentDialogRef: any;
  ratingForm!: FormGroup;

  constructor(private placeService: PlaceService,
    private dialog: MatDialog,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.placeService.getAllPlaces().subscribe({
      next: (res) => {
        this.places = res;
        console.log(this.places);
      },
      error: (err) => {
        console.log(err);
      }
    })

    this.ratingForm = this.fb.group({
      description: ['', Validators.required],
      hashtag: ['', Validators.required]
    });
  }

  openRatingDialog(place: any) {
    this.selectedPlace = place;
    this.score = 0;
    this.ratingForm.reset();
    const dialogRef = this.dialog.open(this.ratingDialog, {
      width: '300px'
    });

    this.currentDialogRef = dialogRef;
  }

  selectRating(star: number) {
    this.score = star;
    console.log('Selected rating:', star);
  }

  submitRating() {
    if (this.ratingForm.invalid || this.score === 0) {
      console.log('Please select a star rating and fill required fields');
      return;
    }
    
    if (this.selectedPlace) {
      const data: RatingRequest = {
        placeId: this.selectedPlace.id,
        score: this.score,
        description: this.ratingForm.value.description,
        hashtag: this.ratingForm.value.hashtag
      };

      this.placeService.rate(data).subscribe({
        next: (updatedPlace) => {
          const index = this.places.findIndex(p => p.id === updatedPlace.id);
          if (index !== -1) {
            this.places[index] = updatedPlace;
            this.places = [...this.places];
          }
          
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
    
    this.currentDialogRef?.close();
  }
}
