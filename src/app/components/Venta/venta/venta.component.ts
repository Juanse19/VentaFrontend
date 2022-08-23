import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommandColumnService, CommandModel, EditService, FilterSettingsModel, PageService, ToolbarItems, ToolbarService } from '@syncfusion/ej2-angular-grids';
import { ClienteService } from 'src/app/@core/backends/shared/services/cliente.service';
import { ProductoService } from 'src/app/@core/backends/shared/services/producto.service';
import { VentaService } from 'src/app/@core/backends/shared/services/venta.service';
import { ClienteDTO } from 'src/app/@core/models/cliente.interface';
import { ProductoDTO } from 'src/app/@core/models/producto.interface';
import { DetalleVentaDTO, VentaDTO } from 'src/app/@core/models/venta.interface';
import Swal from 'sweetalert2';


let PRODUCTOLISTA: DetalleVentaDTO;
{

};

let VENTALISTA: VentaDTO;

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  providers: [ToolbarService, EditService, PageService, CommandColumnService],
  styleUrls: ['./venta.component.css']
})
export class VentaComponent implements OnInit {

  ventaForm!: FormGroup

  public clienteData!: ClienteDTO[];
  public productoData!: ProductoDTO[];
  public dataProducto: DetalleVentaDTO[] = [];
  public prodDetalle = PRODUCTOLISTA;
  private alive = true;

  public editSettings?: Object;
  public toolbar!: ToolbarItems[] | object;
  public editparams!: Object;
  public pageSettings!: Object;
  public filterOptions!: FilterSettingsModel;
  public commands!: CommandModel[];

  constructor(private clienteService: ClienteService,
              private productoService: ProductoService,
              private ventaService: VentaService,
              private formBuilder: FormBuilder,
              private router: Router,) { }

  public fields: Object = { text: 'nombre', value: 'idCliente' };
  public fields1: Object = { text: 'nombre', value: 'idProducto' };

  ngOnInit(): void {
    this.Cargarcliente();
    this.cargarProducto();
    this.FormularioVenta();

  }

  FormularioVenta(){
    this.ventaForm = this.formBuilder.group({
      idCliente: ['', Validators.required],
      idProducto: ['', Validators.required],
      cantidad: ['', Validators.required],
      listaProductos: {
        idProducto: ['', Validators.required],
        nombre: ['', Validators.required],
        valor_Unitario: ['', Validators.required],
        cantidad: ['', Validators.required],
        valor_Total: ['', Validators.required],
      }

    })
  }

  agregarProducto(){

      this.productoService.obtenerPorId(this.ventaForm.value.idProducto)
      .subscribe((res: any) => {

         PRODUCTOLISTA = {
          idProducto: res.idProducto,
          nombre: res.nombre,
          cantidad: this.ventaForm.value.cantidad,
          valor_Unitario: res.valor_Unitario,
          valor_Total: res.valor_Unitario * this.ventaForm.value.cantidad,
        }

        var obj = new Array(PRODUCTOLISTA);
        console.log('Detail', obj[0]);

        this.dataProducto.push(obj[0]);

        this.ventaForm.patchValue({
          idProducto: null,
          cantidad: '',
        });

      });



  }

  seleccionarProducto(item: DetalleVentaDTO){
    if (this.ventaForm.valid) {
        this.agregarProducto();
    } else {
      console.log('Ingresa producto');
    }
  }

  Cargarcliente(){
    this.clienteService.obtenerTodos()
    .subscribe(res => {
      this.clienteData = res;
    }, error => console.log(error));
  }

  cargarProducto() {
    this.productoService.obtenerTodos()
    .subscribe(res => {
      this.productoData = res;
    }, error => console.log(error));

  }

  borrarFila(cod: number) {
      this.dataProducto.splice(cod, 1);
      this.dataProducto;
  }

  GuardarVenta() {

    VENTALISTA = {
      idCliente: this.ventaForm.value.idCliente,
      listaProductos: this.dataProducto
    }

    this.ventaService
      .crear(VENTALISTA)
      .subscribe((res: any) => {
        Swal.fire(
          'Venta exitosa!',
          'success'
        )
        this.ventaForm.patchValue({
          idProducto: null,
          cantidad: '',
        });
        this.dataProducto = []
        this.router.navigate(['/venta'])
      }, erro => console.log);

  }

  ngOnDestroy() {
    this.alive = false;
  }

}
