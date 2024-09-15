import { SignIn } from "@clerk/nextjs";

export default function Page() {
    return (
      <>
        <div className="flex items-center justify-center h-screen" style={{ background: 'black', margin: 0, padding: 0 }}>
            <div className="bg-gradient-to-r relative from-cyan-500 to-blue-500 w-full h-full flex items-center justify-center">
              <SignIn />
              <div className="absolute bottom-0 right-0 ">
                <img src="/authpages.png"></img>
              </div>
        </div>
        </div>
      </>
    );
  }