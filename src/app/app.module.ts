import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CoreModule } from './@core/core.module';

import { MaterialModule } from './material/material.module';

import { MenuComponent } from './components/menu/menu.component';

import { MostrarErroresComponent } from './utilidades/mostrar-errores/mostrar-errores.component';

import { DropDownListAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { ClienteAddComponent } from './components/Cliente/cliente-add/cliente-add.component';
import { ClienteListComponent } from './components/Cliente/cliente-list/cliente-list.component';
import { ProductoAddComponent } from './components/Producto/producto-add/producto-add.component';
import { ProductoListComponent } from './components/Producto/producto-list/producto-list.component';
import { DatePickerAllModule, TimePickerAllModule, DateTimePickerAllModule } from '@syncfusion/ej2-angular-calendars';
import { DateTimePickerModule } from '@syncfusion/ej2-angular-calendars';
import { FilterService, GridModule, GroupService, PageService, SortService } from '@syncfusion/ej2-angular-grids';
import { VentaComponent } from './components/Venta/venta/venta.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ClienteAddComponent,
    ClienteListComponent,
    ProductoAddComponent,
    ProductoListComponent,
    MostrarErroresComponent,
    VentaComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    GridModule,
    DropDownListAllModule,
    DatePickerAllModule,
    TimePickerAllModule,
    DateTimePickerAllModule,
    DateTimePickerModule,
  ],
  providers: [PageService, SortService, FilterService, GroupService, FilterService, SortService,],
  bootstrap: [AppComponent]
})
export class AppModule { }
