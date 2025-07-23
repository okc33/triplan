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
  paris: {
    name: 'パリ',
    country: '🇫🇷 フランス',
    flag: '🇫🇷',
    type: 'overseas',
    center: [2.3522, 48.8566], // パリの緯度経度
    attractions: [
      { name: 'エッフェル塔', lat: 48.8584, lng: 2.2945 },
      { name: 'ルーヴル美術館', lat: 48.8606, lng: 2.3376 },
      { name: 'ノートルダム大聖堂', lat: 48.8530, lng: 2.3499 },
      { name: 'シャンゼリゼ通り', lat: 48.8698, lng: 2.3076 },
    ],
    flightImages: [
      '/assets/flight-paris-1.jpg',
      '/assets/flight-paris-2.jpg'
    ],
    travelLinks: [
      {
        title: '阪急交通社 パリツアー',
        url: 'https://www.hankyu-travel.com',
        image: '/assets/hankyu-paris.jpg'
      },
      {
        title: 'JTB パリ旅行',
        url: 'https://www.jtb.co.jp',
        image: '/assets/jtb-paris.jpg'
      }
    ],
    markdown: `
## 🌟 パリ基本情報

### 🗓️ ベストシーズン
- **春（4-6月）**: 花が咲き誇り、過ごしやすい気候
- **夏（7-8月）**: 長い日照時間、観光地は混雑
- **秋（9-11月）**: 紅葉が美しく、比較的空いている
- **冬（12-3月）**: クリスマスマーケットが楽しめる

### 💰 物価情報
- **食事**: カフェ €15-25、レストラン €30-60
- **交通**: 地下鉄1回券 €1.90、1日券 €7.50
- **観光**: 美術館 €12-17、エッフェル塔 €25-29

### 🛡️ 治安
* 中心部は比較的安全
* スリに注意（特に観光地や地下鉄）
* 夜間の一人歩きは避ける
* 貴重品は分散して持つ

### 🍷 グルメ情報
- **クロワッサン**: 朝食の定番
- **フランスパン**: バゲットは毎日焼きたてを
- **チーズ**: 300種類以上のチーズを堪能
- **ワイン**: ボルドー、ブルゴーニュなど名産地のワイン
`,
    itinerary: [
      {
        day: 1,
        title: '到着・パリ市内観光',
        morning: 'シャルル・ド・ゴール空港到着、ホテルチェックイン',
        afternoon: 'シャンゼリゼ通り散策、凱旋門見学',
        evening: 'カフェでフランス料理ディナー'
      },
      {
        day: 2,
        title: '美術館巡り',
        morning: 'ルーヴル美術館（モナリザ、ミロのヴィーナス）',
        afternoon: 'オルセー美術館（印象派コレクション）',
        evening: 'セーヌ川クルーズ'
      },
      {
        day: 3,
        title: 'パリの象徴を満喫',
        morning: 'エッフェル塔登頂、トロカデロ庭園',
        afternoon: 'ノートルダム大聖堂、サント・シャペル',
        evening: 'モンマルトルの丘、サクレクール聖堂'
      }
    ]
  },
  london: {
    name: 'ロンドン',
    country: '🇬🇧 イギリス',
    flag: '🇬🇧',
    type: 'overseas',
    center: [-0.1276, 51.5074],
    attractions: [
      { name: 'ビッグベン', lat: 51.4994, lng: -0.1245 },
      { name: 'バッキンガム宮殿', lat: 51.5014, lng: -0.1419 },
      { name: 'ロンドン塔', lat: 51.5081, lng: -0.0759 },
      { name: '大英博物館', lat: 51.5194, lng: -0.1270 },
    ],
    markdown: `
## 🌟 ロンドン基本情報

### 🗓️ ベストシーズン
- **春（4-6月）**: 過ごしやすい気候
- **夏（7-8月）**: 最も温暖で観光しやすい
- **秋（9-11月）**: 紅葉が美しい
- **冬（12-3月）**: クリスマスシーズンは特に魅力的

### 💰 物価情報
- **食事**: パブ £15-25、レストラン £30-50
- **交通**: 地下鉄1回券 £2.40、1日券 £7.20
- **観光**: 博物館・美術館 £12-20、ロンドンアイ £27

### 🛡️ 治安
- 中心部は比較的安全
- 夜間は注意が必要
- スリに注意
    `,
    itinerary: [
      {
        day: 1,
        title: 'ロンドン到着・市内観光',
        morning: 'ヒースロー空港到着、ホテルチェックイン',
        afternoon: 'ウェストミンスター寺院、ビッグベン見学',
        evening: 'テムズ川沿いディナー'
      }
    ]
  },
  tokyo: {
    name: '東京',
    country: '🇯🇵 日本',
    flag: '🇯🇵',
    type: 'domestic',
    center: [139.6917, 35.6895],
    attractions: [
      { name: '東京スカイツリー', lat: 35.7101, lng: 139.8107 },
      { name: '浅草寺', lat: 35.7148, lng: 139.7967 },
      { name: '明治神宮', lat: 35.6761, lng: 139.6993 },
      { name: '東京駅', lat: 35.6812, lng: 139.7671 },
    ],
    markdown: `
## 🌟 東京基本情報

### 🗓️ ベストシーズン
- **春（3-5月）**: 桜の季節、過ごしやすい
- **秋（9-11月）**: 紅葉、涼しくて観光しやすい
- **夏（6-8月）**: 暑いが夏祭りが楽しめる
- **冬（12-2月）**: 寒いが澄んだ空気で富士山がきれい

### 💰 費用目安
- **食事**: ランチ ¥1,000-2,000、ディナー ¥3,000-6,000
- **交通**: JR1日券 ¥750、地下鉄1日券 ¥600
- **観光**: スカイツリー ¥2,060、美術館 ¥1,000-1,800
    `,
    itinerary: [
      {
        day: 1,
        title: '東京到着・浅草エリア',
        morning: '浅草寺参拝、仲見世通り散策',
        afternoon: '東京スカイツリー展望台',
        evening: '隅田川クルーズ'
      }
    ]
  },
  kyoto: {
    name: '京都',
    country: '🇯🇵 日本',
    flag: '🇯🇵',
    type: 'domestic',
    center: [135.7681, 35.0116],
    attractions: [
      { name: '清水寺', lat: 34.9949, lng: 135.7851 },
      { name: '金閣寺', lat: 35.0394, lng: 135.7292 },
      { name: '伏見稲荷大社', lat: 34.9671, lng: 135.7727 },
      { name: '嵐山', lat: 35.0170, lng: 135.6761 },
    ],
    markdown: `
## 🌟 京都基本情報

### 🗓️ ベストシーズン
- **春（3-5月）**: 桜の名所が多数
- **秋（11月）**: 紅葉が美しい
- **夏（6-8月）**: 暑いが祇園祭の季節
- **冬（12-2月）**: 雪化粧した寺院が美しい

### 💰 費用目安
- **食事**: 湯豆腐 ¥2,000-4,000、懐石料理 ¥8,000-15,000
- **交通**: 市バス1日券 ¥500、京都地下鉄1日券 ¥600
- **観光**: 寺院拝観料 ¥300-600
    `,
    itinerary: [
      {
        day: 1,
        title: '京都到着・東山エリア',
        morning: '清水寺参拝、産寧坂散策',
        afternoon: '八坂神社、祇園散策',
        evening: '鴨川沿いで京料理'
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
