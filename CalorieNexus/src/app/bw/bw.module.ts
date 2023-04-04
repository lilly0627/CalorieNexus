import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BwPageRoutingModule } from './bw-routing.module';

import { BwPage } from './bw.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BwPageRoutingModule
  ],
  declarations: [BwPage]
})
export class BwPageModule {}
