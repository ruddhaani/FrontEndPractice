import { HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";

export class PeronalitySubject<T>{

    constructor(private data : T) {
        
    }

    next(data : T){
        this.data = data;
    }

    asObservable() : Observable<T>{
        return new Observable<T>((observable) => {
            observable.next(this.data);
        })
    }
}