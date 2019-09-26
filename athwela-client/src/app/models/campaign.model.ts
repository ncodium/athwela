export class Campaign {
    name: string;
    description: string;
    target: number;
    raised: number = 0;
    deadline: Date;
}