import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { ExternalId, GeoPosition, Service, Station, Tank } from 'src/app/models/station.class';


import { map, reduce, startWith } from 'rxjs/operators';
import Swal from 'sweetalert2'
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ServiceModalComponent } from '../service/service-modal.component';
import { ExternalIdModalComponent } from '../external-id/externalid-modal.component';
import { TankModalComponent } from '../tank/tank-modal.component';
import { AppComponent } from 'src/app/app.component';

@Component({
    selector: 'app-edit-station',
    templateUrl: './edit-station.component.html',
    styleUrls: ['./edit-station.component.scss']

})
export class EditStationComponent implements OnInit {
    step = 0;
    savedStation: Station;
    // tableTitles = ['Navn', 'Fra Dato', 'Til Dato', 'Beskrivelse', 'Operations'];
    serviceTitles = ['Type', 'Operations'];
    externalTitles = ['Partner', 'System', 'Id', 'Operations'];
    tankTitles = ['Navn', 'Produkt', 'Kapasitet', 'Autotelling', 'Operations'];
    stationResponsibles = ['Ola Jensen', 'Kristian Nordmann', 'Martin Fjell', 'Morten Olsen'];
    geoLength: number;
    geoWidth: number;
    filteredResponsibles: Observable<string[]>;
    myControl = new FormControl();

    constructor(
        public dialog: MatDialog,
        @Inject(MAT_DIALOG_DATA) public data: {
            keyword: string,
            station: Station,
        }) {
        this.savedStation = new Station();
        this.geoLength = 0;
        this.geoWidth = 0;
        this.filteredResponsibles = new Observable();

        // if (this.data.keyword === 'edit') {
        //     if (this.data.station.geoposition === null || this.data.station.geoposition === undefined) {
        //         this.data.station.geoposition = new GeoPosition();
        //     } else {
        //         this.geoLength = this.data.station.geoposition.length;
        //         this.geoWidth = this.data.station.geoposition.width;
        //     }
        // } else if (this.data.keyword === 'add') {
        //     this.geoLength = 0;
        //     this.geoWidth = 0;
        // }

    }

    ngOnInit() {

        this.savedStation = Object.assign({}, this.data.station);
        console.log(this.data.station);
        console.log(this.data.station.services);

        for (let cord of this.data.station.location.coordinates) {
            console.log(cord);
        }
    }



    filterStates(value: string) {
        if (value) {
            const filterValue = value.toLowerCase();
            return this.stationResponsibles.filter(responsible => responsible.toLowerCase().startsWith(filterValue));
        }
        return this.stationResponsibles;
    }

    // onCancel() {
    //     this.data.station = { ...this.savedStation };
    //     console.log(this.data.station);
    //     console.log(this.savedStation);

    // }

    // Services
    editService(keyword: string, service?: any) {
        const savedServices: any = [];
        this.data.station.services.forEach(value => savedServices.push(value));
        if (keyword === 'add') {
            service = new Service();
            this.data.station.services.push(service);
            this.data.station.services = [...this.data.station.services]
        }
        const dialogRef = this.dialog.open(ServiceModalComponent, {
            data: {
                'keyword': keyword,
                'service': service,
            }
        });

        dialogRef.afterClosed().subscribe((result: string) => {
            if (result === 'close') {
                this.data.station.services = savedServices;
            } else {
                (console.log('hei'))
            }
        });
    }
    deleteService(row: Service) {
        // Swal.fire({
        //     title: 'Er du sikker du vil slette ' + row.name + '?',
        //     text: 'Du vil ikke kunne gjenopprette denne tjenesten',
        //     icon: 'warning',
        //     showCancelButton: true,
        //     confirmButtonText: 'Slett',
        //     confirmButtonColor: 'red',
        //     cancelButtonText: 'Avbryt'
        // }).then((result: any) => {
        //     if (result.value) {
        //         let index = this.data.station.services.indexOf(row);
        //         this.data.station.services.splice(index, 1);
        //         console.log(this.data.station.services);
        //         this.data.station.services = [...this.data.station.services];
        //         Swal.fire(
        //             'Tjeneste slettet'
        //         )
        //     }
        // })

    }

    // External Ids
    editExternalId(keyword: string, externalId?: ExternalId) {
        // const savedExternals: any = [];
        // this.data.station.externalIds.forEach(val => savedExternals.push(Object.assign({}, val)));
        // if (keyword === 'add') {
        //     externalId = new ExternalId();
        //     this.data.station.externalIds.push(externalId);
        //     this.data.station.externalIds = [...this.data.station.externalIds]
        // }
        // const dialogRef = this.dialog.open(ExternalIdModalComponent, {
        //     data: {
        //         'keyword': keyword,
        //         'externalId': externalId,
        //     }
        // });

        // dialogRef.afterClosed().subscribe((result: string) => {
        //     if (result === 'close') {
        //         this.data.station.externalIds = savedExternals;
        //     }
        // });
    }

    deleteExternalId(row: ExternalId) {
        // Swal.fire({
        //     title: 'Er du sikker du vil slette ' + row.partner + '?',
        //     text: 'Du vil ikke kunne gjenopprette denne Id',
        //     icon: 'warning',
        //     showCancelButton: true,
        //     confirmButtonText: 'Slett',
        //     confirmButtonColor: 'red',
        //     cancelButtonText: 'Avbryt'
        // }).then((result: any) => {
        //     if (result.value) {
        //         let index = this.data.station.externalIds.indexOf(row);
        //         this.data.station.externalIds.splice(index, 1);
        //         console.log(this.data.station.externalIds);
        //         this.data.station.externalIds = [...this.data.station.externalIds];
        //         Swal.fire(
        //             'Ekstern ID slettet'
        //         )
        //     }
        // })
    }

    // Tanks
    editTank(keyword: string, tank?: Tank) {
        const savedTanks: any = [];
        this.data.station.tanks.forEach(val => savedTanks.push(Object.assign({}, val)));
        if (keyword === 'add') {
            tank = new Tank();
            this.data.station.tanks.push(tank);
            this.data.station.tanks = [...this.data.station.tanks]
        }
        const dialogRef = this.dialog.open(TankModalComponent, {
            data: {
                'keyword': keyword,
                'tank': tank,
            }
        });

        dialogRef.afterClosed().subscribe((result: string) => {
            if (result === 'close') {
                this.data.station.tanks = savedTanks;
            }
        });
    }

    deleteTank(row: Tank) {
        console.log(row);
        Swal.fire({
            title: 'Er du sikker du vil slette ' + row.name + '?',
            text: 'Du vil ikke kunne gjenopprette denne tanken',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Slett',
            confirmButtonColor: 'red',
            cancelButtonText: 'Avbryt'
        }).then((result: any) => {
            if (result.value) {
                let index = this.data.station.tanks.indexOf(row);
                this.data.station.tanks.splice(index, 1);
                console.log(this.data.station.tanks);
                this.data.station.tanks = [...this.data.station.tanks];
                Swal.fire({
                    text: 'Tank slettet',
                    confirmButtonColor: '#6e7d88'
                }
                )
            }
        })
    }

    setStep(index: number) {
        this.step = index;
    }

    nextStep() {
        this.step++;
    }

    prevStep() {
        this.step--;
    }
}

