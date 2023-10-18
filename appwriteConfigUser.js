import { Account, Client, Databases, Functions, Storage } from "appwrite";

export const PROJECT_ID_USER = import.meta.env.VITE_PROJECT_ID_USER
export const DATABASE_ID_USER = import.meta.env.VITE_DATABASE_ID_USER
export const USER_DOUBTS_COLLECTION_ID = import.meta.env.VITE_USER_DOUBTS_COLLECTION_ID
export const DOUBT_STORAGE_BUCKET_ID = import.meta.env.VITE_DOUBT_STORAGE_BUCKET_ID
export const STORAGE_BUCKET_ID = import.meta.env.VITE_STORAGE_BUCKET_ID
export const TOKEN_FUNCTION = import.meta.env.VITE_TOKEN_FUNCTION

const client_user = new Client()

export const database_user = new Databases(client_user)
export const storage_user = new Storage(client_user)
export const account_user = new Account(client_user)
export const function_user = new Functions(client_user)

client_user.setEndpoint('https://cloud.appwrite.io/v1').setProject(PROJECT_ID_USER)

export default client_user