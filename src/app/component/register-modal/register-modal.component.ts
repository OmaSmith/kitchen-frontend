import { Component, Inject, OnInit, Input, Output } from '@angular/core';
import { FormBuilder, FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { confirmPassValidator } from '../../confirmPass.validator';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { KitchenService } from '../../services/kitchen.service';
import { KitchenForm } from '../../models/kitchen_form.model';
import { Kitchen } from '../../models/kitchen.model';
import { MenuItems } from '../../models/kitchen_menu.model';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrl: './register-modal.component.css',
})

export class RegisterModalComponent implements OnInit {

  //---- VARIABLES AND CONSTRUCTORS ---------------------------------||
  
  kitchen_info: KitchenForm = {
    name: '',
    email: '',
    password: '',
    confirm_password: '',
    workingDays: [],
    start_time: '',
    end_time: ''
  }
  menus: MenuItems[];
  data: [{ item_name: '', item_type: '', item_price: '' }];
  days: Array<any> = [
    { name: 'Monday', value: 'MONDAY' },
    { name: 'Tuesday', value: 'TUESDAY' },
    { name: 'Wednesday', value: 'WEDNESDAY' },
    { name: 'Thursday', value: 'THURSDAY' },
    { name: 'Friday', value: 'FRIDAY' },
    { name: 'Saturday', value: 'SATURDAY' },
    { name: 'Sunday', value: 'SUNDAY' },
  ];
  registerForm = this.formBuilder.group({ //add validators later
    name: [''],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    confirm_pass: ['', [Validators.required]]
  });
  kitchenForm = this.formBuilder.group({
    working_days: this.formBuilder.array<String>([], [Validators.required]), 
    start_time: [''],
    end_time: [''],
    kitchen_menu: this.formBuilder.array([this.createItem()])
  })
  constructor(
    public dialogRef: MatDialogRef<RegisterModalComponent>, 
    private formBuilder: FormBuilder, 
    private kitchenServ: KitchenService,
    private menuServ: MenuService
  ) {}

  //---- FUNCTIONS --------------------------------------------------||

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  /* 
    saves kitchen information into kitchen_info.
    saves the kitchen to the database, while also
    saving the menu to the database, linked with
    the current kitchen id.
  */
  onSubmit(): void {
    this.kitchen_info = {
      name: this.registerForm.get('name').value,
      email: this.registerForm.get('email').value,
      password: this.registerForm.get('password').value,
      confirm_password: this.registerForm.get('confirm_pass').value,
      workingDays: this.kitchenForm.get('working_days').value,
      start_time: this.kitchenForm.get('start_time').value,
      end_time: this.kitchenForm.get('end_time').value
    }
    this.kitchenServ.saveKitchen(this.kitchen_info).subscribe((kitchen: Kitchen) => {
      this.kitchenServ.setKitchen(kitchen);
      this.kitchenForm.controls['kitchen_menu'].value.map(
        menu => {
          this.menuServ.saveMenu({
            kitchen_id: this.kitchenServ.kitchen.id,
            name: menu.item_name,
            price: +menu.item_price,
            type: menu.item_type
          }).subscribe(res => alert("Kitchen created successfully!"))
          // ideally, redirect to login page after alert message
        }
      )
    })
    
  }
  // adds checkbox values to "working_days" array
  onCheckChange(e, day_val: string): void {
    const formArray: FormArray = this.kitchenForm.get('working_days') as FormArray;
    
    if(e.checked){
      formArray.push(new FormControl(day_val));
      console.log(formArray)
    }
    else {
      let idx = formArray.controls.findIndex(x => x.value == day_val);
      formArray.removeAt(idx);
      console.log(formArray)
    }
  }
  // connected to button on "menu items" in the html
  createItem() {
    return this.formBuilder.group({
      item_name: [''],
      item_type: [''],
      item_price: ['']
    })
  }
  // adds a new "form group" with the menu items to the form array
  addNext() {
    (this.kitchenForm.controls['kitchen_menu'] as FormArray).push(this.createItem());
  }
  // deletes a "form group" for menu items from the form array
  deleteGroup(index: number) {
    (this.kitchenForm.controls['kitchen_menu'] as FormArray).removeAt(index);
  }
}
