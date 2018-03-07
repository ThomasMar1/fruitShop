import { Component, Injector, AfterViewInit, ViewChild, OnInit, Input, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { SupplierComponent } from 'app/supplier/supplier.component';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { SupplierServiceProxy, UpdateSupplier, SupplierDto, SupplierFruitDto } from '@shared/service-proxies/service-proxies';
import 'rxjs/add/operator/switchMap';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { EditSupplierComponent } from "app/supplier/edit-supplier/edit-supplier.component";
import { EditSupplierFruitComponent } from 'app/supplier/edit-supplier-fruit/edit-supplier-fruit.component';
import { AddSupplierFruitComponent } from 'app/supplier/add-supplier-fruit/add-supplier-fruit.component';
import { CurrencyPipe } from "@angular/common"




@Component({
  selector: 'app-view-supplier',
  templateUrl: './view-supplier.component.html',
  animations: [appModuleAnimation()]

})
export class ViewSupplierComponent extends AppComponentBase implements OnInit, OnDestroy {
  //id: number;
  name: string;
  private supplier: any;
  suppliers: SupplierDto = new SupplierDto;
  sf: SupplierFruitDto[] = [];
  @ViewChild('editSupplierModal') editSupplierModal: EditSupplierComponent;
  @ViewChild('addSupplierFruitModal') addSupplierFruitModal: AddSupplierFruitComponent;
  @ViewChild('editSupplierFruitModal') editSupplierFruitModal: EditSupplierFruitComponent;



  @Input() id: number;

  editMode;


  //suppliers: UpdateSupplier = new UpdateSupplier();

  private fieldArray: Array<any> = [];
  private newAttribute: any = {};



  val: number;

  constructor(
    private route: ActivatedRoute,
    injector: Injector,
    private _supplierService: SupplierServiceProxy,
  ) {
    super(injector);
  }


  ngOnInit() {
    this.supplier = this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
    this.get(this.id)
    this.getFruits(this.id)

  }

  reload() {
    this.get(this.id);
    this.getFruits(this.id);
  }

  ngOnDestroy() {
    this.supplier.unsubscribe();
  }

  view() {
    alert(this.id);
    alert(this.name);
  }

  get(id: number): void {
    this._supplierService.get(this.id)
      .subscribe((result: SupplierDto) => {
        this.suppliers.name = result.name;
        this.suppliers.contact = result.contact;
        this.suppliers.phone = result.phone;
        this.suppliers.email = result.email;
      });
  }

  editSupplier(suppliers: UpdateSupplier): void {
    this.editSupplierModal.show(this.id);
  }

  addSupplierFruit(): void{
    this.addSupplierFruitModal.show(this.id);
  }

  editSupplierFruit(fruit: SupplierFruitDto): void{
    this.val = fruit.fruitId;
    this.editSupplierFruitModal.show(this.val, this.id);
  }



  getFruits(id: number) {
    this._supplierService.getFruits(this.id)
      .subscribe((results: SupplierFruitDto[]) => {
        this.sf = results;

      });

  }

  deleteSupplier(id: number) {
    alert("Do you want to delete supplier: " + this.id);
  }



  protected deleteFruit(fruit: SupplierFruitDto, supplier: SupplierDto): void {
    abp.message.confirm(
      "Delete " + fruit.name + " from supplier " + supplier.name + "?",
      (result: boolean) => {
        if (result) {
          this._supplierService.deleteFruit(this.id, fruit.fruitId)
            .subscribe(() => {
              abp.notify.success("Deleted " + fruit.name);
              this.getFruits(this.id);
            });
        }
      }
    );

  }


  



}
