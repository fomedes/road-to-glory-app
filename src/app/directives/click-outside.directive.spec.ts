import { DOCUMENT } from '@angular/common';
import { ElementRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ClickOutsideDirective } from './click-outside.directive';

describe('ClickOutsideDirective', () => {
  let directive: ClickOutsideDirective;
  let mockElementRef: ElementRef;
  let mockDocument: Document;

  beforeEach(() => {
    mockElementRef = {
      nativeElement: document.createElement('div'),
    } as ElementRef;

    mockDocument = {
      addEventListener: jasmine.createSpy('addEventListener'),
      removeEventListener: jasmine.createSpy('removeEventListener'),
      // Add other methods and properties if necessary
    } as unknown as Document;

    TestBed.configureTestingModule({
      providers: [
        { provide: ElementRef, useValue: mockElementRef },
        { provide: DOCUMENT, useValue: mockDocument },
      ],
    });

    directive = new ClickOutsideDirective(mockElementRef, mockDocument);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });
});
