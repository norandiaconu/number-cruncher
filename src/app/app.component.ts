import { Component, ElementRef, ViewChild } from "@angular/core";
import { LoadService } from "./load.service";
import { catchError } from "rxjs/operators";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"],
})
export class AppComponent {
    @ViewChild("theText", { static: true, read: ElementRef }) public theText!: ElementRef;
    @ViewChild("theUrl", { static: true, read: ElementRef }) public theUrl!: ElementRef;
    public title = "Number Cruncher";
    public total = 0.0;
    public average = 0.0;
    public crunchPlaceholder = "TestOne 1.1\nTestTwo 1.2";
    public urlPlaceholder = "Enter URL for txt file";

    constructor(private loadService: LoadService) {}

    public parse(textInput: string): void {
        if (!textInput) {
            this.crunchPlaceholder =
                "Please enter some text to parse before attempting to crunch\n\nExample below:\n\nTestOne 1.1\nTestTwo 1.2";
            this.theText.nativeElement.focus();
            return;
        }
        const initialRegex = /.* /g;
        let numbers = textInput.replace(initialRegex, "");

        const removeColon = /:(?!\n).*/g;
        const minutesArray = numbers.match(removeColon);
        const removeBeforeColon = /.*:/g;
        let totalMinutes = 0;
        let minutesToHours = 0;
        if (minutesArray) {
            minutesArray.forEach((minutes) => {
                minutes = minutes.replace(removeBeforeColon, "");
                totalMinutes = totalMinutes + parseInt(minutes);
            });
            minutesToHours = totalMinutes / 60;
        }
        numbers = numbers.replace(removeColon, "");

        const newlineRegex = /\n/g;
        const operation = numbers.replace(newlineRegex, "+");

        const doublePlusRegex = /\+\+/g;
        let cleanedOperation = operation.replace(doublePlusRegex, "+");

        const endRegex = /\+==.*/g;
        cleanedOperation = cleanedOperation.replace(endRegex, "");

        const output = eval(cleanedOperation);
        this.total = output + minutesToHours;

        const countItems = (cleanedOperation.match(/\+/g) || []).length + 1;
        this.average = this.total / countItems;
    }

    public clearText(): void {
        if (this.theText) {
            this.theText.nativeElement.value = "";
            this.theUrl.nativeElement.value = "";
        }
        this.total = 0;
        this.average = 0;
    }

    public loadInput(urlInput: string | null): void {
        if (!urlInput) {
            this.urlPlaceholder = "Please enter a URL here before attempting to load";
            this.theUrl.nativeElement.focus();
            return;
        }
        this.loadService
            .getTxtFile(urlInput)
            .pipe(
                catchError((error) => {
                    if (error.status === 404) {
                        this.crunchPlaceholder = "404 response: Please enter a valid url";
                    }
                    console.log("error", error);
                    return "";
                }),
            )
            .subscribe((loadedText) => {
                this.theText.nativeElement.value = loadedText;
                this.parse(loadedText);
                localStorage.setItem("url", urlInput);
            });
    }

    public loadPrevious(): void {
        const previousUrl = localStorage.getItem("url");
        this.theUrl.nativeElement.value = previousUrl;
        this.loadInput(previousUrl);
    }
}
