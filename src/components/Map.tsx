import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Attraction {
  name: string;
  lat: number;
  lng: number;
}

interface MapProps {
  center: [number, number];
  attractions: Attraction[];
}

const Map: React.FC<MapProps> = ({ center, attractions }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [tokenError, setTokenError] = useState(false);

  useEffect(() => {
    if (!mapContainer.current || !mapboxToken) return;

    try {
      // Initialize map
      mapboxgl.accessToken = mapboxToken;
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: center,
        zoom: 11,
      });

      // Add navigation controls
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

      // Add markers for attractions
      attractions.forEach((attraction) => {
        const marker = new mapboxgl.Marker({
          color: 'hsl(var(--travel-sky))'
        })
          .setLngLat([attraction.lng, attraction.lat])
          .setPopup(
            new mapboxgl.Popup().setHTML(`<div class="font-bold">${attraction.name}</div>`)
          )
          .addTo(map.current!);
      });

      setTokenError(false);
    } catch (error) {
      console.error('Mapbox initialization error:', error);
      setTokenError(true);
    }

    // Cleanup
    return () => {
      map.current?.remove();
    };
  }, [center, attractions, mapboxToken]);

  if (!mapboxToken) {
    return (
      <div className="h-full bg-muted rounded-lg p-6 flex flex-col items-center justify-center space-y-4">
        <div className="text-center space-y-2">
          <h3 className="text-lg font-semibold">Mapboxトークンが必要です</h3>
          <p className="text-sm text-muted-foreground">
            地図を表示するには、Mapboxの公開トークンを入力してください。
            <br />
            <a 
              href="https://mapbox.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              mapbox.com
            </a>
            でアカウントを作成し、トークンを取得できます。
          </p>
        </div>
        <div className="w-full max-w-md space-y-2">
          <Label htmlFor="mapbox-token">Mapbox公開トークン</Label>
          <Input
            id="mapbox-token"
            type="password"
            placeholder="pk.ey..."
            value={mapboxToken}
            onChange={(e) => setMapboxToken(e.target.value)}
            className="font-mono text-sm"
          />
          {tokenError && (
            <p className="text-sm text-destructive">
              トークンが無効です。正しいMapbox公開トークンを入力してください。
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainer} className="absolute inset-0 rounded-lg" />
      <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm rounded-lg p-2 text-xs">
        <p className="font-semibold">{attractions.length}個の観光スポット</p>
      </div>
    </div>
  );
};

export default Map;