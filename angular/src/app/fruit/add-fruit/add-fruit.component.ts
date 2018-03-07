import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef, OnInit } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { FruitApplicationServiceProxy, AddFruit, SupplierDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/app-component-base';

import * as _ from "lodash";

@Component({
  selector: 'app-add-fruit',
  templateUrl: './add-fruit.component.html'
})

export class AddFruitComponent extends AppComponentBase {

    @ViewChild('addFruitModal') modal: ModalDirective;
    @ViewChild('modalContent') modalContent: ElementRef;
    @ViewChild('fruitname') fruitNameInput: ElementRef;

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
    
    active: boolean = false;
    saving: boolean = false;
    fruits: AddFruit = new AddFruit();

    constructor(
        injector: Injector,
        private _fruitService: FruitApplicationServiceProxy
    ) {
        super(injector);
    }

    show(): void {
        this.fruits = new AddFruit();
        this.modal.show();
    }
    
    onShown(): void {
        $.AdminBSB.input.activate($(this.modalContent.nativeElement));
    }

    save(): void {
        this.saving = true;
        this._fruitService.create(this.fruits)
            .finally(() => { this.saving = false; })
            .subscribe(() => {
                this.notify.success("Successfully added fruit: " + this.fruits.name );
                this.close();
                this.modalSave.emit(null);
            });
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }
}
