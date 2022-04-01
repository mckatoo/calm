import { signOut, useSession } from "next-auth/react";
import Container from "../../components/Container";
import Loader from "../../components/Loader";
import SideMenu from "../../components/SideMenu";

const App = () => {
  const { data: session, status } = useSession()

  if (status === "loading")
    return (
      <div className="bg-white flex align-center justify-center">
        <Loader
          className="h-40 w-40"
        />
      </div>
    )

  if (!session) return null

  const handleSignOut = () => signOut({
    callbackUrl: "/"
  })

  return (
    <body className="text-orange-50">
      <main>
        <div className="flex flex-col md:flex-row">
          <SideMenu />
          <Container>
            Conteúdo
          </Container>
        </div>
      </main>
    </body>
  )

  // return <div className="text-white">
  //   {!!session.user.image &&
  //     <Image
  //       className="rounded-full h-64 w-64"
  //       src={session.user.image}
  //       layout='fixed' width={64}
  //       height={64}
  //       alt={session.user.name}
  //     />}
  //   <h1>Hello {!!session.user.name && session.user.name}</h1>
  //   <h2>{!!session.user.email && session.user.email}</h2>
  //   <button onClick={handleSignOut}>Sair</button>
  // </div>
}

export default App