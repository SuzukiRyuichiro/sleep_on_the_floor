export interface Listing {
    id: number;
    title: string;
    imageUrl: string;
    price: number;
    rating: number;
    location: string;
    elevation?: string;
    detailUrl?: string;
    coordinates?: {
        lat: number;
        lng: number;
    };
}

export const listings: Listing[] = [
  {
    "id": 1,
    "title": "上田市市民の森",
    "imageUrl": "https://camp.tabinchuya.com/nagano/shiminnomori_1_2024_8.jpg",
    "price": 0,
    "rating": 4.5,
    "location": "長野県上田市",
    "elevation": "標高約889m",
    "detailUrl": "https://camp.tabinchuya.com/nagano/shiminnomori.html"
  },
  {
    "id": 2,
    "title": "いずみ湖公園",
    "imageUrl": "https://camp.tabinchuya.com/nagano/izumiko_koen_1_2024_8.jpg",
    "price": 0,
    "rating": 4.5,
    "location": "長野県諏訪郡下諏訪町",
    "elevation": "標高約1244m",
    "detailUrl": "https://camp.tabinchuya.com/nagano/izumiko_koen.html"
  },
  {
    "id": 3,
    "title": "大平峠県民の森",
    "imageUrl": "https://camp.tabinchuya.com/nagano/ohiratoge_kenminnomori.jpg",
    "price": 0,
    "rating": 4.5,
    "location": "長野県飯田市",
    "elevation": "標高約1287m",
    "detailUrl": "https://camp.tabinchuya.com/nagano/ohiratoge_kenminnomori.html"
  },
  {
    "id": 4,
    "title": "二軒屋",
    "imageUrl": "https://camp.tabinchuya.com/nagano/nikenya.jpg",
    "price": 0,
    "rating": 4.5,
    "location": "長野県下伊那郡泰阜村",
    "elevation": "標高約465m",
    "detailUrl": "https://camp.tabinchuya.com/nagano/nikenya.html"
  },
  {
    "id": 5,
    "title": "矢筈公園",
    "imageUrl": "https://camp.tabinchuya.com/nagano/yahazu_koen.jpg",
    "price": 0,
    "rating": 4.5,
    "location": "長野県下伊那郡喬木村",
    "elevation": "標高約838m",
    "detailUrl": "https://camp.tabinchuya.com/nagano/yahazu_koen.html"
  },
  {
    "id": 6,
    "title": "妙琴公園",
    "imageUrl": "https://camp.tabinchuya.com/nagano/myokin_koen.jpg",
    "price": 0,
    "rating": 4.5,
    "location": "長野県飯田市",
    "elevation": "標高約569m",
    "detailUrl": "https://camp.tabinchuya.com/nagano/myokin_koen.html"
  },
  {
    "id": 7,
    "title": "御座松",
    "imageUrl": "https://camp.tabinchuya.com/nagano/gozamatsu.jpg",
    "price": 0,
    "rating": 4.5,
    "location": "長野県上伊那郡飯島町",
    "elevation": "標高約759m",
    "detailUrl": "https://camp.tabinchuya.com/nagano/gozamatsu.html"
  },
  {
    "id": 8,
    "title": "樽尾沢",
    "imageUrl": "https://camp.tabinchuya.com/nagano/minowadamu_taruosawa.jpg",
    "price": 0,
    "rating": 4.5,
    "location": "長野県上伊那郡箕輪町",
    "elevation": "標高約793m",
    "detailUrl": "https://camp.tabinchuya.com/nagano/minowadamu_taruosawa.html"
  },
  {
    "id": 9,
    "title": "蛇石",
    "imageUrl": "https://camp.tabinchuya.com/nagano/jaishi.jpg",
    "price": 0,
    "rating": 4.5,
    "location": "長野県上伊那郡辰野町",
    "elevation": "標高約930m",
    "detailUrl": "https://camp.tabinchuya.com/nagano/jaishi.html"
  },
  {
    "id": 10,
    "title": "松本市芥子坊主農村公園",
    "imageUrl": "https://camp.tabinchuya.com/nagano/keshibouzuyama_nousonkoen.jpg",
    "price": 0,
    "rating": 4.5,
    "location": "長野県松本市",
    "elevation": "標高約885m",
    "detailUrl": "https://camp.tabinchuya.com/nagano/keshibouzuyama_nousonkoen.html"
  },
  {
    "id": 11,
    "title": "大峰高原白樺の森",
    "imageUrl": "https://camp.tabinchuya.com/nagano/ominekogen_shirakabanomori.jpg",
    "price": 0,
    "rating": 4.5,
    "location": "長野県北安曇郡池田町",
    "elevation": "標高約976m",
    "detailUrl": "https://camp.tabinchuya.com/nagano/ominekogen_shirakabanomori.html"
  },
  {
    "id": 12,
    "title": "和平公園",
    "imageUrl": "https://camp.tabinchuya.com/nagano/wadaira_koen.jpg",
    "price": 0,
    "rating": 4.5,
    "location": "長野県埴科郡坂城町",
    "elevation": "標高約1015m",
    "detailUrl": "https://camp.tabinchuya.com/nagano/wadaira_koen.html"
  },
  {
    "id": 13,
    "title": "山の寺",
    "imageUrl": "https://camp.tabinchuya.com/nagano/yamanotera.jpg",
    "price": 20224,
    "rating": 4.5,
    "location": "長野県下伊那郡高森町",
    "elevation": "標高約930m",
    "detailUrl": "https://camp.tabinchuya.com/nagano/yamanotera.html"
  },
  {
    "id": 14,
    "title": "陣馬形山",
    "imageUrl": "https://camp.tabinchuya.com/nagano/jinbagatayama.jpg",
    "price": 3420,
    "rating": 4.5,
    "location": "長野県上伊那郡中川村",
    "elevation": "標高約1430m",
    "detailUrl": "https://camp.tabinchuya.com/nagano/jinbagatayama.html"
  },
  {
    "id": 15,
    "title": "星のきらめく公園（丸山公園）",
    "imageUrl": "https://camp.tabinchuya.com/camp_tent.jpg",
    "price": 0,
    "rating": 4.5,
    "location": "長野県長野市中条",
    "elevation": "標高約989m",
    "detailUrl": "https://camp.tabinchuya.com/nagano/hoshinokirameku_koen.html"
  },
  {
    "id": 16,
    "title": "広小場",
    "imageUrl": "https://camp.tabinchuya.com/camp_tent.jpg",
    "price": 0,
    "rating": 4.5,
    "location": "長野県松本市",
    "elevation": "標高約1584m",
    "detailUrl": "https://camp.tabinchuya.com/nagano/hirokoba.html"
  },
  {
    "id": 17,
    "title": "阿南町森林公園",
    "imageUrl": "https://camp.tabinchuya.com/camp_tent.jpg",
    "price": 0,
    "rating": 4.5,
    "location": "長野県下伊那郡阿南町",
    "elevation": "標高約819m",
    "detailUrl": "https://camp.tabinchuya.com/nagano/anancho_shinrinkoen.html"
  }
];