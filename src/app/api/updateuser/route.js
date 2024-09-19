import { NextResponse } from 'next/server'
import { clerkClient } from '@clerk/nextjs/server'

export async function PATCH(request) {
 const { firstName, lastName, username, userId } = await request.json()
 
 if (!userId) {
   return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
 }

 try {
   await clerkClient.users.updateUser(userId, {
    firstName,
    lastName,
    username
   })
   return NextResponse.json({ success: true })
 } catch (error) {
   console.error('Error updating user:', error)
   return NextResponse.json({ error: 'Failed to update user' }, { status: 500 })
 }
}