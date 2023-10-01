import { Account, Client, Databases, Storage } from "appwrite";

export const PROJECT_ID_USER = '6501f589749b017b3146'
export const DATABASE_ID_USER = '6501f718922d5e24e536'
export const USER_DOUBTS_COLLECTION_ID = '6501f7240d068a07c4d1'
export const DOUBT_STORAGE_BUCKET_ID = '6501fb7388c3afe58df4'
export const STORAGE_BUCKET_ID = '6501fb7388c3afe58df4'

const client_user = new Client()
export const database_user = new Databases(client_user)
export const storage_user = new Storage(client_user)
export const account_user = new Account(client_user)

client_user.setEndpoint('https://cloud.appwrite.io/v1').setProject(PROJECT_ID_USER)

export default client_user