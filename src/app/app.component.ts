import { Component, ViewChild } from "@angular/core";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"],
})
export class AppComponent {
    @ViewChild("theText") theText: any;
    title = "TextParser";
    total = 0.0;

    parse(textInput: string) {
        if (!textInput) {
            return;
        }
        const initialRegex = /.* /g;
        let numbers = textInput.replace(initialRegex, "");

        const removeColon = /:.*/g;
        const minutesArray = numbers.match(removeColon);
        const removeBeforeColon = /.*:/g;
        let totalMinutes = 0;
        let minutesToHours = 0;
        if (minutesArray !== null) {
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
        const remainingWordsRegex = /[a-z]/g;
        cleanedOperation = cleanedOperation.replace(remainingWordsRegex, "");
        if (cleanedOperation.charAt(cleanedOperation.length - 1) === "+") {
            cleanedOperation = cleanedOperation.slice(0, -1);
        }

        let output = eval(cleanedOperation);
        output = output + minutesToHours;
        this.total = output;
    }

    clearText() {
        this.theText.nativeElement.value = "";
        this.total = 0;
    }
}
