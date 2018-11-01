import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fileName'
})
export class FileNamePipe implements PipeTransform {

  transform(value: string, args?: any): string {
    if(value) {
      const name: string = value.split(/(\.[^.]*)$/)[0];
      const ext: string = value.split(/(\.[^.]*)$/)[1];
      return name.slice(0,15) +'..........' + name.slice(name.length-6,name.length) + ext;
    }
    return '';
  }

}
