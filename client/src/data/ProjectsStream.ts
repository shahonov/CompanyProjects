import { DataStream } from "./DataStream";
import { Project } from "../models/Project";
import { observable } from "mobx";

export class ProjectsStream extends DataStream<Project[]> {

    constructor(intervalTime: number) {
        super('projects', intervalTime);
    }

    public default(): Project[] {
        return observable([]);
    }

}