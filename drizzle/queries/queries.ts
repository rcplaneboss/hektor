import { db } from '../config/config';
import { InsertUser, SelectUser, users } from '../schema/schema';
import { eq } from "drizzle-orm";
type User = {
    id?: string,
    name: string,
    email: string ,
    hashedPassword?: string,
    phone?: string,
    image: string ,
    provider?: string,
    role?: string ,
    createdAt?: Date,
    updatedAt?: Date,
}

export async function createUser(data: InsertUser) {
 return await db.insert(users).values(data);
}

export async function getUserByEmail(email: SelectUser['email']): Promise<Array<{
    id: string,
    name: string | null,
    email: string ,
    hashedPassword: string,
    phone: string | null,
    image: string | null,
    provider: string | null,
    role: string | null,
    createdAt?: Date | null,
    updatedAt?: Date | null,
}>> {
   return db.select().from(users).where(eq(users.email, email));
}

export async function upsertUser(data: User) {
    return db.insert(users).values(data).onConflictDoNothing({
        target: users.email,
    })
}

export async function getUserById(id: string): Promise<Array<{
    id: string,
    name: string | null,
    email: string ,
    hashedPassword: string,
    phone: string | null,
    image: string | null,
    provider: string | null,
    role: string | null,
    createdAt?: Date | null,
    updatedAt?: Date | null,
}>> {
   return db.select().from(users).where(eq(users.id, id));
}

export async function updateUser(id: string, data: Partial<User>) {
    return db.update(users).set(data).where(eq(users.id, id));
}