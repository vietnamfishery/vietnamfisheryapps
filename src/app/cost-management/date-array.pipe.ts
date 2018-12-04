import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'dateArray'
})
export class DateArrayPipe implements PipeTransform {

    transform(value: Array<any>, args?: any): any {
        if (!!value.length) {
            return value.map(e => {
                var date: Date = new Date(e);
                return date.getDate() + '-' + (date.getMonth() + 1 ) + '-' + date.getFullYear();
            });
        }
        return '';
    }

}
