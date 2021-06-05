import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StationsComponent } from './stations/stations.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: StationsComponent }];

@NgModule({
    declarations: [StationsComponent],
    imports: [RouterModule.forChild(routes), CommonModule],
})
export class StationsModule {}
