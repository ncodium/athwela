export interface Campaign {
    _id?: string;
    name: string;
    description: string;
    target?: number;
    raised?: number;
    deadline: Date;
    category?: string;
	owner?: any;
}
