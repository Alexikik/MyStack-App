import { Guid } from 'guid-typescript';

class InternetProblem {
    public Id: Guid;
    public Date: Date;
    public Interval?: number;
    public ErrorMessage?: string;

    constructor() {
        this.Id = Guid.create();
        this.Date = new Date();
    }
}

export default InternetProblem;