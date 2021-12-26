import { Pipe, PipeTransform } from "@angular/core";


@Pipe({
    name: 'countBall'
})
export class CountBallPipe implements PipeTransform {
    transform(value: []): string | undefined {
        if (value) {
            let result = 0
        
            value.forEach((item: any) => result += item.ball)
    
            return result.toString()
        }
        return undefined
    }
}