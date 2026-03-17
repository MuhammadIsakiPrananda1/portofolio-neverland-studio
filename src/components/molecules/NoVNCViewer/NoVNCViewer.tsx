import React, { useEffect, useRef } from 'react';
import { Loader2, AlertTriangle, X } from 'lucide-react';

interface NoVNCViewerProps {
  url: string;
  title?: string;
  onClose?: () => void;
  fullscreen?: boolean;
}

/**
 * noVNC Viewer Component
 * Displays Debian VM desktop via WebSocket + VNC
 * 
 * Usage:
 * <NoVNCViewer url="http://server:6080/vnc.html?path=?token=xxx" />
 */
export default function NoVNCViewer({
  url,
  title = 'Virtual Lab VM',
  onClose,
  fullscreen = false,
}: NoVNCViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  useEffect(() => {
    if (!url) {
      setError('No connection URL provided');
      return;
    }

    // Set iframe to loading state
    setLoading(true);
    setError(null);
  }, [url]);

  const handleIframeLoad = () => {
    setLoading(false);
  };

  const handleIframeError = () => {
    setLoading(false);
    setError('Failed to load VM console. Please check your connection.');
  };

  if (error) {
    return (
      <div className={`flex flex-col items-center justify-center gap-4 p-6 rounded-lg bg-red-500/10 border border-red-500/20 ${fullscreen ? 'h-screen' : 'h-96'}`}>
        <AlertTriangle className="w-12 h-12 text-red-400" />
        <div className="text-center">
          <h3 className="text-lg font-semibold text-red-400 mb-2">{title} - Connection Error</h3>
          <p className="text-sm text-red-300">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative bg-black rounded-lg overflow-hidden border border-gray-700 ${fullscreen ? 'fixed inset-0 z-50' : ''}`}
      style={fullscreen ? { borderRadius: 0 } : {}}
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-4 bg-gray-900 border-b border-gray-700 px-4 py-3">
        <div>
          <h3 className="font-semibold text-white text-sm">{title}</h3>
          <p className="text-xs text-gray-400">Remote Desktop</p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded transition-colors"
            title="Close viewer"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-40 rounded-b-lg">
          <div className="text-center">
            <Loader2 className="w-8 h-8 text-primary animate-spin mx-auto mb-2" />
            <p className="text-sm text-gray-300">Connecting to VM...</p>
          </div>
        </div>
      )}

      {/* noVNC iframe */}
      <iframe
        ref={iframeRef}
        src={url}
        className={`w-full bg-black ${fullscreen ? 'h-[calc(100vh-60px)]' : 'h-96'}`}
        title={title}
        onLoad={handleIframeLoad}
        onError={handleIframeError}
        sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
        allowFullScreen
      />

      {/* Instructions */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 text-xs text-gray-400 hidden group-hover:block">
        <p>💡 Use mouse and keyboard to interact with the desktop</p>
        <p>🔒 VM is isolated and secure - full root access inside container</p>
      </div>
    </div>
  );
}
