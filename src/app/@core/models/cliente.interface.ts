export interface ClienteDTO {
  idCliente?: number;
  cedula?: string;
  nombre?: string;
  apellido?: string;
  telefono?: string;
}

export interface ClienteCreacionDTO {
  cedula?: string;
  nombre?: string;
  apellido?: string;
  telefono?: string;
}
