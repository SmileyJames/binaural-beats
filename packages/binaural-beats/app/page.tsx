import Image from "next/image";
import BinauralBeats from "./BinauralBeats";

export default function Home() {

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-20 bg-gray-100 space-y-8">
      <div className="w-full max-w-md px-4 sm:px-0 space-y-5">
        <h1 className="text-3xl font-bold text-center mb-4">Binaural Beats</h1>
        <h2 className="text-xl text-center mb-4">Experience the power of sound therapy with our binaural beats generator</h2>
      </div>
      <Image src="https://smileyjames.github.io/binaural-beats/Chill.png" width={300} height={300} alt="Chill" />
      <BinauralBeats />
    </div>
  )
}

