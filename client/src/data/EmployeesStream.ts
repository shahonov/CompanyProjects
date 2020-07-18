import { DataStream } from "./DataStream";
import { Employee } from "../models/Employee";
import { observable } from "mobx";

export class EmployeesStream extends DataStream<Employee[]> {

    constructor(intervalTime: number) {
        super('employees', intervalTime);
    }

    public default(): Employee[] {
        return observable([]);
    }

}