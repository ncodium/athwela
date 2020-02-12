import { Donation } from './donation.model';
import { User } from './user.model';

export class Withdrawal {
    amount: number;
    currency: string;
    donations?: Donation[];
    status_code: number;
    status_message: string;
    bank_name: string;
    bank_account: string;
    payee_name: string;
    user?: User;
    created_at: Date;
    updated_at: Date;
}
