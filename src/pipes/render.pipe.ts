import { PipeTransform, Pipe } from '@angular/core';

@Pipe({name: 'render'})
export class RenderPipe implements PipeTransform {    
    transform(value: any) : any {
        return Object.keys(value);
    }
}