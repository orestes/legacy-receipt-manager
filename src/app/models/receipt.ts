import * as firebase from 'firebase';

export interface Receipt {
  id?: string;
  created: firebase.firestore.Timestamp;
  date: firebase.firestore.Timestamp;
  total: number;
  fileName: string;
  category: string;
  text: any;
}
