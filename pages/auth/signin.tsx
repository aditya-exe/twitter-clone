import { getProviders, signIn } from "next-auth/react"

const SignIn: React.FC<any> = ({ providers }) => {
  return (
    <div className="flex justify-center mt-20 space-x-4">
      <img className="md:inline-flex object-cover md:w-44 md:h-80 hidden " src="https://cdn.cms-twdigitalassets.com/content/dam/help-twitter/en/twitter-tips/desktop-assets/ch-01/ch11signup.png.twimg.1920.png" />
      <div>
        {Object.values(providers).map((provider: any) => (
          <div className="flex flex-col items-center">
            <img className="w-36 object-cover " src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfK8Srfq7kAN6dM7d_UZkMJxdqJJouhkDZtQ&usqp=CAU"} />
            <p className="text-center text-sm italic my-10">This app is created for educational purposes only</p>
            <button onClick={()=>signIn(provider.id, {callbackUrl: "/"})} className="bg-red-400 rounded-lg p-3 text-white hover:bg-red-500">Sign In with {provider.name}</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SignIn

export async function getServerSideProps() {
  const providers = await getProviders()
  return {
    props: {
      providers,
    }
  }
}