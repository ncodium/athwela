export class Campaign {
    _id?: string;
    name: string;
    description: string;
    target: number;
    raised?: number;
    deadline: Date;
    category?: string;
    owner?: any;
    verified_by?: any;
    comments?: any;
    complete?: boolean;
    rejected?: boolean;
    reject_reason?: string;
    images?: string[];
    documents?: any[];
}