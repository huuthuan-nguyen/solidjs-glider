import {
    addDoc,
    collection,
    doc,
    DocumentReference,
    getDoc,
    getDocs, limit, onSnapshot,
    orderBy,
    query, QueryConstraint, QueryDocumentSnapshot, startAfter,
    Timestamp, where
} from "@firebase/firestore";
import {db} from "../db";
import {Glide} from "../types/Glide";
import {User} from "../types/User";

const getGlides = async (loggedInUser: User, lastGlide: QueryDocumentSnapshot | null) => {
    const _loggedUserDoc = doc(db, "users", loggedInUser.uid);
    const constraints: QueryConstraint[] = [
        orderBy("date", "desc"),
        limit(10),
    ]

    if (loggedInUser.following.length > 0) {
        constraints.push(where("user", "in", [...loggedInUser.following, _loggedUserDoc]));
    } else {
        console.log(_loggedUserDoc);
        constraints.push(where("user", "==", _loggedUserDoc));
    }

    if (!!lastGlide) {
        constraints.push(startAfter(lastGlide));
    }

    const q = query(collection(db, "glides"), ...constraints);
    const qSnapshot = await getDocs(q);
    const _lastGlide = qSnapshot.docs[qSnapshot.docs.length - 1];

    const glides = await Promise.all(qSnapshot.docs.map(async doc => {
        const glide = doc.data() as Glide;
        const userSnap = await getDoc(glide.user as DocumentReference);
        glide.user = userSnap.data() as User;
        return {
            ...glide,
            id: doc.id,
        }
    }));

    return {glides, lastGlide: _lastGlide};
}

const subscribeToGlides = (loggedInUser: User, getCallback: (g: Glide[]) => void) => {
    const _collection = collection(db, "glides");
    const constraints = [
        where("date", ">", Timestamp.now()),
        where("user", "in", loggedInUser.following),
    ];

    const q = query(
        _collection,
        ...constraints,
    );

    return onSnapshot(q, async (querySnapshot) => {
        const glides = await Promise.all(querySnapshot.docs.reverse().map(async doc => {
            const glide = doc.data() as Glide;
            const userSnapshot = await getDoc(glide.user as DocumentReference);
            glide.user = userSnapshot.data() as User;
            return {...glide, id: doc.id};
        }));

        getCallback(glides);
    });
}

const createGlide = async (form: {
    content: string;
    uid: string;
}): Promise<Glide> => {
    const userRef = doc(db, "users", form.uid);
    const glideToStore = {
        ...form,
        user: userRef,
        likesCount: 0,
        subGlidesCount: 0,
        date: Timestamp.now(),
    };

    const glideCollection = collection(db, "glides");
    const added = await addDoc(glideCollection, glideToStore);

    return {
        ...glideToStore,
        id: added.id,
    };
}

export {
    createGlide,
    getGlides,
    subscribeToGlides,
}