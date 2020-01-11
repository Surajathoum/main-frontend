import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'filterUnique',
  pure: true
})
export class UniqueFilterPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value != null) {
      const uniqueArray = value.filter(function (el, index, array) {
        return array.indexOf(el) === index;
      });
      return uniqueArray;
    }
  }
}

@Pipe({
  name: 'greetPipe',
  pure: true
})
export class GreetPipe implements PipeTransform {
  transform(value?: any, args?: any): any {
    let greeting = '';
    const time = new Date().getHours();
    if (time < 10) {
      greeting = 'Good Morning';
    } else if (time < 20) {
      greeting = 'Good Day';
    } else {
      greeting = 'Good Evening';
    }
    return greeting;
  }
}

@Pipe({
  name: 'dateAgo',
  pure: true
})
export class DateAgoPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (!value || value === '') { return '-'; }
    let content = '';
    const year = Math.floor(value / ((365 * 24) * 3600));
    value = value % ((365 * 24) * 3600);
    if (year > 0) { content += year + 'y '; }
    const day = Math.floor(value / (24 * 3600));
    value = value % (24 * 3600);
    if (day > 0) { content += day + 'd '; }
    const hour = Math.floor(value / 3600);
    value %= 3600;
    if (hour > 0) { content += hour + 'h '; }
    const minutes = Math.floor(value / 60);
    value %= 60;
    if (minutes > 0) { content += minutes + 'm '; }
    const seconds = Math.floor(value);
    if (seconds > 0) { content += seconds + 's '; }
    return content;
  }
}

@Pipe({ name: 'formatCell' })
export class FormatCellPipe implements PipeTransform {
  constructor(private datePipe: DatePipe) { }
  transform(value: any, format: string): any {
    if (value === undefined) { return ''; }
    if (format === 'date') {
      return this.datePipe.transform(value, 'medium');
    } else if (format === 'cameltohuman') {
      return new CamelToHumanPipe().transform(value, true);
    } else if (format === 'epochToDate') {
      return new EpochToDateFilterPipe().transform(value);
    } else if (format === 'epochToTime') {
      return new EpochToTimeFilterPipe().transform(value);
    }
    else if (format === 'cveToDate') {
      return new CveToDateFilterPipe().transform(value);
    } else if (format === 'dateAgo') {
      return new DateAgoPipe().transform(value);
    } else if (format === 'assessmentDate') {
      return new AssessmentDateFilterPipe().transform(value);
    } else if (format === 'formatTrafficUnits') {
      return new FormatTrafficUnitsPipe().transform(value);
    } else if (format === 'macFilter') {
      return new MacFilterPipe().transform(value);
    } else if (format === 'arrayToStr') {
      return new ArrayToStrPipe().transform(value);
    } else if (format === 'bytesConvertNoUnit') {
      return new BytesConvertNoUnitsFilterPipe().transform(value);
    } else if (format === 'EpochToDateFormat') {
      return new EpochToDateFormatFilterPipe().transform(value);
    }

    return value;
  }
}

@Pipe({
  name: 'macFilter'
})
export class MacFilterPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (!value || value === '') {
      return '';
    }
    return value.match(/.{1,2}/g).join(':');
  }
}

@Pipe({
  name: 'orderBy'
})
export class ArrayOrderByPipe {

  /**
   * Parse expression, split into items
   * @param expression
   * @returns {string[]}
   */
  private static parseExpression(expression: string): string[] {
    expression = expression.replace(/\[(\w+)\]/g, '.$1');
    expression = expression.replace(/^\./, '');
    return expression.split('.');
  }

  /**
   * Get value by expression
   *
   * @param object
   * @param expression
   * @returns {any}
   */
  private static getValue(object: any, expression: string[]) {
    for (let i = 0, n = expression.length; i < n; ++i) {
      const k = expression[i];
      if (!(k in object)) {
        return;
      }
      object = object[k];
    }

    return object;
  }

  /**
   * Set value by expression
   *
   * @param object
   * @param value
   * @param expression
   */
  private static setValue(object: any, value: any, expression: string[]) {
    let i;
    for (i = 0; i < expression.length - 1; i++) {
      object = object[expression[i]];
    }

    object[expression[i]] = value;
  }
  transform(value: any | any[], expression?: any, reverse?: boolean): any {
    if (!value) {
      return value;
    }

    const isArray = value instanceof Array;

    if (isArray) {
      return this.sortArray(value, expression, reverse);
    }

    if (typeof value === 'object') {
      return this.transformObject(value, expression, reverse);
    }

    return value;
  }

  /**
   * Sort array
   *
   * @param value
   * @param expression
   * @param reverse
   * @returns {any[]}
   */
  private sortArray(value: any[], expression?: any, reverse?: boolean): any[] {
    const isDeepLink = expression && expression.indexOf('.') !== -1;

    if (isDeepLink) {
      expression = ArrayOrderByPipe.parseExpression(expression);
    }

    const array: any[] = value.sort((a: any, b: any): number => {
      if (!expression) {
        return a > b ? 1 : -1;
      }

      if (!isDeepLink) {
        return a[expression] > b[expression] ? 1 : -1;
      }

      return ArrayOrderByPipe.getValue(a, expression) > ArrayOrderByPipe.getValue(b, expression) ? 1 : -1;
    });

    if (reverse) {
      return array.reverse();
    }

    return array;
  }


  /**
   * Transform Object
   *
   * @param value
   * @param expression
   * @param reverse
   * @returns {any[]}
   */
  private transformObject(value: any | any[], expression?: any, reverse?: boolean): any {
    const parsedExpression = ArrayOrderByPipe.parseExpression(expression);
    let lastPredicate = parsedExpression.pop();
    let oldValue = ArrayOrderByPipe.getValue(value, parsedExpression);

    if (!(oldValue instanceof Array)) {
      parsedExpression.push(lastPredicate);
      lastPredicate = null;
      oldValue = ArrayOrderByPipe.getValue(value, parsedExpression);
    }

    if (!oldValue) {
      return value;
    }

    const newValue = this.transform(oldValue, lastPredicate, reverse);
    ArrayOrderByPipe.setValue(value, newValue, parsedExpression);
    return value;
  }
}

@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}

@Pipe({
  name: 'camelToHuman'
})
export class CamelToHumanPipe implements PipeTransform {
  transform(input: any, uppercaseFirst: any): any {
    if (typeof input !== 'string') {
      return input;
    }
    let result = input.replace(/([a-z\d])([A-Z])/g, '$1' + (' ' || '_') + '$2');
    if (result.indexOf('_') > -1) {
      result = result.replace(/(?:_| |\b)(\w)/g, function (key, p1) { return p1.toUpperCase(); }).replace(/([a-z])([A-Z])/g, '$1 $2');
    }
    if (uppercaseFirst) {
      result = result.charAt(0).toUpperCase() + result.slice(1);
    }
    return result;
  }
}

@Pipe({
  name: 'formatTrafficUnits'
})
export class FormatTrafficUnitsPipe implements PipeTransform {
  transform(units: any, decimals?: any, display?: any, base?: any): any {
    if (!units) { return ''; }
    if (display === undefined) { display = ['bps', 'Kbps', 'Mbps', 'Gbps', 'Tbps', 'Pbps', 'Ebps', 'Zbps', 'Ybps']; }
    if (units === 0) { return units + display[0]; }
    base = base || 1000; // or 1024 for binary
    const dm = decimals || 2;
    const i = Math.floor(Math.log(units) / Math.log(base));
    return parseFloat((units / Math.pow(base, i)).toFixed(dm)) + display[i];
  }
}

@Pipe({
  name: 'arrayToStr'
})
export class ArrayToStrPipe implements PipeTransform {
  transform(input: any, args?: any): any {
    if (!input || input === null || input === '') { return ''; }
    if (input.length > 0) {
      return input.join(', ');
    } else {
      return '';
    }
  }
}

@Pipe({
  name: 'strToMac'
})
export class StrToMacPipe implements PipeTransform {
  transform(input: any, uppercase: any): any {
    if (!input || input === null || input === '') { return ''; }
    if (uppercase) {
      input = input.toUpperCase();
    }
    if (input.length >= 3 && input.length <= 16) {
      input = input.replace(/\W/ig, '');
      input = input.replace(/(.{2})/g, '$1:');
      return input;
    } else {
      return '';
    }
  }
}

@Pipe({
  name: 'cveToDate'
})
export class CveToDateFilterPipe implements PipeTransform {
  transform(epoch: any): any {
    if (!epoch) { return '-'; }
    epoch = epoch + '';
    const year = epoch.slice(0, 4); const month = epoch.slice(4, 6); const date = epoch.slice(6, 8);
    return year + '/' + month + '/' + date;
  }
}

@Pipe({
  name: 'assessmentDate'
})
export class AssessmentDateFilterPipe implements PipeTransform {
  transform(epoch: any): any {
    if (!epoch) { return '-'; }
    const ret = [];
    if (epoch.length > 0) {
      epoch.forEach(dt => {
        dt = dt + '';
        dt = dt.split('.')[0];
        const d = (dt.toString().length === 10) ? new Date(dt * 1000) : new Date(dt);
        ret.push(d.toLocaleDateString() + ' ' + d.toLocaleTimeString());
      });
    }
    return ret.join(', ');
  }
}

@Pipe({ name: 'split' })
export class SplitPipe implements PipeTransform {
  transform(input: any, separator: string = ' ', limit?: number): any {
    if (typeof input === 'string') {
      return input.split(separator)[limit];
    }
    return input;
  }
}

@Pipe({
  name: 'epochToDate'
})
export class EpochToDateFilterPipe implements PipeTransform {
  transform(epoch: any): any {
    if (!epoch) { return '-'; }
    epoch = (epoch + '').split('.')[0];
    const d = (epoch.toString().length === 10) ? new Date(epoch * 1000) : new Date(+epoch);
    return d.toLocaleDateString() + ' ' + d.toLocaleTimeString();
  }
}

@Pipe({
  name: 'epochToTime'
})
export class EpochToTimeFilterPipe implements PipeTransform {
  transform(epoch: any): any {
    if (!epoch) {
      return '-';
    }
    epoch = (epoch + '').split('.')[0];
    const d = (epoch.toString().length === 10) ? new Date(epoch * 1000) : new Date(+epoch);

    // const currentDate = new Date().getTime();
    // const diff = (currentDate - epoch) / 1000;

    //return diff >= 86400 ? d.toLocaleDateString() + ' ' + d.toLocaleTimeString() : d.toLocaleTimeString();
    return d.toLocaleTimeString();
  }
}

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

@Pipe({
  name: 'epochToDateFormat'
})
export class EpochToDateFormatFilterPipe implements PipeTransform {
  transform(epoch: any): any {
    if (!epoch) {
      return '';
    }
    epoch = (epoch + '').split('.')[0];
    const d = (epoch.toString().length === 10) ? new Date(epoch * 1000) : new Date(+epoch);

    let content = '';
    if (d) {
      content = d.getDate() + ' ' + monthNames[(d.getMonth())] + ' ' + d.getFullYear();
      return content;
    }
    return content;

  }
}



@Pipe({
  name: 'truncFile'
})
export class TruncFilePipe implements PipeTransform {
  transform(file: any): any {
    if (file && file.type === 'folder' && file.name.length > 9) {
      return file.name.substring(0, 8) + '...';
    } else if (file && file.type !== 'folder' && file.name.length > 9) {
      return file.name.substring(0, 8) + '...' + file.name.split('.').pop();
    } else {
      return file.name;
    }
  }
}

@Pipe({
  name: 'bytesConvert'
})
export class BytesConvertFilterPipe implements PipeTransform {
  transform(bytes: any, decimals: number = 2): any {
    if (bytes === 0 || !bytes || bytes === '' || bytes === null) {
      return '0';
    } else if (typeof bytes === 'string') { bytes = Number(bytes); }
    const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
    let unit = 0;
    while (bytes >= 1024) {
      bytes /= 1024;
      unit++;
    }

    bytes = bytes > 0 ? bytes : 0;
    return bytes.toFixed(+ decimals) + ' ' + units[unit];
  }
}

@Pipe({
  name: 'bytesConvertNoUnit'
})
export class BytesConvertNoUnitsFilterPipe implements PipeTransform {
  transform(bytes: any, decimals: number = 2): any {
    if (bytes === 0 || !bytes || bytes === '' || bytes === null) {
      return '0';
    } else if (typeof bytes === 'string') { bytes = Number(bytes); }

    while (bytes >= 1024) {
      bytes /= 1024;
    }
    return bytes.toFixed(+ decimals) + ' ';
  }
}
@Pipe({
  name: 'daysHoursSeconds'
})
export class DaysHoursSecondsPipe implements PipeTransform {
  transform(sec: any, args?: any): any {
    if (!sec) {
      return sec;
    } else {
      let t = Math.floor(sec / 100);
      let years;
      let months;
      let days;
      if (t > 86400) {
        days = Math.floor(t / 86400);
        t = t - (days * 86400);
      }
      const hours = Math.floor(t / 3600);
      t = t - (hours * 3600);
      const minutes = Math.floor(t / 60);
      t = t - (minutes * 60);
      let content = '';
      if (years) {
        content += years + ' years';
      }
      if (months) {
        if (content) {
          content += ', ';
        }
        content += months + ' months';
      }
      if (days) {
        if (content) {
          content += ', ';
        }
        content += days + ' days';
      }
      if (hours || days) {
        if (content) {
          content += ', ';
        }
        content += hours + ' hours';
      }
      if (content) {
        content += ', ';
      }
      content += minutes + ' minutes and ' + t + ' seconds.';
      return content;
    }
  }

}
@Pipe({
  name: 'timeFormat'
})

export class TimeFormat implements PipeTransform {
  transform(time: any, args?: any): any {
    let content = '';
    if (time !== '') {
      content = time.Hour + 'h :' + time.Minute + 'm :' + time.Second + 's';
      return content;
    }
    return content;

  }
}

@Pipe({
  name: 'dateFormat'
})
export class DateFormat implements PipeTransform {
  transform(date: any, args?: any): any {
    let content = '';
    if (date !== '') {
      content = date.Year + '-' + date.Month + '-' + date.Day;
      return content;
    }
    return content;

  }
}


@Pipe({
  name: 'dateAndTimeFormat'
})
export class DateAndTimeFormat implements PipeTransform {
  transform(dateAndTime: any, args?: any): any {
    let date = '-';
    let time = '-';
    if (dateAndTime != '') {
      date = dateAndTime.Date.Year + '-' + dateAndTime.Date.Month + '-' + dateAndTime.Date.Day;
      time = dateAndTime.Time.Hour + 'h :' + dateAndTime.Time.Minute + 'm :' + dateAndTime.Time.Second + 's';
      return date + ' ' + time;
    }
    return date + ' ' + time;
  }
}

@Pipe({
  name: 'MinuteSecondFormat'
})
export class MinuteSecondFormatPipe implements PipeTransform {
  transform(sec: number, args?: any): any {

    let format = "00:00";
    let minutes = Math.floor(sec / 60);
    let seconds = sec - minutes * 60;
    // let hours = Math.floor(sec / 3600);
    //sec = sec - hours * 3600;

    format = (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds< 10 ? '0' + seconds : seconds);
    return format;
  }
}
