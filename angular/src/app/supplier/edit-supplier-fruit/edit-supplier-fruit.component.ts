import { Component, ViewChild, Injector, Output, Input, OnInit, EventEmitter, ElementRef, Pipe, PipeTransform, NgModule } from '@angular/core';
import { AppComponentBase } from 'shared/app-component-base';
import { ModalDirective } from 'ngx-bootstrap';
import { SupplierServiceProxy, UpdateFruitDto, SupplierDto, SupplierFruitDto, FruitApplicationServiceProxy, Fruitdto } from '@shared/service-proxies/service-proxies';

import * as _ from "lodash";


@Component({
  selector: 'app-edit-supplier-fruit',
  templateUrl: './edit-supplier-fruit.component.html',
})
export class EditSupplierFruitComponent  extends AppComponentBase implements OnInit {

  @ViewChild('editSupplierFruitModal') modal: ModalDirective;
  @ViewChild('modalContent') modalContent: ElementRef;

  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

  active: boolean = false;
  saving: boolean = false;
  fruit: UpdateFruitDto = new UpdateFruitDto();
  fruitId: number;
  supplierId: number;
  sf: SupplierFruitDto[] = [];





  constructor(
    injector: Injector,
    private _fruitService: FruitApplicationServiceProxy,
    private _supplierService: SupplierServiceProxy,
  ) {
    super(injector);
  }


  show(f:number, s:number): void {
    this.fruitId = f;
    this.supplierId = s
    this.fruit = new UpdateFruitDto();
    this.modal.show();
    this.getAFruit();

  }

  onShown(): void {
    $.AdminBSB.input.activate($(this.modalContent.nativeElement));
  }

  save():void{
    {
      this.fruit.supplierId = this.supplierId;
      this.fruit.fruitId = this.fruitId;
      this.saving = true;
      this._supplierService.updateFruit(this.fruit)
        .finally(() => { this.saving = false; })
        .subscribe(() => {
          this.notify.success("Successfully updated fruit");
          this.close();
          this.modalSave.emit(null);
        });
    }
  }

  close(): void {
    this.active = false;
    this.modal.hide();
  }

  getAFruit() {
    this._supplierService.getAFruit(this.fruitId, this.supplierId)
      .subscribe((results: SupplierFruitDto[]) => {
        this.sf = results;

      });

  }

  ngOnInit() {

  }

}
