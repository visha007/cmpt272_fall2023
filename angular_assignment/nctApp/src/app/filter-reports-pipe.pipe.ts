import { Pipe, PipeTransform } from '@angular/core';
import { report } from './report';

@Pipe({
  name: 'filterReportsPipe'
})
export class FilterReportsPipePipe implements PipeTransform {

  transform(reportList:report[], queryString:string): report[] {
    return reportList.filter((report) => report.baddie_name.toLowerCase().includes(queryString.toLowerCase()));
  }
}
