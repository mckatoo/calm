import { signOut } from "next-auth/react";

export default function App() {
  const handleSignOut = () => signOut({
    callbackUrl: "/"
  })

  return <>
    <h1>Hello World</h1>
    <button onClick={handleSignOut}>Sair</button>
  </>
}