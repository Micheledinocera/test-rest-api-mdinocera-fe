export default class Favorite{
    id=0;
    points=0;
    created_on='';
    name='';

    constructor(position = {}) {
        this.name = position.description ? position.description : "";
        this.created_on = position.created_on ? position.created_on : "";
        this.points = position.points ? position.points : 0;
        this.id = position.id ? position.id : 0;
    }
}