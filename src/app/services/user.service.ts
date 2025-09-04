import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDTO } from '../shared/models/userDTO.model';
import { FriendRequest } from '../shared/models/friendRequest.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersUrl = 'http://localhost:8080/users/';

  constructor(private http: HttpClient) { }

  getAll(): Observable<UserDTO[]> {
    return this.http.get<UserDTO[]>(`${this.usersUrl}all`);
  }

  findUsers(searchTerm: string): Observable<UserDTO[]> {
    return this.http.get<UserDTO[]>(`${this.usersUrl}search?searchTerm=${encodeURIComponent(searchTerm)}`);
  }

  addFriend(recipientId: string): Observable<UserDTO> {
    return this.http.post<UserDTO>(`${this.usersUrl}send-friend-request/${recipientId}`, {});
  }

  getMyFriendRequests(): Observable<FriendRequest[]> {
    return this.http.get<FriendRequest[]>(`${this.usersUrl}friend-requests`);
  }

  updateFriendRequestStatus(friendRequestId: string, newStatus: string): Observable<boolean> {
    return this.http.put<boolean>(`${this.usersUrl}update-friend-request-status`, {
      friendRequestId: friendRequestId,
      status: newStatus
    })
  }

  getFriends() {
    return this.http.get<FriendRequest[]>(`${this.usersUrl}friends`);
  }
}
