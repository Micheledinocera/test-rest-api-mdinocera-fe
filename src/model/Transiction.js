import Utils from "../components/Utils/Utils"

export default class Transiction{
    name='';
    points=0;
    id=0;
    description='';
    created_on='';

    constructor(position = {}) {
        this.name = position.name ? position.name : "";
        this.id = position.id ? position.id : 0;
        this.description = position.description ? position.description : "";
        this.points = position.points ? position.points : 0;
        this.created_on = position.created_on ? Utils.timeConverter(Date(position.created_on*1000)) : "";
    }
}