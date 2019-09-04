import 'zone.js/dist/zone-testing';
import { Shallow } from 'shallow-render';
import { getTestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

declare const require: any;

Shallow.neverMock([ReactiveFormsModule, FormBuilder]);

getTestBed().initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());

const context = require.context('./', true, /\.spec\.ts$/);
context.keys().map(context);
