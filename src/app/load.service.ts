import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class LoadService {
    constructor(private http: HttpClient) {}

    getTxtFile(urlInput: string): Observable<string> {
        return this.http.get(urlInput, { responseType: 'text' });
    }
}
