import * as moment from 'moment';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';

export class Movie {
    public idMovie: number;
    public title: string;
    public year: number;
    public like: number = 0;
    public animationState: string = 'initial';

    public deserialize(datas: any): Movie {
        Object.assign(this, datas);
        return this;
    }
}
