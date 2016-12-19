import { OpaqueToken } from '@angular/core';

export const windowRef = new OpaqueToken('WINDOW_REF');

const WINDOW_REF_PROVIDER = { provide: windowRef, useValue: window };

// @todo This separate export was necessary to enable AoT with TypeScript 2.0.X.
export { WINDOW_REF_PROVIDER };
