import { redirect } from 'next/navigation'

export default function Home() {
  redirect("/authorization/sign-in")
}
