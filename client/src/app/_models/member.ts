import { Photo } from "./photo";

export interface Member {
    id:         number;
    username:   string;
    age:        number;
    knownAs:    string;
    created:    Date;
    lastActive: Date;
    gender:     string;
    about:      string;
    city:       string;
    country:    string;
    photos:     Photo[];
    photoUrl:   string;
}


