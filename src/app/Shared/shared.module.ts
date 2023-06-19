import { NgModule } from '@angular/core';
import { formatNumberPipe } from './Pipes/format-number.pipe';

@NgModule({
  declarations: [formatNumberPipe],
  exports: [formatNumberPipe],
})
export class SharedModule {}
