import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StationsComponent } from './stations/stations.component';
import { RouterModule, Routes } from '@angular/router';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { EditStationComponent } from './edit-station/edit-station.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ExternalIdModalComponent } from './external-id/externalid-modal.component';
import { ServiceModalComponent } from './service/service-modal.component';
import { TankModalComponent } from './tank/tank-modal.component';





const routes: Routes = [{ path: '', component: StationsComponent }];

@NgModule({
    declarations: [
        StationsComponent,
        EditStationComponent,
        ExternalIdModalComponent,
        ServiceModalComponent,
        TankModalComponent],
    imports: [
        RouterModule.forChild(routes), CommonModule,
        FormsModule,
        MatTableModule,
        MatButtonModule,
        MatFormFieldModule,
        MatAutocompleteModule,
        MatExpansionModule,
        MatDialogModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSelectModule,
        MatCheckboxModule,
        MatSnackBarModule,
        MatSidenavModule,
        MatDialogModule,
        MatMenuModule,
        MatProgressBarModule,
        MatCardModule,
        MatIconModule,
        MatButtonModule,
        MatTooltipModule,
        MatExpansionModule,
        MatRadioModule],
    entryComponents: [
    ],

})
export class StationsModule { }
