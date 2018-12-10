import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatSnackBar } from '@angular/material';
import { Breed } from 'src/app/models';
import { StorageManagementService } from '../storage-management.service';
import { AppService } from 'src/app/app.service';
import { tokenName } from 'src/app/constants/constant';
import { SeasionManagementService as SeasonManagementService } from 'src/app/seasion-management/seasion-management.service';

@Component({
    selector: 'app-breed-management',
    templateUrl: './breed-management.component.html',
    styleUrls: ['./breed-management.component.scss']
})
export class BreedManagementComponent implements OnInit {
    type: string = 'giong-nuoi';
    displayedColumns: string[] = ['name', 'quantity', 'unit', 'loopOfBreed', 'tips'];
    ELEMENT_DATA: Breed[] = []
    dataSource = new MatTableDataSource<Breed>(this.ELEMENT_DATA);
    token: string;

    checkSeason: boolean = false;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
		public snackBar: MatSnackBar,
		private storageManagementService: StorageManagementService,
        private seasionManagementService: SeasonManagementService,
		private appService: AppService
	) {
        this.token = this.appService.getCookie(tokenName)
    }

    ngOnInit() {
        this.storageManagementService.getBreedWithUser(this.token).subscribe((res: any) => {
            if(res.success) {
                this.dataSource.data = res.breeds;
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            } else {
                this.snackBar.open(res.message, 'Đóng', {
                    duration: 2500,
                    horizontalPosition: "center",
                    verticalPosition: 'top'
                });
            }
        })
        this.getSeason();
    }

    getSeason() {
        this.seasionManagementService.getPresentSeason(true,this.token).subscribe(res => {
            this.checkSeason = !!res.seasons.length;
        })
    }    
}
