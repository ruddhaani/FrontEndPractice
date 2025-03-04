import { HttpResponse } from "@angular/common/http";
import { Observable, Subscriber } from "rxjs";

export class PeronalitySubject<T>{
    private nextMethod !: (value : T) => void;
    constructor(private data : T) {
        
    }

    next(data : T){
        this.data = data;
        if(this.nextMethod){
            this.nextMethod(data)
        }
    }

    asObservable() : Observable<T>{
        return new Observable<T>((observable) => {
            observable.next(this.data);
            this.nextMethod = observable.next.bind(observable);
        })
    }
}