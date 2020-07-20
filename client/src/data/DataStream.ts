import { observable, runInAction } from "mobx";

export abstract class DataStream<T> {

    protected url: string;

    private domain: string;

    private intervalTime: number;

    constructor(domain: string, intervalTime: number) {
        this.fetch = this.fetch.bind(this);
        this.url = `http://localhost:9000/${domain}`;
        this.domain = domain;
        this.intervalTime = intervalTime;
        this.data = this.default();
        this.fetch();
        setInterval(this.fetch, this.intervalTime);
    }

    @observable public data: T;

    public abstract default(): T;

    public fetch(): void {
        fetch(this.url)
            .then(x => x.json())
            .then(x => {
                runInAction(() => {
                    this.data = x;
                })
            })
            .catch(x => console.warn(`DataStream<T> ${this.domain}: ${x}`));
    }

    public put<T>(data: T): void {
        fetch(this.url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(x => x.json())
            .then(x => this.fetch())
            .catch(x => console.warn(x));
    }

    public patch<T>(data: T): void {
        fetch(this.url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(x => x.json())
            .then(x => this.fetch())
            .catch(x => console.warn(x));
    }

    public delete<T>(data: T): void {
        fetch(this.url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(x => x.json())
            .then(x => this.fetch())
            .catch(x => console.warn(x));
    }
}