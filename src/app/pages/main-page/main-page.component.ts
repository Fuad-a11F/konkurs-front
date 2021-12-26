import { Component, OnInit } from "@angular/core";

@Component({
    selector: 'app-start',
    templateUrl: './main-page.component.html',
    styleUrls: ['main-page.component.scss']
})
export class MainComponent implements OnInit {

    constructor() {}

    ngOnInit() {
        if (localStorage.getItem('info') == null) {
            localStorage.setItem('info', 'true')
        }
    }

}