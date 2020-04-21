import { Pipe, PipeTransform } from '@angular/core';

import { User } from '../models/index';

@Pipe({ name: 'username' })
export class UsernamePipe implements PipeTransform {
    transform(user: User): string {
        return user && user.name || '';
    }
}
