import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductoCreacionDTO, ProductoDTO } from 'src/app/@core/models/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private urlApi = environment.urlApi + 'producto';

  constructor(private httpClient: HttpClient) { }

  public obtenerTodos() {
    return this.httpClient.get<ProductoDTO[]>(`${this.urlApi}/`);
  }

  public obtenerPorId(id: string) {
    return this.httpClient.get<ProductoDTO>(`${this.urlApi}/${id}`);
  }

  public crear(producto: ProductoCreacionDTO) {
    return this.httpClient.post(this.urlApi, producto);
  }

  public editar(id: string, producto: ProductoCreacionDTO) {
    return this.httpClient.put(`${this.urlApi}/${id}`, producto);
  }

  public borrar(id: number) {
    return this.httpClient.delete(`${this.urlApi}/${id}`);
  }

}
