import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

export default function Palmares() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-shimmer">Palmarès</h1>
          <div className="section-divider w-24 mx-auto mb-8"></div>
          <div className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Awards & Recognitions
          </div>
        </div>

        <div className="text-center space-y-12">
          {/* Cup emote */}
          <div className="text-9xl select-none" aria-label="Trophy Cup" role="img">
            🏆
          </div>

          {/* Message */}
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            This space will celebrate the films, creators, and moments that shaped
            our cinematic journey.
            <br /><br />
            <span className="italic">Coming soon.</span>
          </p>

          {/* CTA */}
          <div className="space-x-4">
            <Button asChild>
              <Link to="/">← Back to Home</Link>
            </Button>
          </div>

        </div>
      </div>
    </div>
  )
}
