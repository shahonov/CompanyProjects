import { observable, runInAction } from "mobx";

export abstract class DataStream<T> {

    private url: string;

    private domain: string;

    private intervalTime: number;

    constructor(domain: string, intervalTime: number) {
        this.fetch = this.fetch.bind(this);
        this.url = `http://localhost:9000/${domain}`;
        this.domain = domain;
        this.intervalTime = intervalTime;
        this.data = this.default();
        setInterval(this.fetch, this.intervalTime);
    }

    @observable public data: T;

    public abstract default(): T;

    public fetch(): void {
        fetch(this.url)
            .then(x => x.json())
            .then(x => {
                console.log(this.domain, x);
                runInAction(() => {
                    this.data = x;
                })
            })
            .catch(x => console.warn(`DataStream<T> ${this.domain}: ${x}`));
    }

}