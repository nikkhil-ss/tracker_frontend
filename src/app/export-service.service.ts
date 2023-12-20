import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExportService {
  private exportToExcelSubject = new Subject<void>();

  // Observable to listen for export requests
  exportToExcel$ = this.exportToExcelSubject.asObservable();

  // Method to trigger the export function
  triggerExportToExcel() {
    this.exportToExcelSubject.next();
  }
}
