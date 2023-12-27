import Card from "./Card";

const MoodInfo = ({ frequency }: { frequency: number }) => {
  let mood: string;
  let goal: string;
  let moodColor: string;

  switch (true) {
    case (frequency < 4):
      mood = 'Delta Waves - Deep Sleep';
      goal = 'Deep sleep or healing';
      moodColor = 'text-blue-500';
      break;
    case (frequency < 8):
      mood = 'Theta Waves - Meditation';
      goal = 'Meditation or stress reduction';
      moodColor = 'text-green-500';
      break;
    case (frequency < 14):
      mood = 'Alpha Waves - Relaxed Focus';
      goal = 'Light work or studying';
      moodColor = 'text-yellow-500';
      break;
    default:
      mood = 'Beta Waves - Intense Focus';
      goal = 'Intense work or studying';
      moodColor = 'text-red-500';
  }

  return (
    <Card>
      <div className={`p-4 ${moodColor}`}>
        <div className="text-xl font-bold">{mood}</div>
        <div className="text-sm">Ideal for {goal}</div>
      </div>
    </Card>
  )
}

export default MoodInfo;