import { HttpClient, HttpParams } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { API_PATH } from "src/app/api";
import { UserService } from "src/app/shared/user.service";


@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
    constructor(public userService: UserService, private http: HttpClient, private router: Router) {}

    players: any = []
    countUser = 0
    player: any = {}
    present: any = {}

    ngOnInit() {
        let params = new HttpParams().set('admin', true)
        this.http.get(`${API_PATH}/api/get_score`, {params}).subscribe((data: any) => {
            this.players = data.data.sort((a: any, b: any) => b.ball - a.ball)
            this.countUser = data.count            
        })
    }

    exit() {
        localStorage.removeItem('id')
        this.router.navigate(['/start'])
    }

    getInfoUser(name: string) {
        let params = new HttpParams().set('name', name)
        this.http.get(`${API_PATH}/api/get_info_user`, {params}).subscribe((data: any) => {
            this.player = data
            console.log(this.player);
        })
        this.http.get(`${API_PATH}/api/get_present`, {params}).subscribe(data => this.present = data)
    }

    getPresent() {
        if (this.present != null && this.present.hasOwnProperty('present'))
            return this.present.present
        return 'Подарок участником не выбран!'
    }

    startConsurs() {
        this.http.put(`${API_PATH}/api/change_start_state`, {})
            .subscribe()
    }

    finishConsurs() {
        this.http.put(`${API_PATH}/api/change_finish_state`, {})
            .subscribe()
    }

}