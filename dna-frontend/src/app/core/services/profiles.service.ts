import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../models/client.model';

@Injectable({
  providedIn: 'root',
})
export class ProfilesService {
  constructor(private http: HttpClient) {}

  getClient(): Observable<Client> {
    // Get the client information, currently only supporting a single client
    throw new Error('Method not implemented.');
  }

  putClient(): Observable<Client> {
    // Put the client information, create if not exists, update if exists
    throw new Error('Method not implemented.');
  }
}
