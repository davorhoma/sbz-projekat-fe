import { Component } from '@angular/core';
import { FriendRequest } from '../shared/models/friendRequest.model';
import { UserService } from '../services/user.service';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@Component({
  selector: 'app-my-friend-requests',
  standalone: true,
  imports: [BrowserAnimationsModule],
  templateUrl: './my-friend-requests.component.html',
  styleUrl: './my-friend-requests.component.css'
})
export class MyFriendRequestsComponent {

  friendRequests: FriendRequest[] = [];
  errorMessage: string | null = null;
  loading: boolean = false;

  friends: FriendRequest[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.fetchRequests();

    this.fetchFriends();
  }

  fetchRequests(): void {
    this.loading = true;
    this.userService.getMyFriendRequests().subscribe({
      next: (res) => {
        this.friendRequests = res;
        this.loading = false;

        console.log(this.friendRequests[0].otherUser);
        
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Failed to load friend requests';
        this.loading = false;
      }
    });
  }

  fetchFriends(): void {
    this.userService.getFriends().subscribe({
      next: (res) => {
        this.friends = res;

        console.log(this.friends[0].otherUser);
        
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Failed to load friends';
      }
    }); 
  }

  acceptRequest(requestId: string) {
  this.userService.updateFriendRequestStatus(requestId, "ACCEPTED").subscribe({
    next: () => {
      const index = this.friendRequests.findIndex(req => req.id === requestId);
      if (index !== -1) {
        this.friendRequests[index] = {
          ...this.friendRequests[index],
          status: 'ACCEPTED'
        };
        this.friendRequests = [...this.friendRequests];
      }
    },
    error: (err) => console.error(err)
  });
}

declineRequest(requestId: string) {
  this.userService.updateFriendRequestStatus(requestId, "DECLINED").subscribe({
    next: () => {
      const index = this.friendRequests.findIndex(req => req.id === requestId);
      if (index !== -1) {
        this.friendRequests[index] = {
          ...this.friendRequests[index],
          status: 'DECLINED'
        };
        this.friendRequests = [...this.friendRequests];
      }
    },
    error: (err) => console.error(err)
  });
}
}
