import { Routes } from '@angular/router';
import { Panel } from './components/panel/panel';
import {Details} from  './components/details/details';
import { Editar } from './components/editar/editar';
import { Registrar } from './components/registrar/registrar';
import { Eliminar } from './components/eliminar/eliminar';

export const routes: Routes = [
  {
    path:'',
    component:Panel
  },
  //ruta de detalle y recibe el id
  {
    path:'details/:id',
    component:Details
  },
  {
    path:'editar/:id',
    component:Editar
  },
  {
    path:'eliminar/:id',
    component:Eliminar
  },
  {
    path:'registrar',
    component:Registrar
  },
  //ruta inicial
  {
    path:'',
    redirectTo:'panel',
    pathMatch:'full'
  }
];
