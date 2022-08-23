import { Component, Injectable, OnInit, ViewEncapsulation } from '@angular/core';
import { CommandColumnService, CommandModel, EditService, FilterSettingsModel, PageService, ToolbarItems, ToolbarService } from '@syncfusion/ej2-angular-grids';
import { ClienteService } from 'src/app/@core/backends/shared/services/cliente.service';
import { ClienteDTO } from 'src/app/@core/models/cliente.interface';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ClienteAddComponent } from '../cliente-add/cliente-add.component';

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  providers: [ToolbarService, EditService, PageService, CommandColumnService],
  styleUrls: ['./cliente-list.component.css'],
  encapsulation: ViewEncapsulation.None,
})
@Injectable({
  providedIn: "root",
})
export class ClienteListComponent implements OnInit {

  public clienteData!: ClienteDTO[];
  private alive = true;


  public editSettings?: Object;
  public toolbar!: ToolbarItems[] | object;
  public editparams!: Object;
  public pageSettings!: Object;
  public filterOptions!: FilterSettingsModel;
  public commands!: CommandModel[];

  constructor(private clienteService: ClienteService,
              private router: Router,
              // private clienteAdd: ClienteAddComponent
              ) { }

  ngOnInit(): void {
    this.cargarCliente();

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



  cargarCliente() {
    this.clienteService.obtenerTodos()
    .subscribe(res => {
      this.clienteData = res;
      // console.log('data: ', this.clienteData);
    }, error => console.log(error));

  }

  actionBegin(args: any) {
    if (args.requestType == 'beginEdit') {

      args.cancel = true;
      // this.clienteAdd.edit( args.rowData);
      this.router.navigate([`cliente/editar/${args.rowData.idCliente}`]);
      console.log('IdCliente', args.rowData);
    }

    if (( args.requestType === 'delete')) {

      Swal.fire({
        title: '¿Estás seguro que quieres eliminar el cliente?',
        text: `¡Se eliminará el cliente!`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '¡Sí, Eliminar!'
      }).then(result => {
        // debugger
        if (result.value) {

          this.clienteService.borrar(args.data[0].idCliente)
          .subscribe(res => {

            this.cargarCliente();

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
