export default class Position{
    name='';
    id=0;
    points;
    isEditing=false;

    constructor(position = {}) {
        this.name = position.name ? position.name : "";
        this.id = position.id ? position.id : 0;
        this.points = position.points ? position.points : "";
    }
}