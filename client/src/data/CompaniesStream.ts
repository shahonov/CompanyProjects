import { observable } from "mobx";
import { DataStream } from "./DataStream";
import { Company } from "../models/Company";

export class CompaniesStream extends DataStream<Company[]> {

    constructor(intervalTime: number) {
        super('companies', intervalTime);
    }

    public default(): Company[] {
        return observable([]);
    }
}