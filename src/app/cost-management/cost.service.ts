import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { api_url, api_port } from '../constants/api';
import { Observable } from 'rxjs';
import { AppService } from '../app.service';
import { flattenDeep } from 'lodash';

const host = api_url + ':' + api_port + '/api';

@Injectable({
    providedIn: 'root'
})
export class CostService {

    constructor(
        private appService: AppService,
        private http: HttpClient
    ) { }

    /**
     * get cost theo vụ
     * @param data JSON { seasonId }
     * @param token 
     */
    public getCost(token: string, data: any, flag: string): Observable<any> {
        return this.http.get(host + '/costs/gets/' + flag + '/' + data.seasonUUId, this.appService.setHeader(token));
    }

    /**
     * 
     * @param coupons 
     */
    extractStorageCoupons(coupons: any[]): Array<any> {
        const result: any[] = coupons.map(cp => {
            return cp.materials.map(mat => {
                const res = {
                    ...mat.storage,
                    ...mat,
                    ...cp.season,
                    ...cp
                };
                return res;
            })
        });
        return flattenDeep(result).map(e => {
            delete e.materials;
            delete e.storage;
            delete e.season;
            return e;
        })
    }
    
    extractBreedCoupons(coupons: any[]): Array<any> {
        const result: any[] = coupons.map(cp => {
            return cp.boughtBreedDetails.map(bb => {
                return {
                    ...bb.breed,
                    ...bb,
                    ...cp.season,
                    ...cp
                }
            })
        });
        return flattenDeep(result).map(e => {
            delete e.boughtBreedDetails;
            delete e.breed;
            delete e.season;
            return e;
        })
    }
}
