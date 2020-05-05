import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { BilanArticulaire } from '../models/index';

@Pipe({ name: 'dateFormatPipe' })
export class DateFormatPipe implements PipeTransform {
    transform(bilanArticulaire: BilanArticulaire): string {
		var datePipe = new DatePipe("en-US");
        return datePipe.transform(bilanArticulaire.date, 'dd/MM/yyyy');
    }
}


