import { DecimalPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, inject, viewChild } from '@angular/core';
import { evaluate } from 'mathjs';
import { catchError } from 'rxjs/operators';
import { LoadService } from './load.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    imports: [DecimalPipe]
})
export class AppComponent {
    protected title = 'number-cruncher';
    protected total = 0.0;
    protected average = 0.0;
    protected crunchPlaceholder = 'TestOne 1.1\nTestTwo 1.2';
    protected urlPlaceholder = 'Enter URL for txt file';

    private readonly theText = viewChild.required<ElementRef<HTMLInputElement>>('theText');
    private readonly theUrl = viewChild.required<ElementRef<HTMLInputElement>>('theUrl');
    private readonly loadService = inject(LoadService);

    protected parse(textInput: string): void {
        if (!textInput) {
            this.crunchPlaceholder =
                'Please enter some text to parse before attempting to crunch\n\nExample below:\n\nTestOne 1.1\nTestTwo 1.2';
            this.theText().nativeElement.focus();
            return;
        }
        const initialRegex = /.* /g;
        let numbers = textInput.replace(initialRegex, '');

        const removeColon = /:(?!\n).*/g;
        const minutesArray = numbers.match(removeColon);
        const removeBeforeColon = /.*:/g;
        let totalMinutes = 0;
        let minutesToHours = 0;
        if (minutesArray) {
            minutesArray.forEach((minutes) => {
                minutes = minutes.replace(removeBeforeColon, '');
                totalMinutes = totalMinutes + parseInt(minutes, 10);
            });
            minutesToHours = totalMinutes / 60;
        }
        numbers = numbers.replace(removeColon, '');

        const newlineRegex = /\n/g;
        const operation = numbers.replace(newlineRegex, '+');

        const doublePlusRegex = /\+\+/g;
        let cleanedOperation = operation.replace(doublePlusRegex, '+');

        const endRegex = /\+==.*/g;
        cleanedOperation = cleanedOperation.replace(endRegex, '');

        const output = evaluate(cleanedOperation) as number;
        this.total = output + minutesToHours;

        const countItems = (cleanedOperation.match(/\+/g) || []).length + 1;
        this.average = this.total / countItems;
    }

    protected clearText(): void {
        const theText = this.theText();
        if (theText) {
            theText.nativeElement.value = '';
            this.theUrl().nativeElement.value = '';
        }
        this.total = 0;
        this.average = 0;
    }

    protected loadInput(urlInput: string): void {
        if (!urlInput) {
            this.urlPlaceholder = 'Please enter a URL here before attempting to load';
            this.theUrl().nativeElement.focus();
            return;
        }
        this.loadService
            .getTxtFile(urlInput)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    if (error.status === 404) {
                        this.crunchPlaceholder = '404 response: Please enter a valid url';
                    }
                    console.log('error', error);
                    return '';
                })
            )
            .subscribe((loadedText) => {
                this.theText().nativeElement.value = loadedText;
                this.parse(loadedText);
                localStorage.setItem('url', urlInput);
            });
    }

    protected loadPrevious(): void {
        const previousUrl = localStorage.getItem('url');
        if (previousUrl) {
            this.theUrl().nativeElement.value = previousUrl;
            this.loadInput(previousUrl);
        }
    }
}
