/// <reference types="@types/googlemaps" />;
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Service, Station } from 'src/app/models/station.class';
import { EditStationComponent } from '../edit-station/edit-station.component';
import { GoogleMap } from '@angular/google-maps'
import { AppComponent } from 'src/app/app.component';
import { MatTableDataSource, _MatTableDataSource } from '@angular/material/table';
import { } from '@angular/google-maps'
import { ExternalIdModalComponent } from '../external-id/externalid-modal.component';



@Component({
    selector: 'app-stations',
    templateUrl: './stations.component.html',
    styleUrls: ['./stations.component.scss'],
})

export class StationsComponent implements OnInit {
    @ViewChild('gmap') gmapElement: any;
    map!: google.maps.Map;
    latitude!: number;
    longitude!: number;
    radioSelected: any;

    stationDetails!: MatTableDataSource<Station>;
    // center!: google.maps.LatLngLiteral;

    tableTitles = ['Kart', 'Chain', 'Region', 'Stasjon', 'Type', 'Adresse', 'Sted', 'Responsible', 'Operasjoner'];

    constructor(
        public dialog: MatDialog,
        public appService: AppComponent
    ) {

    }

    async ngOnInit() {
        await this.appService.getMessage().then(stations => {
            this.stationDetails = new MatTableDataSource(stations)
            // this.stationDetails.data.push(x);

            console.log(this.stationDetails);
        })
        //set a new filterPredicate function
        this.stationDetails.filterPredicate = (data, filter: string) => {
            const accumulator = (currentTerm: any, key: any) => {
                return this.nestedFilterCheck(currentTerm, data, key);
            };
            const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
            // Transform the filter by converting it to lowercase and removing whitespace.
            const transformedFilter = filter.trim().toLowerCase();
            return dataStr.indexOf(transformedFilter) !== -1;
        }
        let mapProp = {
            center: new google.maps.LatLng(60.4720, 8.4689),
            zoom: 6,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
        };
        this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);

        const location = { lat: 60.4720, lng: 8.4689 };
        const marker = new google.maps.Marker({
            position: location,
            map: this.map
        });

        const location2 = { lat: 59.763506521788514, lng: 5.4568209757864174 };
        const marker2 = new google.maps.Marker({
            position: location2,
            map: this.map
        });

        console.log(this.stationDetails);
    }



    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.stationDetails.filter = filterValue.trim().toLowerCase();
    }

    nestedFilterCheck(search: any, data: any, key: any) {
        if (typeof data[key] === 'object') {
            for (const k in data[key]) {
                if (data[key][k] !== null) {
                    search = this.nestedFilterCheck(search, data[key], k);
                }
            }
        } else {
            search += data[key];
        }
        return search;
    }


    setCenter(e: any, row: Station) {
        if (row.location.coordinates[1] === undefined) {
            this.latitude = 60.4720;
            this.longitude = 8.4689;
            this.map.setZoom(6);
        } else {
            this.latitude = row.location.coordinates[1];
            this.longitude = row.location.coordinates[0];
            this.map.setZoom(15);
        }
        const location = { lat: this.latitude, lng: this.longitude };
        // e.preventDefault();
        this.map.setCenter(new google.maps.LatLng(this.latitude, this.longitude));


        const marker = new google.maps.Marker({
            position: location,
            map: this.map
        })
    }

    editStation(keyword: string, station?: Station) {
        console.log(station);
        const savedStation: any = [];

        this.stationDetails.data.forEach(val => savedStation.push(Object.assign({}, val)));
        if (keyword === 'add') {
            station = new Station();
            station.id = 123;
            station.branch = 'YX';
            this.stationDetails.data.push(station);
            this.stationDetails.data = [...this.stationDetails.data];
        }
        const dialogRef = this.dialog.open(EditStationComponent, {
            data: {
                'station': station,
                'keyword': keyword,
            },
            panelClass: 'custom-modalbox'
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result === 'close') {
                console.log(savedStation);
                this.stationDetails.data = savedStation;
            }
        });
    }

    tankDetailsOpen(keyword: string, stationDetail: any) {
        console.log(stationDetail);
        const dialogRef = this.dialog.open(ExternalIdModalComponent, {
            data: {
                'keyword': keyword,
                'tanks': stationDetail.tanks
            }
        })
    }
}
