import { Component, OnInit } from '@angular/core';
import { ProfileManagementService } from './profile-management.service';
import { AppService } from '../app.service';
import { tokenName } from '../../environments';
import { IUsers } from '../models/users';
import * as moment from 'moment';

interface marker {
    lat: number;
    lng: number;
    label?: string;
    draggable: boolean;
}

@Component({
    selector: 'app-profile-management',
    templateUrl: './profile-management.component.html',
    styleUrls: ['./profile-management.component.scss']
})
export class ProfileManagementComponent implements OnInit {
    imageLink: string = '';

    pieChartColors: any[] = [{
        backgroundColor: ['#f44336', '#3f51b5', '#ffeb3b', '#4caf50', '#2196f']
    }];

    pieOptions: any = {
        responsive: true,
        legend: {
            position: 'right'
        }
    };

    zoom: number = 10;
    title: string = 'Vị Trí Trên Bản Đồ';
    lat: number = 10.036344152103853;
    lng: number = 105.78569861415724;

    getlocation(str) {
        if (str) {
            var lat = str.split(', ')[0].slice(0, -1);
            var long = str.split(', ')[1].slice(0, -1);
            return {
                lat: (lat.split(" ")[0] - 0) + (lat.split(" ")[1] / 60) + (lat.split(" ")[2] / 3600),
                long: (long.split(" ")[0] - 0) + (long.split(" ")[1] / 60) + (long.split(" ")[2] / 3600)
            }
        }
        return {
            lat: undefined,
            long: undefined
        }
    }

    // thong tin user
    private userInfo: IUsers = {
        address: '',
        birthday: new Date(),
        createdBy: '',
        createdDate: new Date(),
        district: '',
        email: '',
        firstname: '',
        images: '',
        isDeleted: 0,
        lastname: '',
        password: '',
        phone: '',
        lat: null,
        long: null,
        province: '',
        roles: 0,
        status: 0,
        town: '',
        updatedBy: '',
        updatedDate: new Date(),
        userUUId: '',
        username: ''
    };

    bday: string;


    private markers: marker[] = []

    constructor(
        private profileManagementService: ProfileManagementService,
        private appService: AppService
    ) {
    }

    ngOnInit() {
        const token: string = this.appService.getCookie(tokenName);
        this.profileManagementService.getUserInfo(token).subscribe((res: any) => {
            this.userInfo = res;
            this.bday = res.birthday ? moment(res.birthday).format(`DD - MM - YYYY`) : null;
            if (res.district || res.town) {
                const maker: any = {
                    lat: this.getlocation(res.war.location || res.dis.location).lat,
                    lng: this.getlocation(res.war.location || res.dis.location).long,
                    label: res.lastname + " " + res.firstname,
                    draggable: false
                }
                this.markers.push(maker);
                // this.userInfo[`lat`] = null;
                // this.userInfo[`long`] = null;
                this.lat = this.getlocation(res.war.location || res.dis.location).lat;
                this.lng = this.getlocation(res.war.location || res.dis.location).long;
            }else {
                return {
                    lat: undefined,
                    long: undefined
                }
            }
            this.markers.push(maker);
            this.lat = this.getlocation(res.war.location || res.dis.location).lat;
            this.lng = this.getlocation(res.war.location || res.dis.location).long;
            this.profileManagementService.loadImage(res.images).subscribe(data => {
                if(data) {
                    this.imageLink = (data as any).data;
                }
            })
        });
    }


    clickedMarker(label: string, index: number) {
        // console.log(`clicked the marker: ${label || index}`);
    }
    
    getImage(): any {
        let styles = {
            'background-image': `url("${ this.imageLink || "https://via.placeholder.com/360x360" }")`,
            'background-repeat': `no-repeat`,
            'background-size': `cover`,
            'background-position': 'center'
        };
        return styles;
    }
}
