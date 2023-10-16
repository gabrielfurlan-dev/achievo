export interface IUserListItem {
    id: string;
    name: string;
    username: string;
    imageURL: string;
    commonFollowers: string[];
    isFollowing: boolean;
}
