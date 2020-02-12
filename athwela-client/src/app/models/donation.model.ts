import { Timestamp } from 'rxjs/internal/operators/timestamp';

export class Donation {
    _id?: string;
    donation_id: string;
    amount: number;
    currency: string;
    status_code: number;
    status_message: string;
    method: string;
    donor?: any;
    campaign?: any;
    created_at?: string;
}