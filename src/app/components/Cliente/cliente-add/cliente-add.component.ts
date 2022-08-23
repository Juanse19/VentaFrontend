import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from 'src/app/@core/backends/shared/services/cliente.service';
import { ClienteDTO } from 'src/app/@core/models/cliente.interface';

@Component({
  selector: 'app-cliente-add',
  templateUrl: './cliente-add.component.html',
  styleUrls: ['./cliente-add.component.css'],
})
export class ClienteAddComponent implements OnInit {

  formCliente!: FormGroup;
  private alive = true;
  idCliente!: string | null;
  titulo = 'Agregar Cliente';

  constructor(
    private formBuilder: FormBuilder,
    private clienteService: ClienteService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.idCliente = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.formCliente = this.formBuilder.group({
      cedula: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      telefono: ['', Validators.required],
    });

    this.editar();
  }

  editar() {
    if (this.idCliente !== null && this.idCliente !== undefined) {
      this.titulo = 'Editar Cliente';
      this.clienteService.obtenerPorId(this.idCliente).subscribe((res) => {
        console.log(res);
        this.formCliente.patchValue(res);
      });
    }
  }

  agregarEditarCliente() {
    if (this.idCliente === null) {
      this.agregarCliente();
    } else {
      this.editarCliente(this.idCliente);
    }
  }

  agregarCliente() {
    let formCliente = this.formCliente.value;

    this.clienteService
      .crear(formCliente)
      .subscribe(() => this.router.navigate(['/cliente']));
  }

  editarCliente(id: string) {
    let formCliente = this.formCliente.value;
    this.clienteService.editar(id, formCliente).subscribe((res) => {
      this.router.navigate(['/cliente']);
    });
  }

  ngOnDestroy() {
    this.alive = false;
  }

}
