import { UserDTO } from "./userDTO.model";

export interface FriendRequest {
  id: string;
  otherUser: UserDTO;
  status: 'PENDING' | 'ACCEPTED' | 'DECLINED';
}