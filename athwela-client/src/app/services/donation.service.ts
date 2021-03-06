import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { AppConfig } from '../config/app-config';

@Injectable({
  providedIn: 'root'
})
export class DonationService {
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getDonations() {
    return this.http.get(AppConfig.BASE_URL + 'donations');
  }

  getDonation(id: String) {
    return this.http.get(AppConfig.BASE_URL + 'donations/' + id);
  }

  getUserDonations(id: String) {
    return this.http.get(AppConfig.BASE_URL + 'donations/user/' + id + '/donated');
  }

  getUserDonationsCount(id: String) {
    return this.http.get(AppConfig.BASE_URL + 'donations/user/' + id + '/donated/count');
  }

  getUserDonationsPage(id: string, page: number, limit: number) {
    return this.http.get(AppConfig.BASE_URL + 'donations/user/' + id + '/donated?page=' + page + '&limit=' + limit);
  }


  getWithdrawals() {
    return this.http.get(AppConfig.BASE_URL + 'withdrawals');
  }

  getWithdrawal(id: String) {
    return this.http.get(AppConfig.BASE_URL + 'withdrawals/' + id);
  }

  getUserWithdrawals(id: String) {
    return this.http.get(AppConfig.BASE_URL + 'withdrawals/user/' + id);
  }

  getUserDonationsSum(id: String) {
    return this.http.get(AppConfig.BASE_URL + 'donations/user/' + id + '/donated/sum');
  }

  getUserReceivedDonations(id: String) {
    return this.http.get(AppConfig.BASE_URL + 'donations/user/' + id + '/received');
  }

  getUserReceivedDonationsNotWithdrawen(id: String) {
    return this.http.get(AppConfig.BASE_URL + 'donations/user/' + id + '/not_withdrawen');
  }

  withdraw(withdrawal) {
    this.authService.loadToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json', 'Authorization': this.authService.authToken
      })
    };

    return this.http.post(AppConfig.BASE_URL + 'donations/withdraw', withdrawal, httpOptions);
  }

  approveWithdrawal(id: string) {
    return this.http.put(AppConfig.BASE_URL + 'withdrawals/' + id + '/approve', {});
  }

  rejectWithdrawal(id: string, status_message: string) {
    return this.http.put(AppConfig.BASE_URL + 'withdrawals/' + id + '/reject', {
      status_message: status_message
    });
  }
}
