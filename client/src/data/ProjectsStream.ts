import { observable } from "mobx";
import { DataStream } from "./DataStream";
import { Project } from "../models/Project";

export class ProjectsStream extends DataStream<Project[]> {

    constructor(intervalTime: number) {
        super('projects', intervalTime);
    }

    public default(): Project[] {
        return observable([]);
    }
}