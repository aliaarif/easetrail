
import { OAuth2Client } from "google-auth-library";
import UserModel from "~~/server/models/User";
// Get runtime config variables
const config = useRuntimeConfig()

// Create Google Client
const googleClientId = config.googleClientId
const client = new OAuth2Client()

// API event handler
export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const token = body.token
    if (!token) {
        throw createError({
            statusCode: 'fail',
            statusMessage: 'No token or invalid token provided'
        })
    }
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: googleClientId,  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    let checkExistingUser = await UserModel.findOne({ email: ticket.payload.email }, {})
    if (checkExistingUser) {
        return checkExistingUser
    } else {
        return await UserModel.create({
            name: ticket.payload.name,
            email: ticket.payload.email,
            role: 'User',
            gender: 'Male',
            lock: false,
            avatar: ticket.payload.picture
        })
    }
})

/**
 * @desc Verifies JSON web token and returns user datat if token is valid
 * @param token JSON web token from Google
 * @returns
*/

async function verify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: googleClientId,  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload()
    payload.role = 'User'
    return payload
}
