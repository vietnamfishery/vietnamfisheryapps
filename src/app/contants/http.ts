import { HttpHeaders } from "@angular/common/http";

export const APP_JSON = new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
})

export const APP_FORM_FILE = new HttpHeaders({
    'Content-Type': 'multipart/form-data'
})
