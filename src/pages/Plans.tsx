import { useParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Clock, DollarSign, Shield, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import Map from '@/components/Map';
import MarkdownContent from '@/components/MarkdownContent';
import TravelGallery from '@/components/TravelGallery';
import TravelItinerary from '@/components/TravelItinerary';

interface Attraction {
  name: string;
  lat: number;
  lng: number;
}

interface TravelLink {
  title: string;
  url: string;
  image: string;
}

interface ItineraryDay {
  day: number;
  title: string;
  morning: string;
  afternoon: string;
  evening: string;
}

interface TravelPlan {
  name: string;
  country: string;
  flag: string;
  type: 'overseas' | 'domestic';
  center: [number, number];
  attractions: Attraction[];
  flightImages?: string[];
  travelLinks?: TravelLink[];
  markdown?: string;
  itinerary?: ItineraryDay[];
}

// 旅行プランのデータ
const travelPlans: Record<string, TravelPlan> = {
  iceland: {
    name: 'アイスランド',
    country: '🇮🇸 アイスランド',
    flag: '🇮🇸',
    type: 'overseas',
    center: [-21.8277, 64.1265],
    attractions: [
      { name: 'ブルーラグーン', lat: 63.8804, lng: -22.4495 },
      { name: 'グトルフォスの滝', lat: 64.3275, lng: -20.1218 },
      { name: 'シンクヴェトリル国立公園', lat: 64.2559, lng: -21.1299 }
    ],
      travelLinks: [
        {
          title: '阪急交通社 アイスランドツアー',
          url: 'https://www.hankyu-travel.com',
          image: '/assets/hankyu-iceland.svg'
        },
        {
          title: 'JTB アイスランド旅行',
          url: 'https://www.jtb.co.jp',
          image: '/assets/jtb-iceland.svg'
        }
      ],
      markdown: `## 🌟 アイスランド基本情報

### 🗓️ ベストシーズン

* 冬: オーロラ観測のベストシーズン

### 💰 費用目安

* 宿泊 ¥20,000〜/泊、レンタカー ¥10,000/日

### 🛡️ 注意事項

* 冬季は道路凍結に注意`,
      itinerary: [
        {
          day: 1,
          title: 'レイキャビク到着・ブルーラグーン',
          morning: 'レイキャビク到着',
          afternoon: 'ブルーラグーンでリラックス',
          evening: 'レイキャビク市内で夕食'
        },
        {
          day: 2,
          title: 'ゴールデンサークル観光',
          morning: 'シンクヴェトリル国立公園を散策',
          afternoon: 'ゲイシールとグトルフォス観光',
          evening: 'オーロラ鑑賞'
        },
        {
          day: 3,
          title: '南海岸ドライブ',
          morning: 'セリャラントスフォス観光',
          afternoon: 'レイニスフィヤラを散策',
          evening: 'レイキャビクへ戻る'
        }
      ]
    },
  spain: {
    name: 'スペイン（アンダルシア）',
    country: '🇪🇸 スペイン',
    flag: '🇪🇸',
    type: 'overseas',
    center: [-5.9845, 37.3891],
    attractions: [
      { name: 'ヌエボ橋', lat: 36.7401, lng: -5.1672 },
      { name: 'メスキータ', lat: 37.8789, lng: -4.7794 },
      { name: 'アルハンブラ宮殿', lat: 37.1761, lng: -3.5881 }
    ],
      travelLinks: [
        {
          title: '阪急交通社 アンダルシアツアー',
          url: 'https://www.hankyu-travel.com',
          image: '/assets/hankyu-spain.svg'
        },
        {
          title: 'JTB スペイン旅行',
          url: 'https://www.jtb.co.jp',
          image: '/assets/jtb-spain.svg'
        }
      ],
      markdown: `## 🌟 アンダルシア基本情報

### 🗓️ ベストシーズン

* 春・秋: 温暖で観光しやすい

### 💰 費用目安

* 宿泊 €80〜/泊、食事 €20〜

### 🛡️ 注意事項

* 夏は高温に注意`,
      itinerary: [
        {
          day: 1,
          title: 'セビリア到着・市内観光',
          morning: 'セビリア到着後、大聖堂を見学',
          afternoon: 'ヒラルダの塔と市内散策',
          evening: 'フラメンコショー鑑賞'
        },
        {
          day: 2,
          title: 'コルドバ日帰り',
          morning: '列車でコルドバへ移動',
          afternoon: 'メスキータを見学',
          evening: 'セビリアに戻りタパスを楽しむ'
        },
        {
          day: 3,
          title: 'ロンダとグラナダ',
          morning: 'ロンダでヌエボ橋を観光',
          afternoon: 'グラナダでアルハンブラ宮殿見学',
          evening: 'グラナダで夕食'
        }
      ]
    },
  hokkaido: {
    name: '北海道（フリー切符旅）',
    country: '🇯🇵 日本',
    flag: '🇯🇵',
    type: 'domestic',
    center: [144.381, 43.005],
    attractions: [
      { name: 'SL冬の湿原号', lat: 43.005, lng: 144.381 },
      { name: '厚岸', lat: 43.0476, lng: 144.851 },
      { name: '釧路湿原', lat: 43.1913, lng: 144.1743 }
    ],
      travelLinks: [
        {
          title: '阪急交通社 北海道ツアー',
          url: 'https://www.hankyu-travel.com',
          image: '/assets/hankyu-hokkaido.svg'
        },
        {
          title: 'JTB 北海道旅行',
          url: 'https://www.jtb.co.jp',
          image: '/assets/jtb-hokkaido.svg'
        }
      ],
      markdown: `## 🌟 北海道基本情報

### 🗓️ ベストシーズン

* 冬: 雪景色とSL運行

### 💰 費用目安

* フリー切符 ¥12,000〜、宿泊 ¥8,000〜

### 🛡️ 注意事項

* 防寒対策を万全に`,
      itinerary: [
        {
          day: 1,
          title: '札幌→釧路・SL冬の湿原号',
          morning: '札幌から釧路へ移動',
          afternoon: 'SL冬の湿原号乗車',
          evening: '釧路で宿泊'
        },
        {
          day: 2,
          title: '厚岸観光',
          morning: '厚岸の牡蠣小屋を訪問',
          afternoon: '町歩きと観光',
          evening: '温泉でリラックス'
        },
        {
          day: 3,
          title: '釧路湿原散策と札幌帰着',
          morning: '釧路湿原を散策',
          afternoon: '札幌へ移動',
          evening: '札幌帰着'
        }
      ]
    },
  yakushima: {
    name: '屋久島',
    country: '🇯🇵 日本',
    flag: '🇯🇵',
    type: 'domestic',
    center: [130.653, 30.358],
    attractions: [
      { name: '縄文杉', lat: 30.3585, lng: 130.5325 },
      { name: '白谷雲水峡', lat: 30.394, lng: 130.57 },
      { name: '千尋の滝', lat: 30.2867, lng: 130.6292 }
    ],
      travelLinks: [
        {
          title: '阪急交通社 屋久島ツアー',
          url: 'https://www.hankyu-travel.com',
          image: '/assets/hankyu-yakushima.svg'
        },
        {
          title: 'JTB 屋久島旅行',
          url: 'https://www.jtb.co.jp',
          image: '/assets/jtb-yakushima.svg'
        }
      ],
      markdown: `## 🌟 屋久島基本情報

### 🗓️ ベストシーズン

* 春・秋: トレッキングに最適

### 💰 費用目安

* 宿泊 ¥7,000〜、レンタカー ¥5,000〜

### 🛡️ 注意事項

* 山間部は天候変化が激しい`,
      itinerary: [
        {
          day: 1,
          title: '屋久島到着・白谷雲水峡',
          morning: '屋久島到着',
          afternoon: '白谷雲水峡トレッキング',
          evening: '宿で夕食'
        },
        {
          day: 2,
          title: '縄文杉トレッキング',
          morning: '縄文杉トレッキング出発',
          afternoon: '縄文杉を見学',
          evening: '下山後宿で休息'
        },
        {
          day: 3,
          title: '千尋の滝観光と帰路',
          morning: '千尋の滝を観光',
          afternoon: '島内でお土産探し',
          evening: '帰路につく'
        }
      ]
    }
  };

const PlanDetail = () => {
  const { planId } = useParams<{ planId: string }>();
  const plan = planId ? travelPlans[planId as keyof typeof travelPlans] : null;

  if (!plan) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">プランが見つかりません</h1>
          <Link to="/">
            <Button>ホームに戻る</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-travel-sand">
      {/* ヘッダー */}
      <div className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <span>{plan.flag}</span>
                {plan.name}
              </h1>
              <p className="text-muted-foreground">{plan.country}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* 航空券情報 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              航空券情報
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">航空券スクリーンショット 1</p>
              </div>
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">航空券スクリーンショット 2</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 地図 */}
        <Card>
          <CardHeader>
            <CardTitle>観光スポット地図</CardTitle>
            <CardDescription>行きたい場所をマップで確認</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-96 rounded-lg overflow-hidden">
              <Map center={plan.center} attractions={plan.attractions} />
            </div>
          </CardContent>
        </Card>

        {/* 観光情報リンク */}
        <Card>
          <CardHeader>
            <CardTitle>おすすめツアー・情報サイト</CardTitle>
          </CardHeader>
          <CardContent>
            <TravelGallery links={plan.travelLinks || []} />
          </CardContent>
        </Card>

        {/* 基本情報 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              基本情報
            </CardTitle>
          </CardHeader>
          <CardContent>
            <MarkdownContent content={plan.markdown || ''} />
          </CardContent>
        </Card>

        {/* 旅程表 */}
        <Card>
          <CardHeader>
            <CardTitle>簡易旅程表</CardTitle>
            <CardDescription>3日間のサンプル旅程</CardDescription>
          </CardHeader>
          <CardContent>
            <TravelItinerary itinerary={plan.itinerary || []} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PlanDetail;
