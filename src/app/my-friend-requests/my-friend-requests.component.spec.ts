import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFriendRequestsComponent } from './my-friend-requests.component';

describe('MyFriendRequestsComponent', () => {
  let component: MyFriendRequestsComponent;
  let fixture: ComponentFixture<MyFriendRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyFriendRequestsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyFriendRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
