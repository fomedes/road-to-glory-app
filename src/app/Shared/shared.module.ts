import { NgModule } from '@angular/core';
import { formatNumberPipe } from './Pipes/format-number.pipe';
import { transferPipe } from './Pipes/transfer.pipe';

@NgModule({
  declarations: [formatNumberPipe, transferPipe],
  exports: [formatNumberPipe, transferPipe],
})
export class SharedModule {}
