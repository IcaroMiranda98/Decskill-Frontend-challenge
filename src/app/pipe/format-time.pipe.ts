import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'formatTime' })
export class FormatTime implements PipeTransform {
    transform(value: Date, somenteHora?: string): string {

        let horarioCalculado = new Date().getTime() - value.getTime();
        if (horarioCalculado > 60000) {
            if(somenteHora){
                let tempoSegundos = Math.round((horarioCalculado /1000) / 3600);
                return tempoSegundos + ' h';
            }

            let dataHora =
                value.toLocaleDateString() + ' - ' + value.toLocaleTimeString();
            return dataHora ? dataHora : '';
        }

        let tempoSegundos = Math.round(horarioCalculado / 1000);
        return tempoSegundos + ' s';
    }
}
