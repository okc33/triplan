import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ExternalLink } from 'lucide-react';

interface TravelLink {
  title: string;
  url: string;
  image: string;
}

interface TravelGalleryProps {
  links: TravelLink[];
}

const TravelGallery: React.FC<TravelGalleryProps> = ({ links }) => {
  if (links.length === 0) {
    return (
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-4">
            <div className="aspect-video bg-gradient-to-br from-travel-sky to-travel-ocean rounded-lg mb-3 flex items-center justify-center">
              <span className="text-white font-bold">阪急交通社</span>
            </div>
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">おすすめツアー情報</h3>
              <ExternalLink className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              プロが厳選した現地ツアーをチェック
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-4">
            <div className="aspect-video bg-gradient-to-br from-travel-sunset to-travel-sky rounded-lg mb-3 flex items-center justify-center">
              <span className="text-white font-bold">JTB</span>
            </div>
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">現地情報・ガイド</h3>
              <ExternalLink className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              現地の最新情報とおすすめスポット
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {links.map((link, index) => (
        <a 
          key={index} 
          href={link.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="block"
        >
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-4">
              <div className="aspect-video bg-muted rounded-lg mb-3 overflow-hidden">
                <img 
                  src={link.image} 
                  alt={link.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const img = e.currentTarget;
                    img.src = '';
                    img.style.display = 'none';
                    const nextElement = img.nextElementSibling as HTMLElement;
                    if (nextElement) {
                      nextElement.style.display = 'flex';
                    }
                  }}
                />
                <div className="w-full h-full bg-gradient-to-br from-travel-sky to-travel-ocean hidden items-center justify-center">
                  <span className="text-white font-bold">{link.title}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">{link.title}</h3>
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </a>
      ))}
    </div>
  );
};

export default TravelGallery;