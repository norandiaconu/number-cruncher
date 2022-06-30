import { HttpClient, HttpHandler } from "@angular/common/http";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { AppComponent } from "./app.component";
import { LoadService } from "./load.service";

describe("AppComponent", () => {
    let fixture: ComponentFixture<AppComponent>;
    let app: AppComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AppComponent],
            providers: [LoadService, HttpClient, HttpHandler],
        }).compileComponents();

        fixture = TestBed.createComponent(AppComponent);
        app = fixture.componentInstance;
    });

    it("should check the title", () => {
        expect(app.title).toBe("Number Cruncher");
    });

    it("should check initial total", () => {
        expect(app.total).toBe(0.0);
    });

    it("should check that the total is reset to 0.0", () => {
        app.total = 1;
        app.clearText();
        expect(app.total).toBe(0);
    });

    it("should ensure parsing occurs properly for decimals", () => {
        app.parse("test1 1.1\ntest2 1.2");
        expect(app.total).toBe(2.3);
    });

    it("should ensure parsing occurs properly for h:mm format", () => {
        app.parse("test 1 1:06\ntest 2 1:12");
        expect(app.total).toBe(2.3);
    });
});
