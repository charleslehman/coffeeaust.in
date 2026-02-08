import { useEffect, useRef, useState, useCallback } from 'react';
import maplibregl from 'maplibre-gl';
import type { CoffeeShop, Coordinates } from '@/data/types';
import { cn } from '@/lib/utils';

interface MapProps {
  shops: CoffeeShop[];
  userLocation?: Coordinates | null;
  selectedShopId?: string | null;
  onShopSelect?: (shop: CoffeeShop) => void;
  className?: string;
}

const AUSTIN_CENTER: [number, number] = [-97.7431, 30.2672];
const CARTO_STYLE = 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json';

export const Map: React.FC<MapProps> = ({
  shops,
  userLocation,
  selectedShopId,
  onShopSelect,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const markersRef = useRef<maplibregl.Marker[]>([]);
  const [mapReady, setMapReady] = useState(false);

  // Initialize map
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: CARTO_STYLE,
      center: userLocation
        ? [userLocation.lng, userLocation.lat]
        : AUSTIN_CENTER,
      zoom: 12,
      attributionControl: false,
    });

    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right');
    map.addControl(new maplibregl.AttributionControl({ compact: true }), 'bottom-left');

    map.on('load', () => {
      setMapReady(true);
    });

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Update markers
  const updateMarkers = useCallback(() => {
    if (!mapRef.current || !mapReady) return;

    // Clear old markers
    markersRef.current.forEach(m => m.remove());
    markersRef.current = [];

    // Add shop markers
    shops.forEach(shop => {
      const isSelected = shop.id === selectedShopId;

      const el = document.createElement('div');
      el.className = 'shop-marker';
      el.style.cssText = `
        width: ${isSelected ? '16px' : '12px'};
        height: ${isSelected ? '16px' : '12px'};
        border-radius: 50%;
        background: ${isSelected ? 'hsl(24 60% 40%)' : '#6b6560'};
        border: 2px solid white;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        cursor: pointer;
        transition: all 0.2s ease;
      `;

      if (isSelected) {
        const ring = document.createElement('div');
        ring.style.cssText = `
          position: absolute;
          top: -4px; left: -4px;
          width: 24px; height: 24px;
          border-radius: 50%;
          border: 2px solid hsl(24 60% 40%);
          animation: pulse-ring 1.5s ease-out infinite;
        `;
        el.style.position = 'relative';
        el.appendChild(ring);
      }

      const popup = new maplibregl.Popup({
        offset: 12,
        closeButton: false,
        className: 'shop-popup',
      }).setHTML(`
        <div style="font-family: Inter, sans-serif; padding: 4px 0;">
          <strong style="font-size: 13px;">${shop.name}</strong>
          <div style="font-size: 11px; color: #6b6560; margin-top: 2px;">
            ${shop.neighborhood} · ${shop.rating}★
          </div>
        </div>
      `);

      const marker = new maplibregl.Marker({ element: el })
        .setLngLat([shop.coordinates.lng, shop.coordinates.lat])
        .setPopup(popup)
        .addTo(mapRef.current!);

      el.addEventListener('click', () => {
        onShopSelect?.(shop);
      });

      markersRef.current.push(marker);
    });

    // Add user location marker
    if (userLocation) {
      const userEl = document.createElement('div');
      userEl.style.cssText = `
        width: 14px; height: 14px;
        border-radius: 50%;
        background: #3b82f6;
        border: 3px solid white;
        box-shadow: 0 2px 6px rgba(59,130,246,0.4);
      `;

      const userMarker = new maplibregl.Marker({ element: userEl })
        .setLngLat([userLocation.lng, userLocation.lat])
        .addTo(mapRef.current);

      markersRef.current.push(userMarker);
    }
  }, [shops, userLocation, selectedShopId, onShopSelect, mapReady]);

  useEffect(() => {
    updateMarkers();
  }, [updateMarkers]);

  // Fly to selected shop
  useEffect(() => {
    if (!mapRef.current || !selectedShopId || !mapReady) return;
    const shop = shops.find(s => s.id === selectedShopId);
    if (shop) {
      mapRef.current.flyTo({
        center: [shop.coordinates.lng, shop.coordinates.lat],
        zoom: 14,
        duration: 800,
      });
    }
  }, [selectedShopId, shops, mapReady]);

  return (
    <div
      ref={containerRef}
      className={cn('w-full rounded-2xl overflow-hidden', className)}
    />
  );
};
