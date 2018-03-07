import { Component, Injector, ViewChild } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { SupplierServiceProxy, SupplierDto, PagedResultDtoOfSupplierDto, UpdateSupplier, } from '@shared/service-proxies/service-proxies';
import { PagedListingComponentBase, PagedRequestDto } from "shared/paged-listing-component-base";
import { AddSupplierComponent } from "app/supplier/add-supplier/add-supplier.component";
import { EditSupplierComponent } from "app/supplier/edit-supplier/edit-supplier.component";
import { ViewSupplierComponent } from 'app/supplier/view-supplier/view-supplier.component';



@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  animations: [appModuleAnimation()]

})
export class SupplierComponent extends PagedListingComponentBase<SupplierDto> {

  @ViewChild('addSupplierModal') addSupplierModal: AddSupplierComponent;
  @ViewChild('editSupplierModal') editSupplierModal: EditSupplierComponent;
  @ViewChild('viewSupplierComponenet') view: ViewSupplierComponent;
  hidden = false;

  suppliers: SupplierDto[] = [];

  constructor(
    injector: Injector,
    private _supplierService: SupplierServiceProxy
  ) {
    super(injector);
  }

  
  list(request: PagedRequestDto, pageNumber: number, finishedCallback: Function): void {
    this._supplierService.getAll('', request.skipCount, request.maxResultCount)
      .finally(() => {
        finishedCallback();
      })
      .subscribe((result: PagedResultDtoOfSupplierDto) => {
        this.suppliers = result.items;
        this.showPaging(result, pageNumber);
      });
  }


  protected delete(suppliers: SupplierDto): void {
    abp.message.confirm(
      "Delete '" + suppliers.name + "'?",
      (result: boolean) => {
        if (result) {
          this._supplierService.delete(suppliers.id)
            .subscribe(() => {
              abp.notify.success("Deleted " + suppliers.name);
              this.refresh();
            });
        }
      }
    );


  }
  addSupplier(): void {
    this.addSupplierModal.show();
  }

  editSupplier(suppliers: UpdateSupplier): void {
    this.editSupplierModal.show(suppliers.id);
  }




}
