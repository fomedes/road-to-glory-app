import { MatPaginatorIntl } from '@angular/material/paginator';

export class SpanishPaginatorIntl extends MatPaginatorIntl {
  override itemsPerPageLabel = 'Jugadores por página:';
  override nextPageLabel = 'Siguiente página';
  override previousPageLabel = 'Página anterior';
  override firstPageLabel = 'Primera página';
  override lastPageLabel = 'Última página';
}
