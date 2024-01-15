import {auth, authOptions} from "./auth"
import {NextResponse} from "next/server";

const redirectSignIn = () => NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}${authOptions.pages.signIn}`);

export async function middleware() {
    const session = await auth();
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
