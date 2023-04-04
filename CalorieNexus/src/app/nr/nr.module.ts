import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NrPageRoutingModule } from './nr-routing.module';

import { NrPage } from './nr.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NrPageRoutingModule
  ],
  declarations: [NrPage]
})
export class NrPageModule {}
