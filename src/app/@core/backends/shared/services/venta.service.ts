import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { VentaDTO } from 'src/app/@core/models/venta.interface';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  private urlApi = environment.urlApi + 'venta/Registrar';

  constructor(private httpClient: HttpClient) { }

  public crear(venta: VentaDTO) {
    return this.httpClient.post(this.urlApi, venta);
  }

}
