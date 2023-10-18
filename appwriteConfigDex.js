import { Account, Client, Databases, Functions, Storage } from "appwrite";

export const PROJECT_ID_DEX = import.meta.env.VITE_PROJECT_ID_DEX
export const DATABASE_ID_DEX = import.meta.env.VITE_DATABASE_ID_DEX
export const DEX_DOUBTS_COLLECTION_ID = import.meta.env.VITE_DEX_DOUBTS_COLLECTION_ID
export const USERTABLE_COLLECTION_ID = import.meta.env.VITE_USERTABLE_COLLECTION_ID
export const ACTIVE_DEX_COLLECTION_ID = import.meta.env.VITE_ACTIVE_DEX_COLLECTION_ID
export const TOKEN_SERVER = import.meta.env.VITE_TOKEN_SERVER

const client_dex = new Client()
export const database_dex = new Databases(client_dex)
export const storage_dex = new Storage(client_dex)
export const account_dex = new Account(client_dex)
export const function_dex = new Functions(client_dex)

client_dex.setEndpoint('https://cloud.appwrite.io/v1').setProject(PROJECT_ID_DEX)

export default client_dex