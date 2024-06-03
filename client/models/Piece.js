export class Piece {
    initial;
    img;
    constructor(initial) {
        this.initial = initial
        if (initial === initial.toUpperCase()) {
            this.img = `w${initial.toUpperCase()}.png`
        } else {
            this.img = `b${initial.toUpperCase()}.png`
        }
        
    }
}

