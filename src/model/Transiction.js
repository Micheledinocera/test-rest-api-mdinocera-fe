export default class Transiction{
    name='';
    points=0;
    description='';

    constructor(position = {}) {
        this.name = position.name ? position.name : "";
        this.description = position.description ? position.description : "";
        this.points = position.points ? position.points : 0;
    }
}