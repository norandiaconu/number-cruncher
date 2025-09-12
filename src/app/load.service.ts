import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class LoadService {
    private http = inject(HttpClient);

    public getTxtFile(urlInput: string): Observable<string> {
        return this.http.get(urlInput, { responseType: 'text' });
    }
}
