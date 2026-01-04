'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { HttpRequest } from '@/lib/HttpRequest';
import CustomAlert from '@/components/ui/CustomAlert';
import { Clipboard, Send, Home, RefreshCw } from 'lucide-react';

type ErrorProps = {
  error: any;
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  const router = useRouter();
  const [showDetails, setShowDetails] = React.useState(false);
  const [reporting, setReporting] = React.useState(false);
  const [reportId, setReportId] = React.useState<string | null>(null);
  const [alert, setAlert] = React.useState<{ open: boolean; status: 'success' | 'failure'; message: string }>({ open: false, status: 'success', message: '' });

  React.useEffect(() => {
    // Log server-side as well if needed
  }, [error]);

  const copyError = async () => {
    try {
      const text = (error && (error.stack || error.message)) ? `${error.stack || error.message}` : JSON.stringify(error);
      await navigator.clipboard.writeText(text);
      setAlert({ open: true, status: 'success', message: 'Copied error details to clipboard' });
    } catch (e) {
      setAlert({ open: true, status: 'failure', message: 'Failed to copy details' });
    }
  };

  const goHome = () => router.push('/');

  const reportIssue = async () => {
    if (reporting) return;
    setReporting(true);
    try {
      const payload = {
        message: error?.message || 'Unknown error',
        stack: error?.stack || null,
        path: typeof window !== 'undefined' ? window.location.pathname : undefined,
        timestamp: new Date().toISOString(),
      };
      // POST to server-side reporting endpoint
      const res = await HttpRequest({ url: '/api/errors', method: 'POST', data: payload });
      const id = res?.id || res?.reportId || res?.report_id || null;
      setReportId(id);
      setAlert({ open: true, status: 'success', message: id ? `Report sent (id: ${id})` : 'Report sent' });
    } catch (e) {
      setAlert({ open: true, status: 'failure', message: 'Failed to send report' });
    } finally {
      setReporting(false);
    }
  };

  const isDev = process.env.NODE_ENV === 'development';

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50 p-6">
      <CustomAlert open={alert.open} status={alert.status} message={alert.message} onClose={() => setAlert((a) => ({ ...a, open: false }))} />

      <Card className="max-w-2xl w-full shadow-lg transform transition-transform duration-200 hover:-translate-y-1">
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-yellow-100 text-yellow-600">
              <svg className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l6.518 11.59c.75 1.334-.213 2.98-1.743 2.98H3.482c-1.53 0-2.493-1.646-1.743-2.98L8.257 3.1zM11 13a1 1 0 10-2 0 1 1 0 002 0zm-1-8a1 1 0 00-.993.883L9 6v4a1 1 0 102 0V6a1 1 0 00-.883-.993L10 5z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <CardTitle className="text-2xl">Something went wrong</CardTitle>
              <div className="text-sm text-muted-foreground mt-1">This action couldn't be completed. You can retry, copy technical details, or report the issue.</div>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="mt-2">
            <button
              aria-expanded={showDetails}
              aria-controls="error-details"
              className="text-sm text-blue-600 hover:underline"
              onClick={() => setShowDetails((s) => !s)}
            >
              {showDetails ? 'Hide technical details' : 'Show technical details (for support)'}
            </button>
          </div>

          {showDetails && (
            <div id="error-details" className="mt-4">
              <div className="text-sm font-medium mb-2">Technical details</div>
              {error?.message && <div className="text-sm text-red-700 mb-2">{error.message}</div>}
              {error?.stack && (
                <pre className="bg-gray-100 p-3 rounded text-xs overflow-auto max-h-48">{error.stack}</pre>
              )}
            </div>
          )}

          {isDev && !showDetails && (
            <div className="mt-2 text-sm text-muted-foreground">(Toggle "Show technical details" for error info)</div>
          )}

          <div className="mt-6 flex gap-3 flex-wrap">
            <Button onClick={() => reset()} className="flex items-center gap-2"><RefreshCw className="w-4 h-4" /> Retry</Button>
            <Button variant="secondary" onClick={copyError} className="flex items-center gap-2"><Clipboard className="w-4 h-4" /> Copy details</Button>
            <Button variant="ghost" onClick={goHome} className="flex items-center gap-2"><Home className="w-4 h-4" /> Go Home</Button>
            <Button variant="destructive" onClick={reportIssue} disabled={reporting} className="flex items-center gap-2">
              <Send className="w-4 h-4" /> {reporting ? 'Reporting…' : 'Report issue'}
            </Button>
          </div>

          {reportId && (
            <div className="mt-4 text-sm text-green-700">Thanks — report id: <strong>{reportId}</strong>. Our team will review it.</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
