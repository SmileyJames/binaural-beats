import Card from "./Card";

const PlaybackControls = ({ isPlaying, setIsPlaying }: { isPlaying: boolean, setIsPlaying: (isPlaying: boolean) => void }) => {
  return (
    <Card>
      <div className="flex justify-center p-4">
      <button onClick={() => setIsPlaying(!isPlaying)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        {isPlaying ? 'Pause' : 'Play'}
      </button>
      </div>
    </Card>
  )
}

export default PlaybackControls;