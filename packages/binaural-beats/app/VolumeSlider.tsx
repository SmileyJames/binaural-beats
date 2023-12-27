import Card from "./Card";

const VolumeSlider = ({ value, onChange }: { value: number, onChange: (value: number) => void }) => (
  <Card>
    <div className="flex-shrink-0">
      <span className="text-2xl">
        {value * 100}%
      </span>
    </div>
    <div>
      <div className="text-xl font-medium text-black">Volume</div>
      <input type="range" min={0} max={1} step={0.01} value={value} onChange={(e) => onChange(e.target.valueAsNumber)} className="mt-2 w-full" />
    </div>
  </Card>
);

export default VolumeSlider;