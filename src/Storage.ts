import { firebase, FirebaseDatabaseTypes } from "@react-native-firebase/database";
import { ReactNativeFirebase } from "@react-native-firebase/app";

class Storage {
  private readonly _databaseUrl = "https://woohoo-f1e6f-default-rtdb.asia-southeast1.firebasedatabase.app";
  private app: ReactNativeFirebase.FirebaseApp | null = null;

  init() {
    return new Promise<ReactNativeFirebase.FirebaseApp>((resolve) => {
      const app = firebase.app();
      this.app = app;
      resolve(app);
    });
  }

  database(): FirebaseDatabaseTypes.Module {
    if (!this.app) {
      throw new Error("must init firebase app");
    }
    return this.app.database(this._databaseUrl);
  }
}

const storage = new Storage();

export default storage;
