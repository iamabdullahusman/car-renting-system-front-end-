import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { Car } from '../../../../Cars';

@Component({
  selector: 'app-post-car',
  templateUrl: './post-car.component.html',
  styleUrl: './post-car.component.css'
})
export class PostCarComponent implements OnInit {

  postCarForm!: FormGroup;
  selectedFile: File | null | undefined;
  isSpinning!: false;
  imagePreview: string | ArrayBuffer | null | undefined;
  listOfColors: any[] = [];

  listOfOption: Array<{ label: string, value: string }> = [];
  listOfBrands: string[] = ["KIA", "HONDA", "UBU", "VOLVO", "TOYOTA", "BMW", "AUDI", "NISSAN", "MERCEEDES", "SUZUKI"];
  listOfType: string[] = ["Hybrid", "Manual", "Automatic", "Electric"];
  listOfColor: string[] = ["Red", "Green", "Black", "Brown", "White", "Dark White"];
  listOfTransmission: string[] = ["Manual", "Automatic"];


  constructor(private fb: FormBuilder, private adminService: AdminService) { }
  ngOnInit(): void {
    this.listOfColors = ["Red", "Green", "Blue"];
    this.postCarForm = this.fb.group({
      brand: [null, Validators.required],
      name: [null, Validators.required],
      type: [null, Validators.required],
      transmission: [null, Validators.required],
      color: [null, Validators.required],
      // year: [null,[ Validators.required,Validators.pattern('^[0-9]{4}$')]],
      price: [null, Validators.required],
      description: [null, Validators.required],
    });

  }



  postCar() : void {
    console.log("Posting car:", this.postCarForm.value);

    console.log(this.postCarForm.value);
    if (this.postCarForm.valid) {

      this.adminService.postCar(this.postCarForm.value)
        .subscribe(
          (response: any) => {
            console.log("Car posted successfully:", response);
            // Reset the form after successful submission
            this.postCarForm.reset();
            // Optionally, provide user feedback for successful submission
          },
          (error: any) => {
            console.error("Error posting car:", error);
            // Optionally, handle the error and provide user feedback
          }
        );
    } else {
      // Handle the case where the form is invalid
      console.error("Form is invalid. Cannot submit.");
    }
  }
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.previewImage();

  }
  previewImage() {
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(this.selectedFile as Blob);
    }
  }


}
