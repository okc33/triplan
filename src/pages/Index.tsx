import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plane, MapPin, Calendar, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroImage from '@/assets/hero-travel.jpg';

// 旅行プランの基本情報
const travelPlans = [
  {
    id: 'iceland',
    name: 'アイスランド',
    country: 'アイスランド',
    flag: '🇮🇸',
    type: 'overseas',
    description: '火山と氷河が織りなす神秘の国。オーロラ観測や自然を満喫する冬の旅。',
    highlights: ['ブルーラグーン', 'ゴールデンサークル', 'オーロラ観測'],
    season: '冬がおすすめ',
    duration: '5泊',
    budget: '¥700,000'
  },
  {
    id: 'spain',
    name: 'スペイン（アンダルシア）',
    country: 'スペイン',
    flag: '🇪🇸',
    type: 'overseas',
    description: '情熱と歴史が息づく南部の旅。イスラム文化とキリスト教文化が融合した街並みを巡る。',
    highlights: ['ヌエボ橋', 'メスキータ', 'アルハンブラ宮殿'],
    season: '春・秋がおすすめ',
    duration: '5泊',
    budget: '€100-200/日'
  },
  {
    id: 'hokkaido',
    name: '北海道（フリー切符旅）',
    country: '日本',
    flag: '🇯🇵',
    type: 'domestic',
    description: 'SL冬の湿原号に乗る旅。厚岸の牡蠣や冬の絶景を巡る鉄道の旅。',
    highlights: ['SL冬の湿原号', '厚岸', 'フリー切符で巡る鉄道旅'],
    season: '冬がおすすめ',
    duration: '3泊',
    budget: '¥50,000-80,000'
  },
  {
    id: 'yakushima',
    name: '屋久島',
    country: '日本',
    flag: '🇯🇵',
    type: 'domestic',
    description: '樹齢数千年の屋久杉や神秘的な森が広がる世界遺産の島。自然の雄大さを感じる王道プラン。',
    highlights: ['縄文杉', '白谷雲水峡', '千尋の滝'],
    season: '春・秋がおすすめ',
    duration: '3泊',
    budget: '¥40,000-70,000'
  }
];

const Index = () => {
  const [activeTab, setActiveTab] = useState('overseas');

  const overseasPlans = travelPlans.filter(plan => plan.type === 'overseas');
  const domesticPlans = travelPlans.filter(plan => plan.type === 'domestic');

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-travel-sand to-background">
      {/* ヘッダー */}
      <div className="relative">
        <div 
          className="h-96 bg-cover bg-center bg-no-repeat relative"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60" />
          <div className="relative z-10 container mx-auto px-4 h-full flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-5xl font-bold mb-4">
                ✈️ Wander Planner
              </h1>
              <p className="text-xl mb-6 max-w-2xl">
                あなたの次の冒険を計画しよう。世界中の美しい場所への旅行プランを簡単に管理できます。
              </p>
              <div className="flex items-center justify-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Plane className="h-4 w-4" />
                  <span>海外・国内対応</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>地図付きプラン</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>詳細旅程</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* メインコンテンツ */}
      <div className="container mx-auto px-4 py-12">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="grid w-full max-w-md grid-cols-2 h-12">
              <TabsTrigger value="overseas" className="text-base">
                🌍 海外旅行
              </TabsTrigger>
              <TabsTrigger value="domestic" className="text-base">
                🗾 国内旅行
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="overseas" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">海外旅行プラン</h2>
              <p className="text-muted-foreground">世界の魅力的な都市への旅行プランをご紹介</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {overseasPlans.map((plan) => (
                <PlanCard key={plan.id} plan={plan} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="domestic" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">国内旅行プラン</h2>
              <p className="text-muted-foreground">日本の美しい場所への旅行プランをご紹介</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {domesticPlans.map((plan) => (
                <PlanCard key={plan.id} plan={plan} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* フッター */}
      <footer className="bg-white/80 backdrop-blur-sm border-t mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-muted-foreground">
              © 2024 Wander Planner. あなたの旅を、もっと特別に。
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

interface PlanCardProps {
  plan: typeof travelPlans[0];
}

const PlanCard: React.FC<PlanCardProps> = ({ plan }) => {
  return (
    <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{plan.flag}</span>
            <div>
              <CardTitle className="text-xl">{plan.name}</CardTitle>
              <CardDescription>{plan.country}</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="bg-travel-sky/10 text-travel-sky border-travel-sky/20">
            {plan.type === 'overseas' ? '海外' : '国内'}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">{plan.description}</p>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Star className="h-4 w-4 text-travel-sunset" />
            <span className="font-medium">見どころ:</span>
            <span className="text-muted-foreground">{plan.highlights.join(', ')}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-travel-sky" />
            <span className="font-medium">期間:</span>
            <span className="text-muted-foreground">{plan.duration}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <span className="font-medium">💰 予算:</span>
            <span className="text-muted-foreground">{plan.budget}</span>
          </div>
        </div>
        
        <Link to={`/plan/${plan.id}`}>
          <Button className="w-full group-hover:bg-travel-sky group-hover:shadow-md transition-all">
            プランを見る
            <Plane className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default Index;
