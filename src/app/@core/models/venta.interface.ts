// export interface VentaDTO {
//   idVenta: number;
//   idCliente: number;
//   listaProductos: [
//     {
//       idProducto: string;
//       nombre: string;
//       valor_Unitario: number;
//       stock: number;
//       cantidad: number;
//       valor_Total: number;
//     }
//   ]
// }

import { ProductoDTO } from "./producto.interface";

export interface VentaDTO {
  idCliente?: number;
  listaProductos?: DetalleVentaDTO[];
}

export interface DetalleVentaDTO {
  idProducto?: number;
  nombre?: string;
  cantidad?: number;
  valor_Unitario?: number;
  valor_Total?: number;
}

