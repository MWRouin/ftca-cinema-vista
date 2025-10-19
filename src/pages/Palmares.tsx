import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function Palmares() {
  return (
    <div className="min-h-screen flex items-center justify-center py-24">
      <div className="max-w-3xl w-full text-center">
        <div className="mb-6">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Palmarès</h1>
          <p className="text-lg text-muted-foreground">Coming soon — stay tuned!</p>
        </div>

        <div className="space-x-4">
          <Button asChild>
            <Link to="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
