import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'formatTime' })
export class FormatTime implements PipeTransform {
    transform(value: Date): string {
        let horarioCalculado = new Date().getTime() - value.getTime();
        if (horarioCalculado > 60000) {
            let dataHora =
                value.toLocaleDateString() + ' - ' + value.toLocaleTimeString();
            return dataHora ? dataHora : '';
        }

        let tempoSegundos = Math.round(horarioCalculado / 1000);
        return tempoSegundos + ' s';
    }
}
