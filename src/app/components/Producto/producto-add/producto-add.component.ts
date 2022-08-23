import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from 'src/app/@core/backends/shared/services/producto.service';

@Component({
  selector: 'app-producto-add',
  templateUrl: './producto-add.component.html',
  styleUrls: ['./producto-add.component.css'],
})
export class ProductoAddComponent implements OnInit {

  ProductoForm!: FormGroup;
  private alive = true;
  idProducto!: string | null;
  titulo = 'Agregar Producto';

  constructor(
    private productoService: ProductoService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.idProducto = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.ProductoForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      valor_Unitario: ['', Validators.required],
      stock: ['', Validators.required],
    });

    this.editar();
  }

  editar() {
    if (this.idProducto !== null && this.idProducto !== undefined) {
      this.titulo = 'Editar Producto';
      this.productoService.obtenerPorId(this.idProducto).subscribe((res) => {
        console.log(res);
        this.ProductoForm.patchValue(res);
      });
    }
  }

  agregarEditarProducto() {
    if (this.idProducto === null) {
      this.agregarProducto();
    } else {
      this.editarProducto(this.idProducto);
    }
  }

  agregarProducto() {
    let formProducto = this.ProductoForm.value;

    this.productoService
      .crear(formProducto)
      .subscribe(() => this.router.navigate(['/producto']));
  }

  editarProducto(id: string) {
    let formProducto = this.ProductoForm.value;
    this.productoService.editar(id, formProducto).subscribe((res) => {
      this.router.navigate(['/producto']);
    });
  }

  ngOnDestroy() {
    this.alive = false;
  }

}
