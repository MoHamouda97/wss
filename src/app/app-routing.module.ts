import { Routes } from '@angular/router';
import { FullPageComponent } from './full-page/full-page.component';

export const routes: Routes = [
  {
    path: '',
    component: FullPageComponent,
    children: [
      {
        path: 'grid',
        loadChildren: () => import('./grid/grid.module').then(m => m.GridModule)
      },
      {
        path: 'generic-grid',
        loadChildren: () => import('./generic-grid-container/generic-grid-container.module').then(m => m.GenericGridContainerModule)
      },
      {
        path: 'info-grid',
        loadChildren: () => import('./generic-info-grid-container/generic-info-grid-container.module').then(m => m.GenericInfoGridContainerModule)
      },
      {
        path: 'map',
        loadChildren: () => import('./g-map/g-map.module').then(m => m.GMapModule)
      },
      {
        path: 'captcha',
        loadChildren: () => import('./captcha/captcha.module').then(m => m.CaptchaModule)
      },
      {
        path: 'custom-map',
        loadChildren: () => import('./custom-map/custom-map.module').then(m => m.CustomMapModule)
      },
      {
        path: 'leaflet',
        loadChildren: () => import('./leaflet/leaflet.module').then(m => m.LeafletModule)
      },
      {
        path: 'generic-tbl',
        loadChildren: () => import('./generic-tbl-container/generic-tbl-container.module').then(m => m.GenericTblContainerModule)
      }
    ]
  }
];
