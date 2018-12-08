import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { api } from '../constants/api';
import { Observable } from 'rxjs';
import { AppService } from '../app.service';
import { flattenDeep } from 'lodash';

@Injectable({
    providedIn: 'root'
})
export class HarvestManagementService {

    constructor(
        private appService: AppService,
        private http: HttpClient
    ) { }

    
    addHarvest(data: any, token: string): Observable<any> {
        return this.http.post<any>(api + '/harvests/add', data, this.appService.setHeader(token));
    }
    
    public getHarvest(data: any, token: string): Observable<any> {
        return this.http.post(api + '/harvests/gets', data, this.appService.setHeader(token));
    }

    extractHarvest(arrHarvest: any[]): Array<any>{
        const result: any[] = [];
        arrHarvest.forEach((h: any) => {
            if(!h.harvestsnp){
                result.push(h);
            } else {
                h.harvestsnp.stocking.forEach((s: any) => {
                    let tmp: any = {
                        ...{ harvestDetails: h.details[0] },
                        ...{ stockingDetails: s.details },
                        ...s,
                        ...h.ponds,
                        ...h.seasons,
                        ...h,
                    };
                    delete tmp.details;
                    delete tmp.seasons;
                    delete tmp.ponds;
                    delete tmp.harvestsnp;
                    result.push(tmp)
                })
            }
        })
        return result;
    }
}
