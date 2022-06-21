import { AppComponent } from "./app.component";

describe("AppComponent", () => {
    it("should check the title", () => {
        const appComponent = new AppComponent();
        expect(appComponent.title).toBe("TextParser");
    });

    it("should check initial total", () => {
        const appComponent = new AppComponent();
        expect(appComponent.total).toBe(0.0);
    });

    it("should check that the total is reset to 0.0", () => {
        const appComponent = new AppComponent();
        appComponent.total = 1;
        appComponent.clearText();
        expect(appComponent.total).toBe(0);
    });

    it("should ensure parsing occurs properly for decimals", () => {
        const appComponent = new AppComponent();
        appComponent.parse("test1 1.1\ntest2 1.2");
        expect(appComponent.total).toBe(2.3);
    });

    it("should ensure parsing occurs properly for h:mm format", () => {
        const appComponent = new AppComponent();
        appComponent.parse("test 1 1:06\ntest 2 1:12");
        expect(appComponent.total).toBe(2.3);
    });
});
