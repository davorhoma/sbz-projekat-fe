import { Component } from '@angular/core';
import { UserDTO } from '../shared/models/userDTO.model';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent {

  users: UserDTO[] = [];
  errorMessage: string = '';

  constructor(private userService: UserService, 
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const searchTerm = params['q'] || '';
      this.fetchUsers(searchTerm);
    });
  }

  fetchUsers(searchTerm: string): void {
    this.userService.findUsers(searchTerm).subscribe({
        next: (res) => this.users = res,
        error: (err) => {
          console.error(err);
          this.errorMessage = 'Failed to fetch users';
        }
      });
  }

  addFriend(userId: string) {
    this.userService.addFriend(userId).subscribe({
      next: () => {

      },
      error: () => {

      }
    });
  }
}
