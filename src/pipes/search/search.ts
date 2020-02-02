import {Injectable, Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'search',

})
@Injectable()
export class SearchPipe implements PipeTransform {

  transform(value: any, terme: any): any {

    if (terme == null || terme == '') {
      return value;
    }
    return value.filter(user => user.specialite.includes(terme) || user.gouvernorat.includes(terme));
  }
}
