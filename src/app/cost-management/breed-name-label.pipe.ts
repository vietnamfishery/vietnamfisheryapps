import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'breedNameLabel'
})
export class BreedNameLabelPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
