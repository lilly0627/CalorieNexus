import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NrPage } from './nr.page';

const routes: Routes = [
  {
    path: '',
    component: NrPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NrPageRoutingModule {}
