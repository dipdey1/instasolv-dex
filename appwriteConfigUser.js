import { Account, Client, Databases, Storage } from "appwrite";

export const PROJECT_ID_USER = ''
export const DATABASE_ID_USER = ''
export const USER_DOUBTS_COLLECTION_ID = ''
export const DOUBT_STORAGE_BUCKET_ID = ''
export const API_AUTH_KEY = ''

const client_user = new Client()
export const database_user = new Databases(client_user)
export const storage_user = new Storage(client_user)
export const account_user = new Account(client_user)

client_user.setEndpoint('https://cloud.appwrite.io/v1').setProject(PROJECT_ID_USER)

export default client_user