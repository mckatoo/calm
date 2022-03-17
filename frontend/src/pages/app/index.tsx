import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

const App = () => {
  const { data: session, status } = useSession()

  if (status === "loading") return <div>Loading...</div>

  if (!session) return null

  const handleSignOut = () => signOut({
    callbackUrl: "/"
  })

  console.log('session', session)

  return <div className="text-white">
    {!!session.user.image &&
      <Image
        className="rounded-full h-64 w-64"
        src={session.user.image}
        layout='fixed' width={64}
        height={64}
        alt={session.user.name}
      />}
    <h1>Hello {!!session.user.name && session.user.name}</h1>
    <h2>{!!session.user.email && session.user.email}</h2>
    <button onClick={handleSignOut}>Sair</button>
  </div>
}

export default App