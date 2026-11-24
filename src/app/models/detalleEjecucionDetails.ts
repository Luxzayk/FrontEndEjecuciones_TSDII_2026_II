
export interface CabeceraEjecucion{
  idCabeceraEjecucion:number;
  cliente:string;
  registro:string;

}

export interface DetalleEjecucion{
  idDetalleEjecucion:number;
  descripcion:string;
  cantidad:number;
  importe:number;
  igv:number;
  total:number;
  registro:string;
  idCabeceraEjecucion:number;
  cabeceraEjecucion:CabeceraEjecucion;
}
