import { auth, SIGN_IN_PAGE_PATH } from './auth'
import {NextResponse} from "next/server";

const redirectSignIn = () => NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}${SIGN_IN_PAGE_PATH}`);

export async function middleware() {
    const session = await auth();
    console.log("middleware session", session)
    if (!session) {
        return redirectSignIn();
    }

    // TODO Session Validation 로직 추가
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/dashboard',
        '/event/:path*',
        '/stores/:path*',
        '/users/:path*',
        '/sales/:path*',
        '/admin-accounts/:path*',
        '/settings/:path*',
    ],
}
