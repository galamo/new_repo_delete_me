import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, Validators, AbstractControl, ValidatorFn } from "@angular/forms"

interface IMeal {
  rating: number,
  image?: string,
  filename?: string,
  title: string,
  description: string
}
@Component({
  selector: 'app-add-meal',
  templateUrl: './add-meal.component.html',
  styleUrls: ['./add-meal.component.css']
})
export class AddMealComponent implements OnInit {
  @Output() addNewMealEvent = new EventEmitter<IMeal>()
  public mealForm: any
  public mealNameErrors: Array<string>
  constructor(private formBuilder: FormBuilder) {
    this.mealNameErrors = [];
    this.mealForm = this.formBuilder.group({
      mealName: new FormControl("", [Validators.required, Validators.maxLength(15), Validators.minLength(5)]),
      mealImage: new FormControl("", [Validators.required, forbiddenNameValidator()]),
      mealRating: 0,
      mealDescription: ""
    })
  }
  addNewMeal() {
    this.mealNameErrors = []
    //tests
    // console.log("mealName", this.mealForm.get("mealName"))
    // console.log("mealImage", this.mealForm.get("mealImage").status)
    // console.log("mealRating", this.mealForm.get("mealRating").status)
    // console.log("mealDescription", this.mealForm.get("mealDescription").status)
    console.log("form", this.mealForm.controls)

    this.collectErrors()

    const formInvalid = this.mealForm.status === "INVALID"
    if (formInvalid) return;
    const newMeal: IMeal = {
      description: this.mealForm.get("mealDescription").value,
      title: this.mealForm.get("mealName").value,
      rating: this.mealForm.get("mealRating").value,
      image: this.mealForm.get("mealImage").value,
    }
    this.addNewMealEvent.emit(newMeal)
  }
  collectErrors() {
    const errors = Object.keys(this.mealForm.get("mealName").errors);
    this.mealNameErrors = errors;
  }
  resetMeal() {
    this.mealForm.reset()
  }
  ngOnInit(): void {
  }

}


export function forbiddenNameValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const forbidden = control.value === "http";
    return forbidden ? { forbiddenName: { value: control.value } } : null;
  };
}

