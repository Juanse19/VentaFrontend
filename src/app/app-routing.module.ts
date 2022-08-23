import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteAddComponent } from './components/Cliente/cliente-add/cliente-add.component';
import { ClienteListComponent } from './components/Cliente/cliente-list/cliente-list.component';
import { ProductoAddComponent } from './components/Producto/producto-add/producto-add.component';
import { ProductoListComponent } from './components/Producto/producto-list/producto-list.component';
import { VentaComponent } from './components/Venta/venta/venta.component';




const routes: Routes = [
  {
    path: '',
    component: VentaComponent
  },
  {
    path: 'cliente',
    component: ClienteListComponent
  },
  {
    path: 'cliente/crear',
    component: ClienteAddComponent
  },
  {
    path: 'cliente/editar/:id',
    component: ClienteAddComponent
  },
  {
    path: 'producto',
    component: ProductoListComponent
  },
  {
    path: 'producto/crear',
    component: ProductoAddComponent
  },
  {
    path: 'producto/editar/:id',
    component: ProductoAddComponent
  },
  {
    path: 'venta',
    component: VentaComponent
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
