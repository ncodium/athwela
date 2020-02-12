export class Campaign {
    _id?: string;
    name: string;
    description: string;
    target: number = 0;
    raised: number = 0;
    deadline: Date;
    category?: string;
    owner?: any;
    verified_by?: any;
    comments?: any;
    complete?: boolean;
    rejected?: boolean;
    reject_reason?: string;
}