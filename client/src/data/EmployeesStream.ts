import { observable } from "mobx";
import { DataStream } from "./DataStream";
import { Employee } from "../models/Employee";

export class EmployeesStream extends DataStream<Employee[]> {

    constructor(intervalTime: number) {
        super('employees', intervalTime);
    }

    public default(): Employee[] {
        return observable([]);
    }
}