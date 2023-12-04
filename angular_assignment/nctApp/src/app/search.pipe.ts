import { Pipe, PipeTransform } from '@angular/core';
import { report } from './report';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(reports:report[], query:string): report[] {
    return reports.filter((rep) => 
      rep.baddie_name.toLowerCase().includes(query.toLowerCase()) || 
      rep.location.locationName.toLowerCase().includes(query.toLowerCase())
    );
  }

}
