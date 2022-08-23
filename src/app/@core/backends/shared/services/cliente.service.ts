import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ClienteCreacionDTO, ClienteDTO } from 'src/app/@core/models/cliente.interface';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlApi = environment.urlApi + 'cliente';

  constructor(private httpClient: HttpClient) { }

  public obtenerTodos() {
    return this.httpClient.get<ClienteDTO[]>(`${this.urlApi}/`);
  }

  public obtenerPorId(id: string) {
    return this.httpClient.get<ClienteDTO>(`${this.urlApi}/${id}`);
  }

  public crear(cliente: ClienteCreacionDTO) {
    return this.httpClient.post(this.urlApi, cliente);
  }

  public editar(id: string, cliente: ClienteCreacionDTO) {
    return this.httpClient.put(`${this.urlApi}/${id}`, cliente);
  }

  public borrar(id: number) {
    return this.httpClient.delete(`${this.urlApi}/${id}`);
  }

}
