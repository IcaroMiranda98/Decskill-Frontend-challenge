import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'formatTime' })
export class FormatTime implements PipeTransform {
  transform(value: Date): string {
    if (new Date().getTime() - value.getTime() > 60000) {
      let dataHora =
        value.toLocaleDateString() + ' - ' + value.toLocaleTimeString();
      return dataHora ? dataHora : '';
    }

    return 'Agora';
  }
}
