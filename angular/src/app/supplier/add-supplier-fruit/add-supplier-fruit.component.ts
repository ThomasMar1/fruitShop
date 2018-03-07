import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef, OnInit } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { SupplierServiceProxy, AddFruitDto, SupplierDto, SupplierFruitDto, FruitApplicationServiceProxy, Fruitdto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/app-component-base';

import * as _ from "lodash";


@Component({
  selector: 'app-add-supplier-fruit',
  templateUrl: './add-supplier-fruit.component.html',
})
export class AddSupplierFruitComponent extends AppComponentBase implements OnInit {

  @ViewChild('addSupplierFruitModal') modal: ModalDirective;
  @ViewChild('modalContent') modalContent: ElementRef;

  saving: boolean = false;
  active: boolean = false;
  fruits: AddFruitDto = new AddFruitDto();
  fruitList: Fruitdto[] = [];
  supplierId: number;

  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();


  constructor(
    injector: Injector,
    private _fruitService: FruitApplicationServiceProxy,
    private _supplierService: SupplierServiceProxy,
  ) {
    super(injector);
    this.getFruits();
  }

  ngOnInit() {
  }

  show(id:number): void {
    this.supplierId = id;
    this.fruits = new AddFruitDto();
    this.modal.show();
  }

  onShown(): void {
    $.AdminBSB.input.activate($(this.modalContent.nativeElement));
  }

  save(): void {
    if (this.fruits.fruitId==null){
      abp.message.error("Please select a fruit", "No fruit selected")

    }
    else{
      this.fruits.supplierId = this.supplierId;
      this.saving = true;
      this._supplierService.addFruit(this.fruits)
        .finally(() => { this.saving = false; })
        .subscribe(() => {
          this.notify.success("Successfully added fruit");
          this.close();
          this.modalSave.emit(null);
        });
    }

  }

  close(): void {
    this.active = false;
    this.modal.hide();
  }


  getFruits() {
    this._fruitService.getAll('', 0, 500)
      .finally(() => {
      })
      .subscribe((result) => {
        this.fruitList = result.items;
      });

  }




}
