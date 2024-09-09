import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center flex-col w-full h-full">
      <main className="flex items-center justify-center flex-col content-center w-full h-full">
        <p>Login/Register to see all upcoming treks!</p>
        <div className="flex gap-4 justify-center items-center">
          <Link
            href="/auth/signin"
            className="bg-green py-2 px-7 rounded-full text-white"
          >
            Login
          </Link>
          <Link
            href="/auth/register"
            className="bg-yellow py-2 px-7 rounded-full text-black"
          >
            Register
          </Link>
        </div>
      </main>
      {/* <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer> */}
    </div>
  );
}
