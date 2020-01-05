import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../config/app-config';

@Injectable({
  providedIn: 'root'
})
export class DonationService {
  constructor(
    private http: HttpClient,
  ) { }

  getDonation(id: String) {
    return this.http.get(AppConfig.BASE_URL + 'donations/' + id)
  }

  getDonations() {
    return this.http.get(AppConfig.BASE_URL + 'donations');
  }

  getUserDonations(id: String) {
    return this.http.get(AppConfig.BASE_URL + 'donations/user/' + id)
  }
}
