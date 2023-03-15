import {User} from "./User";
import {DocumentReference, QueryDocumentSnapshot, Timestamp} from "@firebase/firestore";

export interface Glide {
    id: string;
    lookup: string;
    uid: string;
    content: string;
    user: Partial<User> | DocumentReference;
    likesCount: number;
    subGlidesCount: number;
    date: Timestamp;
}

export type UserGlide = {
    lookup: DocumentReference;
}

export type UseGlideState = {
    pages: {
        [key: string]: { glides: Glide[] }
    };
    loading: boolean;
    lastGlide: QueryDocumentSnapshot | null;
}
