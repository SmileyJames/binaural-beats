import Card from "./Card"

type FrequencySliderProps = {
  min: number,
  max: number,
  value: number,
  onChange: (value: number) => void,
  label: string
}

const Hz = ({ value }: { value: number }) => (
  <span className="text-2xl">
    {value} Hz
  </span>
)

const FrequencySlider = ({ min, max, value, onChange, label }: FrequencySliderProps) => (
  <Card>
    <div className="flex-shrink-0">
      <Hz value={value} />
    </div>
    <div>
      <div className="text-xl font-medium text-black">{label}</div>
      <input type="range" min={min} max={max} value={value} onChange={(e) => onChange(e.target.valueAsNumber)} className="mt-2 w-full" />
    </div>
  </Card>
);

export default FrequencySlider;
