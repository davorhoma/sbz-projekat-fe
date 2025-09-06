import { Component } from '@angular/core';
import { FriendRequest } from '../shared/models/friendRequest.model';
import { UserService } from '../services/user.service';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { forkJoin } from 'rxjs';

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
  blockedIds: string[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.fetchRequests();
    
    forkJoin({
      friends: this.userService.getFriends(),
      blocked: this.userService.getBlockedUsers()
    }).subscribe({
      next: ({ friends, blocked }) => {
        this.friends = friends;
        this.blockedIds = blocked;

        this.friends.forEach(fr => {
          if (this.blockedIds.includes(fr.otherUser.id)) {
            console.log("Friend is blocked:", fr.otherUser.id);
          }
        });

        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Failed to load data';
        this.loading = false;
      }
    });
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

  // fetchFriends(): void {
  //   this.userService.getFriends().subscribe({
  //     next: (res) => {
  //       this.friends = res;
  //       console.log(this.friends[0].otherUser);
  //       console.log(this.friends[1].otherUser);
  //       this.fetchBlockedUsers();
        
  //     },
  //     error: (err) => {
  //       console.error(err);
  //       this.errorMessage = 'Failed to load friends';
  //     }
  //   }); 
  // }

  // fetchBlockedUsers(): void {
  //   this.userService.getBlockedUsers().subscribe({
  //     next: (res: string[]) => {
  //       console.log('Blocked users', res);
  //       this.blockedIds = res;
  //       this.friends.forEach(fr => {
  //         const isBlocked = this.blockedIds.some(id => id === fr.otherUser.id);
  //         if (isBlocked) {
  //           console.log("Friend is blocked:", fr.otherUser.id);
  //         }
  //       });
  //     },
  //     error: (err) => {
  //       console.log(err);
  //     }
  //   })
  // }

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

  toggleBlock(userId: string): void {
    const isBlocked = this.blockedIds.includes(userId);

    if (isBlocked) {
      this.userService.unblockUser(userId).subscribe({
        next: (res) => {
          if (res.success) {
            this.blockedIds = this.blockedIds.filter(id => id !== userId);
            console.log(`Unblocked user ${userId}`);
          }
        },
        error: (err) => console.error('Failed to unblock user', err)
      });
    } else {
      this.userService.blockUser(userId).subscribe({
        next: (res) => {
          if (res.success) {
            this.blockedIds.push(userId);
            console.log(`Blocked user ${userId}`);
          }
        },
        error: (err) => console.error('Failed to block user', err)
      });
    }
  }
}
