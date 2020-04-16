import {TestBed, inject, async} from '@angular/core/testing';
import {CitiesService} from './cities.service';

import {Response, ResponseOptions, BaseRequestOptions, Http, RequestMethod, ResponseType} from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';
import {environment} from '../../environments/environment';

import 'rxjs/add/observable/throw';

class MockError extends Response implements Error {
  name: any;
  message: any;
};





