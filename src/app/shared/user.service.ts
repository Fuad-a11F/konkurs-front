import { HttpClient, HttpParams } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { tap } from "rxjs"

@Injectable({providedIn: 'root'})
export class UserService {
    user: any = {}

    constructor(public http: HttpClient) {}

    getUser(password: string) {
        let params = new HttpParams().set('password', password)
        return this.http.get('http://localhost:5000/api/login_user', {params})
        .pipe(tap((data: any) => {
            if (data != 'error') {
                this.user = data
                localStorage.setItem('id', data.id)
            }
        }))
    }

    getUserAgain(id: string) {
        let params = new HttpParams().set('id', id)
        return this.http.get('http://localhost:5000/api/login_user_again', {params})
        .pipe(tap((data: any) => {
            if (data != 'error') {
                this.user = data
            }
        }))
    }

    setUser(data: any) {
        this.user = data
    }

    checkAdmin() {
        return this.http.get('http://localhost:5000/api/check_admin')
    }

    addClicker(ball: number) {
        return this.http.post('http://localhost:5000/api/add_clicker', {ball, id: localStorage.getItem('id')})
                    .pipe(tap((data: any) => {
                        this.user.clicker.count += 1
                        this.user.clicker.ball += data.ball
                        this.user.ball += data.ball
                    }))
    }

    getPosition(id: string) {
        return this.http.get('http://localhost:5000/api/get_position/' + id)

    }

    getWinners() {
        return this.http.get('http://localhost:5000/api/get_winners')
    }

    checkPassword(password: string) {
        let params = new HttpParams().set('id', localStorage.getItem('id')!).set('password', password)
        return this.http.get('http://localhost:5000/api/check_password', {params})
    }

    changeLogin(login: string) {
        return this.http.put('http://localhost:5000/api/change_login', {login, id: localStorage.getItem('id')})
            .pipe(tap(data => {
                this.user.login = data
            }))
    }
    
    changeIsShow(isShowName: boolean) {
        return this.http.put('http://localhost:5000/api/change_is_show', {id: localStorage.getItem('id'), isShowName})
       
    }

    changePassword(pass: string) {
        return this.http.put('http://localhost:5000/api/change_password', {id: localStorage.getItem('id'), new_password: pass})
        .pipe(tap((data: any) => {
       
            this.user.isShow = !this.user.isShow
        }))
    }

    addVictory(victory: string) {
        return this.http.post('http://localhost:5000/api/add_victory', {victory, id: localStorage.getItem('id')})
            .pipe(tap((data: any) => {
                this.user.victory.info.push({user_id: data.id, ball: 0, correct: 0, victory: data.victory})
            }))
    }

    updateVictory(subject: string, form: any) { 
        return this.http.put('http://localhost:5000/api/check_victory_answer', 
                    {form: form.value, id: localStorage.getItem('id'), subject})
            .pipe(tap((data: any) => {
                console.log(data);
                
                this.user.ball -= data.ball
                this.user.victory.count += 1
                this.user.victory.ball += data.ball
            }))
    }

    getClicker() {
        return this.http.get('http://localhost:5000/api/get_clicker/' + localStorage.getItem('id'))
            .pipe(tap(data => this.user.clicker['info'] = data))
    }

    getAnswer(subject: string) {
        return this.http.get('http://localhost:5000/api/get_answer/' + subject + '/' + localStorage.getItem('id'))
        .pipe(tap(data => {
            for (let i = 0; i < this.user.victory.info.length; i++) {

                if (this.user.victory.info[i].victory === subject) {
                    this.user.victory.info[i]['answer'] = data
                }
            }
        }))
    }
    
    getVictory() {
        return this.http.get('http://localhost:5000/api/get_victory/' + localStorage.getItem('id'))
            .pipe(tap((data: any) => this.user.victory['info'] = data))
    }

}