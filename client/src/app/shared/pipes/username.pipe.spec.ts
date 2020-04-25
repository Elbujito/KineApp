import { UsernamePipe } from './username.pipe';
import { User } from '../models/index';

describe('should return user name', () => {

    it('should return user name if user has user name', () => {
        expect(new UsernamePipe().transform({ name: 'user name' } as User)).toEqual('user name');
    });

    it('should return empty if user does not have user name', () => {
        expect(new UsernamePipe().transform({} as User)).toEqual('');
    });

    it('should return empty if no user', () => {
        expect(new UsernamePipe().transform(null)).toEqual('');
    });


});
