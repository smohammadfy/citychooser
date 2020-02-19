import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {ElementRef, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatDialog} from '@angular/material';
@Component({
  selector: 'app-citychooser',
  templateUrl: './citychooser.component.html',
  styleUrls: ['./citychooser.component.sass']
})
export class CitychooserComponent implements OnInit {

  selectable = true;
  res: string;
  responseokey = 'درخواست شما با موفقیت ثبت شد';
  responsefailed = 'درخواست شما ناموفق بود';
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl();
  filteredFruits: Observable<string[]>;
  fruits: string[] = [];
  allFruits: string[] = [
    'تهران',
    'کیش'
  ];

  @ViewChild('fruitInput', {static: false}) fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', {static: false}) matAutocomplete: MatAutocomplete;
  title = '';
  categories: string;

  constructor() {
    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => fruit ? this._filter(fruit) : this.allFruits.slice()));
    this.res = this.responsefailed;
  }

  ngOnInit() {
  }

  add(event: MatChipInputEvent): void {
    // Add fruit only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add our fruit
      if ((value || '').trim()) {
        this.fruits.push(value.trim());
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.fruitCtrl.setValue(null);
    }
  }

  remove(fruit: string): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.fruits.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allFruits.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
  }

  submit() {
    for (const fruit of this.fruits) {
      this.categories += (this.allFruits.indexOf(fruit) + 1) + ',';
    }
    this.categories = this.categories.slice(0, -1);
    this.categories = this.categories.replace('undefined', '');

  }
}
