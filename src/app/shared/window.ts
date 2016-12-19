import { OpaqueToken } from '@angular/core';

export const windowRef = new OpaqueToken('WINDOW_REF');

export const WINDOW_REF_PROVIDER = { provide: windowRef, useValue: window };
