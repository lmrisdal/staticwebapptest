import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Service, Station } from 'src/app/models/station.class';
import { EditStationComponent } from '../edit-station/edit-station.component';
import { GoogleMap } from '@angular/google-maps'
import { AppComponent } from 'src/app/app.component';
import { MatTableDataSource, _MatTableDataSource } from '@angular/material/table';

// const ELEMENT_DATA: Station[] = [
//     {
//         id: 332,
//         siteId: 10400332,
//         name: "YX-Mones",
//         displayName: "YX Mones",
//         branch: "YX",
//         region: "Sør",
//         type: "Drivstoff",
//         phone: "38 26 49 00",
//         email: "mones@st.yx.no",
//         owner: "Vidar Bergheim",
//         responsible: "Vidar Bergheim",
//         address: {
//             street: "Skogsfjordveien 148",
//             postalCode: 4513,
//             city: "Mandal",
//             countryIsoTwoLetter: "NOR",
//             countryIsoThreeLetter: "NOR",
//             country: "Norge"
//         },
//         location: {
//             type: "Point",
//             coordinates: [
//                 7.4334901009825884,
//                 58.03952402813606
//             ]
//         },
//         services: [
//             "95 Blyfri",
//             "Diesel",
//             "YX Butikk"
//         ],
//         tanks: [
//             {
//                 id: 1,
//                 name: "Tank A1",
//                 tankGroupId: 1,
//                 fuelProductId: 99004,
//                 fuelProductSkanolProductId: 2017800,
//                 fuelProductName: "Diesel",
//                 Capasity: 20000,
//                 Auto: "on"
//             },
//             {
//                 id: 2,
//                 name: "Tank A2",
//                 tankGroupId: 1,
//                 fuelProductId: 99004,
//                 fuelProductSkanolProductId: 2017800,
//                 fuelProductName: "Diesel",
//                 Capasity: 25000,
//                 Auto: "on"
//             },
//             {
//                 id: 3,
//                 name: "Tank B1",
//                 tankGroupId: 2,
//                 fuelProductId: 99001,
//                 fuelProductSkanolProductId: 2013200,
//                 fuelProductName: "95 Blyfri",
//                 Capasity: 25000,
//                 Auto: "on"
//             },
//             {
//                 id: 4,
//                 name: "Tank A3",
//                 tankGroupId: 1,
//                 fuelProductId: 99004,
//                 fuelProductSkanolProductId: 2017800,
//                 fuelProductName: "Diesel",
//                 Capasity: 10000,
//                 Auto: "on"
//             }
//         ]
//     },
//     {
//         id: 353,
//         siteId: 10400353,
//         name: "YX-Stord",
//         displayName: "YX Stord",
//         branch: "YX",
//         region: "Vest",
//         type: "Drivstoff",
//         phone: "53 41 26 70",
//         email: "stord@st.yx.no",
//         owner: "Haldis Aase",
//         responsible: "Glenn Aase",
//         address: {
//             street: "Rundehaugen 15",
//             postalCode: 5412,
//             city: "Stord",
//             countryIsoTwoLetter: "NOR",
//             countryIsoThreeLetter: "NOR",
//             country: "Norge"
//         },
//         location: {
//             type: "Point",
//             coordinates: [
//                 5.4568209757864174,
//                 59.763506521788514
//             ]
//         },
//         services: [
//             "98 Blyfri",
//             "95 Blyfri",
//             "Diesel",
//             "Bilvask",
//             "7-eleven"
//         ],
//         tanks: [
//             {
//                 id: 1,
//                 name: "Tank A1",
//                 tankGroupId: 1,
//                 fuelProductId: 99004,
//                 fuelProductSkanolProductId: 2017800,
//                 fuelProductName: "Diesel",
//                 Capasity: 15000,
//                 Auto: "on"
//             },
//             {
//                 id: 2,
//                 name: "Tank C1",
//                 tankGroupId: 3,
//                 fuelProductId: 99005,
//                 fuelProductSkanolProductId: 2013100,
//                 fuelProductName: "98 Blyfri",
//                 Capasity: 20000,
//                 Auto: "on"
//             },
//             {
//                 id: 3,
//                 name: "Tank B1",
//                 tankGroupId: 2,
//                 fuelProductId: 99001,
//                 fuelProductSkanolProductId: 2013200,
//                 fuelProductName: "95 Blyfri",
//                 Capasity: 30000,
//                 Auto: "on"
//             },
//             {
//                 id: 4,
//                 name: "Tank A2",
//                 tankGroupId: 1,
//                 fuelProductId: 99004,
//                 fuelProductSkanolProductId: 2017800,
//                 fuelProductName: "Diesel",
//                 Capasity: 30000,
//                 Auto: "on"
//             }

//         ]
//     }
// ];


@Component({
    selector: 'app-stations',
    templateUrl: './stations.component.html',
    styleUrls: ['./stations.component.scss'],
})

export class StationsComponent implements OnInit {
    // @ViewChild(GoogleMap, { static: false }) map!: GoogleMap;
    stationDetails!: MatTableDataSource<Station>;
    service!: Service[];
    // center!: google.maps.LatLngLiteral;

    tableTitles = ['Chain', 'Region', 'Stasjon', 'Type', 'Adresse', 'Sted', 'Responsible', 'Operasjoner'];

    constructor(
        public dialog: MatDialog,
        public appService: AppComponent
    ) {
        // this.stationDetails = [];
        this.service = [];



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
        // navigator.geolocation.getCurrentPosition((position) => {
        //     this.center = {
        //         lat: position.coords.latitude,
        //         lng: position.coords.longitude
        //     }
        // })

        console.log(this.stationDetails);
    }

    initMap(): void {
        // The location of Uluru
        const uluru = { lat: -25.344, lng: 131.036 };
        // The map, centered at Uluru
        const map = new google.maps.Map(
            document.getElementById("map") as HTMLElement,
            {
                zoom: 4,
                center: uluru,
            }
        );

        // The marker, positioned at Uluru
        const marker = new google.maps.Marker({
            position: uluru,
            map: map,
        });
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
        // const dialogRef = this.dialog.open(TankDetailsModalComponent, {
        //   data: {
        //     'keyword': keyword,
        //     'tanks': stationDetail.tanks
        //   }
        // })
    }
}
