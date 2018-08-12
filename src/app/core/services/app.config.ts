import {InjectionToken} from '@angular/core';

export let BASE_URL = new InjectionToken<string>('base.url');

export const BaseUrl = 'http://localhost:8000/api';
