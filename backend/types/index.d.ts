export interface Alert {
    id: string;
    title: string;
    description: string;
    location: {
        latitude: number;
        longitude: number;
    };
    severity: 'low' | 'medium' | 'high';
    createdAt: Date;
    updatedAt: Date;
}

export interface User {
    id: string;
    username: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateAlertInput {
    title: string;
    description: string;
    location: {
        latitude: number;
        longitude: number;
    };
    severity: 'low' | 'medium' | 'high';
}

export interface UpdateAlertInput {
    id: string;
    title?: string;
    description?: string;
    location?: {
        latitude?: number;
        longitude?: number;
    };
    severity?: 'low' | 'medium' | 'high';
}