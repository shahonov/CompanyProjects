import { observable } from "mobx";
import { DataStream } from "./DataStream";
import { CompanyAddress } from "../models/CompanyAddress";

export class CompanyAddressesStream extends DataStream<CompanyAddress[]> {

    constructor(intervalTime: number) {
        super('company-addresses', intervalTime);
    }

    public default(): CompanyAddress[] {
        return observable([]);
    }
}