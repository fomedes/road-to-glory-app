import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TransferDTO } from '../models/transfer.dto';

@Injectable({
  providedIn: 'root',
})
export class TransferService {
  private apiUrl = environment.apiBaseUrl;

  private urlTransferApi: string;

  private transferController: string;

  private transfers: TransferDTO[] = [];

  constructor(private http: HttpClient) {
    this.transferController = 'transfers';

    this.urlTransferApi = this.apiUrl + this.transferController;
  }

  getTransfers(): Observable<TransferDTO[]> {
    return this.http.get<TransferDTO[]>(this.urlTransferApi);
  }
}
