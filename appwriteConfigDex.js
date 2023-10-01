import { Account, Client, Databases, Storage } from "appwrite";

export const PROJECT_ID_DEX = '65080044efaf92f3e711'
export const DATABASE_ID_DEX = '650800e170158d5110ee'
export const DEX_DOUBTS_COLLECTION_ID = '650803b773d46a2c0d4f'
export const USERTABLE_COLLECTION_ID = '650c539f155059041bd3'
export const ACTIVE_DEX_COLLECTION_ID = '65084e7779c7240edda7'

const client_dex = new Client()
export const database_dex = new Databases(client_dex)
export const storage_dex = new Storage(client_dex)
export const account_dex = new Account(client_dex)

client_dex.setEndpoint('https://cloud.appwrite.io/v1').setProject(PROJECT_ID_DEX)

export default client_dex