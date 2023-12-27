import { FC, useEffect, useRef, useState } from "react";
import Card from "./Card";

type SineWaveProps = {
  frequencies: number[],
  themeColors: string[]
}

const SineWave: FC<SineWaveProps> = ({ frequencies, themeColors }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [zoom, setState] = useState(10000);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

      let frames = 0;
      let phi = 0;
      const amplitude = context.canvas.height;
      const w = context.canvas.width;
      const h = context.canvas.height;
      context.lineWidth = 1;

      function Draw(ctx: CanvasRenderingContext2D) {
        frames++;
        phi = frames / 30;

        ctx.clearRect(0, 0, w, h);

        frequencies.forEach((frequency, index) => {
          const color = themeColors[index % themeColors.length];
          ctx.beginPath();
          ctx.strokeStyle = color;
          ctx.lineWidth = 3;

          for (let x = 0; x < w; x++) {
            const y = Math.sin((x * frequency / zoom) + phi) * amplitude / 2 + amplitude / 2; // divide frequency by a larger number
            ctx.lineTo(x, y);
          }

          ctx.stroke();
        });

        window.requestAnimationFrame(() => Draw(ctx));
      }

      window.requestAnimationFrame(() => Draw(context));
    }, [frequencies, themeColors, canvasRef, zoom]);

    // 
    return (
      // a nice 
      <Card>
        <canvas ref={canvasRef} className="w-full h-64 m-2 mt-4" />
        <span className="flex flex-col items-center justify-center p-4">
          <label className="mt-2 w-full text-sm font-bold text-gray-700 flex flex-row items-center">
            Zoom
            <select
              value={zoom}
              onChange={(e) => setState(parseInt(e.target.value))}
              className="m-2 p-2 bg-white rounded-md shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            >
              <option value="1000">1000</option>
              <option value="5000">5000</option>
              <option value="10000">10000</option>
              <option value="50000">50000</option>
              <option value="100000">100000</option>
            </select>
          </label>
        </span>
      </Card>
    );
  }
export default SineWave;
