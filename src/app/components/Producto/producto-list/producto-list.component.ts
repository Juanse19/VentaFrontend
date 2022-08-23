import { Component, OnInit } from '@angular/core';
import { CommandColumnService, CommandModel, EditService, FilterSettingsModel, PageService, ToolbarItems, ToolbarService } from '@syncfusion/ej2-angular-grids';
import { ProductoService } from 'src/app/@core/backends/shared/services/producto.service';
import { ProductoDTO } from 'src/app/@core/models/producto.interface';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-producto-list',
  templateUrl: './producto-list.component.html',
  providers: [ToolbarService, EditService, PageService, CommandColumnService],
  styleUrls: ['./producto-list.component.css']
})
export class ProductoListComponent implements OnInit {

  public productoData!: ProductoDTO[];
  private alive = true;


  public editSettings?: Object;
  public toolbar!: ToolbarItems[] | object;
  public editparams!: Object;
  public pageSettings!: Object;
  public filterOptions!: FilterSettingsModel;
  public commands!: CommandModel[];

  constructor(private productoService: ProductoService,
              private router: Router) { }

  ngOnInit(): void {
    this.cargarProducto();

    this.editSettings = {
      allowEditing: true,
      allowAdding: true,
      allowDeleting: true,
      mode: 'Normal',
      allowEditOnDblClick: false
    };

    this.pageSettings = {
      pageSize: 10 };
    this.filterOptions = {
      type: 'Menu',
   };

   this.commands = [
    {
      type: 'Edit',
      buttonOption: { iconCss: ' e-icons e-edit', cssClass: 'e-flat' }
    },
    {
      type: 'Delete',
      buttonOption: { iconCss: 'e-icons e-delete', cssClass: 'e-flat' }
    }
  ];

  }

  cargarProducto() {
    this.productoService.obtenerTodos()
    .subscribe(res => {
      this.productoData = res;
      // console.log('dataCliente: ', this.productoData);
    }, error => console.log(error));

  }

  actionBegin(args: any) {
    if (args.requestType == 'beginEdit') {

      args.cancel = true;

      this.router.navigate([`producto/editar/${args.rowData.idProducto}`]);

    }

    if (( args.requestType === 'delete')) {

      Swal.fire({
        title: '¿Estás seguro que quieres eliminar el producto?',
        text: `¡Se eliminará el producto!`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '¡Sí, Eliminar!'
      }).then(result => {
        // debugger
        if (result.value) {

          this.productoService.borrar(args.data[0].idProducto)
          .subscribe(res => {

            this.cargarProducto();

          }, error => console.log(error));

          Swal.fire('¡Se Eliminó Exitosamente', 'success');


        }


       });
      args.cancel = true;
    }

  }

  ngOnDestroy() {
    this.alive = false;
  }

}
