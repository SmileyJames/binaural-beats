import Card from "./Card";

const FrequencyInfo = ({ leftFrequency, rightFrequency }: { leftFrequency: number, rightFrequency: number }) => (
  <div className="flex gap-3 w-full h-full">
    <Card>
      <div className="font-bold text-m mb-2 text-center">Left Frequency</div>
      <p className="text-gray-700 text-base text-center">
        {leftFrequency}
      </p>
    </Card>
    <Card>
        <div className="font-bold text-m mb-2 text-center">Right Frequency</div>
        <p className="text-gray-700 text-base text-center">
          {rightFrequency}
        </p>
    </Card>
  </div>
)

export default FrequencyInfo;