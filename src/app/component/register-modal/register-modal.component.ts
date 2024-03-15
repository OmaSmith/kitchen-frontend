import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, Validators} from '@angular/forms';
import {KitchenService} from '../../services/kitchen.service';
import {Kitchen} from '../../models/kitchen.model';
import {MenuService} from '../../services/menu.service';

@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrl: './register-modal.component.css',
})
export class RegisterModalComponent implements OnInit {

  selectedFile: File;

  data: [{ item_name: '', item_type: '', item_price: '' }];
  days: Array<any> = [
    {name: 'Monday', value: 'MONDAY'},
    {name: 'Tuesday', value: 'TUESDAY'},
    {name: 'Wednesday', value: 'WEDNESDAY'},
    {name: 'Thursday', value: 'THURSDAY'},
    {name: 'Friday', value: 'FRIDAY'},
    {name: 'Saturday', value: 'SATURDAY'},
    {name: 'Sunday', value: 'SUNDAY'},];
  types: {name: string, value: string}[] = [
    {name: 'Vegan', value: 'VEGAN'},
    {name: 'Non-Vegan', value: "NON_VEGAN"}
  ]

  registerForm = this.formBuilder.group({ //add validators later
    name: [''],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    confirm_password: ['', [Validators.required]]
  });
  kitchenForm = this.formBuilder.group({
    working_days: this.formBuilder.array<String>([], [Validators.required]),
    start_time: [''],
    end_time: [''],
    kitchen_menu: this.formBuilder.array([this.createItem()])
  });

  constructor(private formBuilder: FormBuilder, private kitchenServ: KitchenService, private menuServ: MenuService) {
  }


  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  onSubmit(): void {
    const kitchenFormData: FormData = new FormData();
    kitchenFormData.append('name', this.registerForm.get('name').value);
    kitchenFormData.append('email', this.registerForm.get('email').value);
    kitchenFormData.append('password', this.registerForm.get('password').value);
    kitchenFormData.append('confirm_password', this.registerForm.get('confirm_password').value);
    kitchenFormData.append('workingDays', JSON.stringify(this.kitchenForm.get('working_days').value));
    kitchenFormData.append('start_time', `${this.kitchenForm.get('start_time').value}:00`);
    kitchenFormData.append('end_time', `${this.kitchenForm.get('end_time').value}:00`);
    kitchenFormData.append('file', this.selectedFile);

    this.kitchenServ.saveKitchen(kitchenFormData).subscribe(
      (kitchen: Kitchen): void => {
        this.kitchenServ.setKitchen(kitchen);
        this.kitchenForm.controls['kitchen_menu'].value.map(
          menu => {
            this.menuServ.saveMenu({
              kitchen_id: this.kitchenServ.kitchen.id,
              name: menu.item_name,
              price: +menu.item_price,
              type: menu.item_type
            }).subscribe((res: void) => alert("Kitchen created successfully!"))
          })
      })
  }

  // adds checkbox values to "working_days" array
  onCheckChange(e, day_val: string): void {
    const formArray: FormArray = this.kitchenForm.get('working_days') as FormArray;

    if (e.checked) {
      formArray.push(new FormControl(day_val));
      console.log(formArray)
    } else {
      let idx = formArray.controls.findIndex(x => x.value == day_val);
      formArray.removeAt(idx);
      console.log(formArray)
    }
  }

  // connected to button on "menu items" in the html
  createItem() {
    return this.formBuilder.group({
      item_name: [''], item_type: [''], item_price: ['']
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

  onFileSelected(event): void {
    this.selectedFile = event.target.files[0];
  }

}
