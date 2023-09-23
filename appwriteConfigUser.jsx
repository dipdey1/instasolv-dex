import { Client, Databases, Storage,Account} from "appwrite";

export const PROJECT_ID_USER = '6501f589749b017b3146';
export const DATABASE_ID_USER = '6501f718922d5e24e536';
export const DOUBT_COLLECTION_ID = '6501f7240d068a07c4d1';

const client_user = new Client()

export const database_dex = new Databases(client_user)
export const storage_dex = new Storage(client_user)
export const account_dex = new Account(client_user)

client_user.setEndpoint('https://cloud.appwrite.io/v1').setProject(PROJECT_ID_USER)

export default client_user