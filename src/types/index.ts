export interface User {
    _id: string;
    name: string;
    email: string;
    phone?: string;
    role?: 'citizen' | 'government_officer' | 'admin';
    location?: Location;
    createdAt: string;
    updatedAt: string;
}

export interface Location {
    coordinates: [number, number]; // [longitude, latitude]
    address: string;
    type?: string;
}

export interface Comment {
    user: { _id: string; name: string };
    text: string;
    createdAt: string;
}

export interface Issue {
    _id: string; // note: API response shows "id" in one place and "_id" in another, but "id" in Create response has "_id" in reportedBy. Standardize on _id usually, but let's allow string.
    id?: string; // fallback
    text: string;
    imageLink?: string;
    location: Location;
    category: string;
    status: 'open' | 'in-progress' | 'resolved' | 'closed';
    region: string;
    priority?: string;
    upvotes: number;
    reportedBy: User;
    createdAt: string;
    comments?: Comment[];
}

export interface AuthResponse {
    success: boolean;
    message: string;
    data: {
        user: User;
        token?: string;
    };
}

export interface IssuesResponse {
    success: boolean;
    data: Issue[];
    pagination?: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
    count?: number;
}

export interface IssueResponse {
    success: boolean;
    data: Issue;
    message?: string;
}
