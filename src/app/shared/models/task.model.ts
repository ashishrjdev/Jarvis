export class Task {
    name: string;
    description: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    comments: {comment: string, createdAt: Date}[];
}