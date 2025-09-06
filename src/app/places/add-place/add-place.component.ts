import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlaceService } from 'src/app/services/place.service';
import { AddPlaceRequest } from 'src/app/shared/models/addPlace.model';

@Component({
  selector: 'app-add-place',
  templateUrl: './add-place.component.html',
  styleUrls: ['./add-place.component.css']
})
export class AddPlaceComponent {

  addPlaceForm!: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder,
    private addPlaceService: PlaceService
  ) {}

  ngOnInit(): void {
    this.addPlaceForm = this.fb.group({
      name: ['', [Validators.required]],
      country: ['', [Validators.required]],
      city: ['', [Validators.required]],
      description: ['', [Validators.required]],
      hashtag: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.addPlaceForm.invalid) {
      return;
    }

    const data: AddPlaceRequest = {
      name: this.addPlaceForm.value.name,
      country: this.addPlaceForm.value.country,
      city: this.addPlaceForm.value.city,
      description: this.addPlaceForm.value.description,
      hashtag: this.addPlaceForm.value.hashtag
    };

    console.log('data:', data);
    

    this.addPlaceService.addPlace(data).subscribe({
      next: (res) => {
        console.log('Place added:', res);
      },
      error: (err) => {
        console.error('Adding place failed:', err);        
      }
    });
  }
}
