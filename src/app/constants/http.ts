import { HttpHeaders } from "@angular/common/http";

export const headers: any = {
    APP_JSON: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
    }),
    APP_FORM_FILE: new HttpHeaders({
        'Content-Type': 'multipart/form-data'
    })
}
