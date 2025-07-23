import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sunrise, Sun, Moon } from 'lucide-react';

interface ItineraryDay {
  day: number;
  title: string;
  morning: string;
  afternoon: string;
  evening: string;
}

interface TravelItineraryProps {
  itinerary: ItineraryDay[];
}

const TravelItinerary: React.FC<TravelItineraryProps> = ({ itinerary }) => {
  const timeSlots = [
    { key: 'morning', label: '午前', icon: Sunrise, color: 'bg-travel-sunset' },
    { key: 'afternoon', label: '午後', icon: Sun, color: 'bg-travel-sky' },
    { key: 'evening', label: '夜', icon: Moon, color: 'bg-travel-ocean' }
  ] as const;

  return (
    <div className="space-y-6">
      {itinerary.map((day) => (
        <Card key={day.day} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="bg-gradient-to-r from-travel-sky to-travel-ocean p-4">
              <div className="flex items-center gap-3">
                <Badge variant="secondary" className="bg-white/20 text-white">
                  Day {day.day}
                </Badge>
                <h3 className="text-lg font-bold text-white">{day.title}</h3>
              </div>
            </div>
            
            <div className="p-4 space-y-4">
              {timeSlots.map(({ key, label, icon: Icon, color }) => (
                <div key={key} className="flex gap-3">
                  <div className={`${color} rounded-full p-2 shrink-0`}>
                    <Icon className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm mb-1">{label}</p>
                    <p className="text-sm text-muted-foreground">
                      {day[key as keyof ItineraryDay]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TravelItinerary;