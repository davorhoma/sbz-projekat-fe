import { Component } from '@angular/core';
import { UserDTO } from '../shared/models/userDTO.model';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-users',
  templateUrl: './search-users.component.html',
  styleUrl: './search-users.component.css'
})
export class SearchUsersComponent {
  users: UserDTO[] = [];
  filteredUsers: UserDTO[] = [];
  searchTerm: string = '';
  errorMessage: string = '';

  constructor(private userService: UserService,
    private router: Router
  ) {}

  onSearch(): void {
    if (this.searchTerm.trim()) {
      this.router.navigate(['/users-list'], { queryParams: { q: this.searchTerm.trim() } });
    }
  }
}
