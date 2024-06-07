import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormater'
})
export class DateFormaterPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {

    if (value != null && value != 'None') {
      if (typeof value == 'object') {
        let monthArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
        let dateFormat = `${monthArr[value.getMonth()]} ${value.getDate()} . ${value.getHours()}:${value.getMinutes()}`
        return dateFormat;
      }
      else if(typeof value == 'string') {
        let space = value.split(" ")
     
        let dateSplit = space[0].split("-")
        let timeSplit = space[1].split(":")
        let monthArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
        let month;

        // let monthNo = 3 %10; 
        let monthNo = parseInt(dateSplit[1]);
        if (monthNo < 10) {
          let i = monthNo % 10;
          month = monthArr[i - 1]
        }
        else {
          month = monthArr[monthNo - 1]
        }
        let dateFormat = `${month} ${dateSplit[2]}`;
        let timeFormat = `${timeSplit[0]} : ${timeSplit[1]} : ${timeSplit[2]}`
        return `${timeFormat} . ${dateFormat}`;
      }
      return '---'


    }
    else {
      return `---`
    }

  }



}
