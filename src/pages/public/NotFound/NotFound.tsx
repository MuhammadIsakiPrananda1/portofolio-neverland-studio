import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import Button from '@components/atoms/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="container-custom">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-9xl font-bold text-gradient mb-4">404</h1>
            <h2 className="text-4xl font-bold text-white mb-4">Page Not Found</h2>
            <p className="text-xl text-gray-400">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </div>

          <Link to="/">
            <Button variant="primary" size="lg" leftIcon={<Home className="w-5 h-5" />}>
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
