import React, { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { useStore } from '../store/useStore';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

export const Scanner: React.FC = () => {
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);
  const verifyVehicle = useStore((state) => state.verifyVehicle);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    let mounted = true;

    const initializeScanner = async () => {
      try {
        if (!scannerRef.current && mounted) {
          scannerRef.current = new Html5Qrcode('reader');
          setIsInitialized(true);
        }
      } catch (error) {
        console.error('Failed to initialize scanner:', error);
      }
    };

    initializeScanner();

    return () => {
      mounted = false;
      if (scannerRef.current) {
        scannerRef.current.stop().catch(console.error);
        scannerRef.current = null;
        setIsInitialized(false);
      }
    };
  }, []);

  useEffect(() => {
    if (!isInitialized || !scannerRef.current) return;

    const startScanning = async () => {
      try {
        await scannerRef.current?.start(
          { facingMode: 'environment' },
          {
            fps: 10,
            qrbox: { width: 250, height: 250 },
            aspectRatio: 1,
          },
          (decodedText) => {
            const isVerified = verifyVehicle(decodedText);
            setResult({
              success: isVerified,
              message: isVerified ? 'Access Granted' : 'Access Denied',
            });
          },
          (errorMessage) => {
            // Ignore non-critical scanning errors
            if (!errorMessage.includes('IndexSizeError')) {
              console.error(errorMessage);
            }
          }
        );
      } catch (err) {
        console.error('Failed to start scanner:', err);
        setResult({
          success: false,
          message: 'Error initializing scanner',
        });
      }
    };

    startScanning();

    return () => {
      if (scannerRef.current?.isScanning) {
        scannerRef.current.stop().catch(console.error);
      }
    };
  }, [isInitialized, verifyVehicle]);

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4">QR Scanner</h2>
          <div className="relative aspect-square bg-gray-100">
            <div id="reader" className="w-full h-full"></div>
          </div>
        </div>
        
        {result && (
          <div className={`p-4 ${result.success ? 'bg-green-100' : 'bg-red-100'} flex items-center gap-2`}>
            {result.success ? (
              <CheckCircle2 className="text-green-600" />
            ) : (
              <AlertCircle className="text-red-600" />
            )}
            <span className={result.success ? 'text-green-600' : 'text-red-600'}>
              {result.message}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
