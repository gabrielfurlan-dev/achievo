export interface IUserListItem {
    id: string;
    name: string;
    username: string;
    imageURL: string;
    commonFollowers: string[];
    isFollowingYou: boolean;
    following: boolean;
}
