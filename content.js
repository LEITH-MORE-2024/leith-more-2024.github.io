/* ============================================================
   LEITH MORE 公式サイト ― 掲載内容ファイル

   サイトに表示される文章・日程・リンク・写真は、すべてこのファイルで管理しています。
   ここを書き換えて保存し、ブラウザを再読み込みすると反映されます。

   ■ 書き換えのルール
   ・文字は ' ' （シングルクォート）または ` ` （バッククォート）で囲む
   ・各項目の最後のカンマ（ , ）を消さない
   ・改行を含む長い文章は ` ` で囲めば、そのまま改行が反映される
   ・写真は images フォルダに入れて、ファイル名を書く（例: 'images/hero.jpg?v=110f5c9c'）
     空欄（ '' ）のままだと「写真枠」が表示される
   ============================================================ */

window.SITE = {

  /* ---------- 基本 ---------- */
  bandName: 'LEITH MORE',
  monochromePhotos: true,           // true: 写真を白黒で表示（マウスを乗せるとカラー） / false: カラーのまま

  /* ---------- トップ（最初の画面） ---------- */
  hero: {
    photo: 'images/hero.jpg?v=110f5c9c',       // バンド全体のアーティスト写真（横長 1920×1080 以上推奨）
    phrase: '死の向こう、初まりのその先。',   // スクロールで写真が閉じていく途中に浮かぶ言葉（不要なら '' ）
  },

  /* ---------- バンド紹介（プロフィール＋世界観） ----------
     上から「テーマ → 一文 → 結成 → 世界観（スクロールで切り替わる）→ ジャンル → 基本情報」の順に表示 */
  about: {
    theme: '性・死・愛',
    lead: `「性・死・愛」
「剥き出しの人間」という
世界観をコンセプトに活動する。`,
    body: [
      '2024年2月11日、東京・新宿区にて結成。',
    ],
    // バンド紹介文（B×C融合版の About に表示。段落ごとに ` ` で区切る）
    copy: [
      `2024年に東京・新宿で結成されたロックバンド
ただ、幸せを信仰している`,
      `誰にも見せない感情、誰にも言えない感情
確かにそこにある本能と欲望
ふとした瞬間に顔を出す醜さにも許しを与える`,
      `言葉にできないものを音に
抑えきれないものを衝動に
人間の奥に潜むものを、音楽に変えていく`,
    ],
    artwork: 'images/artwork.jpg?v=23092215',   // バンド紹介の横に置くアートワーク（不要なら '' ）
    // 世界観の図のあとに置く言葉（世界観.xlsx より）。不要なら ''
    statement: `絶対に帰れる場所が欲しい。
その罪ももがいた末、その罪もそこに帰るため、ただ抱きしめて欲しい。
その体温だけが欲しい。
愛を正しく初めるために、我々が帰る場所を知って欲しい。

「死の向こう」「初まりのその先」`,
    genre: `ロックを軸に、バラードロックやアートロックへと派生し、
ひとつのジャンルに固定されることなく、想いを表現する。`,
    facts: [
      { label: 'Formed',     value: '2024.02.11' },
      { label: 'Based',      value: '東京・新宿' },
      { label: 'Genre',      value: 'Alternative Rock' },
      { label: 'Members',    value: '高林夢歩 / 今村恵也 / 志庵' },
    ],
  },

  /* 世界観（図＋説明文）。出典：99_基本方針/世界観.xlsx
     role : 図の中の位置（origin=中心 / sex=上 / death=左下 / love=右下 / society=外周 / bare=下）。変更不要
     short: 図の中に出る短い説明 / text: 図の横の説明文 */
  concept: [
    { role: 'origin',  key: 'Heart',   word: '心', short: '人間の全て',
      text: `人の心臓は心。そこに愛、死、世界（社会）の全てがある。
そしてそこに人間の全てがある。` },
    { role: 'sex',     key: 'Sex',     word: '性', short: '本能',
      text: `生物として、繁殖という本能だけを
最もの生きる意味にしない心と行動。` },
    { role: 'death',   key: 'Death',   word: '死', short: '死の向こう',
      text: `全ての人類がそれぞれ愛を知り、悟りに辿り着き、
後世に伝え、一度死に絶え、また新しく初めるべき。` },
    { role: 'love',    key: 'Love',    word: '愛', short: 'まだ知りきれてない',
      text: `人類は、まだ愛を知りきれてない。
愛、慈しみ、筋に基づいた新しい神になることが我々人類の意義。` },
    { role: 'society', key: 'World',   word: '世界（社会）', short: '窮屈な世界',
      text: `この世界は窮屈。人は産まれた環境と、その土地で培ってきた文化によって人間性が決まる。
我々は国家の人である前に、地球に住む同じ人間である。` },
    { role: 'bare',    key: 'Bare',    word: '剥き出しの人間', short: 'LEITH MORE',
      text: `人には心がある。人には芸術がある。人は何かのために命を賭けられる。
間違いを犯してでも、他者を守ったり、自分の正しいプライドのために命をはれる生き物。` },
  ],

  /* ---------- メンバー ---------- */
  //  reading: 名前の上に出る読み（ローマ字）
  //  photo: 縦長 4:5（1600×2000 推奨）
  //  bio:   経歴。空欄なら表示されない。改行したい場合は ` ` で囲む
  //  role:  肩書き（タグ）。複数なら ['…', '…']。age: 年齢（空欄 '' なら表示しない）
  members: [
    { name: '高林夢歩', reading: 'Mua Takabayashi', part: 'Guitar / Vocal', role: '作詞・作曲', age: '', photo: 'images/member-takabayashi.jpg?v=58adb414', bio: '' },
    { name: '今村恵也', reading: 'Keiya Imamura', part: 'Keyboard / Synthesizer', role: '作詞・作曲', age: '', photo: 'images/member-imamura.jpg?v=a54b00ef', bio: '' },
    { name: '志庵',     reading: 'Cyan', part: 'Drums', role: 'マネジメントリーダー', age: '', photo: 'images/member-cyan.jpg?v=024b8419', bio: '' },
  ],

  /* ---------- 作品（YouTube） ----------
     url に YouTube のリンクを貼るだけでサムネイルと再生プレーヤーが自動で作られます。
     type ごと（Music Video / Song）に段を分けて表示（Music Video が上）。同じ type の中では上から順に並びます。 */
  works: [
    { title: '悪繋ぎ',       type: 'Music Video', url: 'https://youtu.be/PimpmZ4SG1c?si=VyBBFwUKUozQ9MTy' },
    { title: '限りなく透明', type: 'Music Video', url: 'https://youtu.be/YfvhXssx_T0?si=SIbf-hINKK9F6YqE' },
    { title: '祈り',         type: 'Song',        url: 'https://youtu.be/hl4fh0CUTig?si=T8F4iA197aJlHRDn' },
    { title: '悪繋ぎ',       type: 'Song',        url: 'https://youtu.be/VleHNtf0t-I?si=nvDKhM8RFoPsRq3r' },
    { title: '人なみ',       type: 'Song',        url: 'https://youtu.be/2NBE_pLG3FU?si=Z2AfAlavrPvWD32t' },
    { title: 'Erica',        type: 'Song',        url: 'https://youtu.be/MA7iWl_Ehq0?si=WJnFoQtzalbEgrjV' },
    { title: '限りなく透明', type: 'Song',        url: 'https://youtu.be/f_RskPFA3PM?si=2Oh0Gl59pHKwyHBS' },
    { title: '蛹',           type: 'Song',        url: 'https://youtu.be/u0N2fTwLfU0?si=AgjPlXT3WFY2tY51' },
  ],

  /* ---------- 日程・活動歴 ----------
     ここに書いた予定は、日付が今日以降なら「SCHEDULE」に（ライブのみ表示）、
     過ぎると自動で「HISTORY（活動歴）」に移動します。追加するだけでOK。
     （判定はページを開いた日の日付で行うので、公演日の翌日になれば HP を作り直さなくても自動で移ります。
       日付を指定して表示を確かめたいときは、ページの URL の末尾に ?today=2026-10-19 のように付けて開く）
     ※ 未発表の配信・MVは、ネタばれ防止のため公開日を過ぎてから追加してください
       （ここに書くとページのソースから見えてしまうため）

     type      : 'LIVE'（ライブ） / 'RELEASE'（配信） / 'MV'（MV公開） / 'EVENT'（その他）
     date      : 'YYYY-MM-DD' 形式（並び順と自動振り分けに使う）
     dateLabel : 日付が未確定のときの表示（例: '11月末'）。確定したら消してOK
     title     : ライブなら会場名、配信・MVなら曲名
     note      : 補足（イベント名・Remake 等）。不要なら ''
     ticket    : チケット・詳細ページのURL。不要なら ''
  */
  timeline: [
    { type: 'EVENT',   date: '2024-02-11', title: '東京・新宿にて結成' },

    // 楽曲配信
    { type: 'RELEASE', date: '2024-12-10', title: '蛹', note: '初版' },
    { type: 'RELEASE', date: '2025-02-08', title: '蛹', note: 'Remake' },
    { type: 'RELEASE', date: '2025-02-15', title: '限りなく透明' },
    { type: 'RELEASE', date: '2025-03-16', title: '人なみ' },
    { type: 'RELEASE', date: '2025-06-12', title: 'Erica' },
    { type: 'RELEASE', date: '2026-01-23', title: '悪繋ぎ' },
    { type: 'RELEASE', date: '2026-07-17', title: '祈り' },

    // MV公開
    { type: 'MV',      date: '2026-04-01', title: '限りなく透明' },
    { type: 'MV',      date: '2026-09-04', title: '悪繋ぎ' },

    // ライブ
    { type: 'LIVE',    date: '2024-12-29', title: '新宿Marble' },
    { type: 'LIVE',    date: '2025-02-03', title: '下北沢CLUB251' },
    { type: 'LIVE',    date: '2025-03-14', title: '下北沢Reg' },
    { type: 'LIVE',    date: '2025-04-02', title: '下北沢LIVE HOLIC' },
    { type: 'LIVE',    date: '2025-06-21', title: '新宿LIVE FREAK' },
    { type: 'LIVE',    date: '2025-07-17', title: '下北沢Reg' },
    { type: 'LIVE',    date: '2025-09-11', title: '渋谷Cyclone' },
    { type: 'LIVE',    date: '2025-11-01', title: '新宿LIVE FREAK' },
    { type: 'LIVE',    date: '2026-05-02', title: '代々木Labo' },
    { type: 'LIVE',    date: '2026-06-26', title: '代々木Labo' },
    { type: 'LIVE',    date: '2026-07-26', title: '代々木Labo' },
    { type: 'LIVE',    date: '2026-08-02', title: '代々木Labo' },
    { type: 'LIVE',    date: '2026-10-18', title: '代々木Labo', note: '', ticket: '' },
    { type: 'LIVE',    date: '2026-11-13', title: '高円寺Club ROOTS!', note: '', ticket: 'https://forms.gle/7vhK3dLZFuMvsw5t7' },
    { type: 'LIVE',    date: '2026-11-30', dateLabel: '11月末', title: '代々木Labo', note: '', ticket: 'https://forms.gle/Vbrg5XVN55QDw8Pc7' },
    { type: 'LIVE',    date: '2027-01-10', title: '代々木Labo', note: '', ticket: 'https://forms.gle/XWMeLFsjFNyP8giN7' },
    { type: 'LIVE',    date: '2027-01-24', title: '代々木Labo', note: '', ticket: 'https://forms.gle/6HT4sVdkApjhBFQs5' },
    { type: 'LIVE',    date: '2027-01-31', title: '新宿Nine Spices', note: 'EMERGENZA FESTIVAL 予選', ticket: 'https://forms.gle/YGwa12mHPPPar4Mm6' },
  ],

  /* ---------- 配信リンク ----------
     stores: 各配信サイトのアーティストページ（Works・Contact・フッターに表示）
     songs : 曲ごとのリンク。歌詞を開いたときに、その曲のページへ直接飛ぶボタンが出ます
             apple / spotify / amazon / youtube のうち、空欄のものはボタンが出ません */
  listen: {
    stores: [
      { name: 'Apple Music',  url: 'https://music.apple.com/jp/artist/leith-more/1795156809' },
      { name: 'Spotify',      url: 'https://open.spotify.com/intl-ja/artist/6qlU6r97kUEYGJho6Uyzku' },
      { name: 'Amazon Music', url: 'https://music.amazon.co.jp/artists/B0DKTJPGLZ/leith-more' },
    ],
    songs: {
      '祈り': {
        apple:   'https://music.apple.com/jp/album/inori-single/6790054560',
        spotify: 'https://open.spotify.com/intl-ja/track/2lwl0fjUhFQhexuB109mtL',
        amazon:  'https://music.amazon.co.jp/albums/B0H8KNSYGS',
        youtube: 'https://youtu.be/hl4fh0CUTig',
      },
      '悪繋ぎ': {
        apple:   'https://music.apple.com/jp/album/vicious-circle-single/1870447302',
        spotify: 'https://open.spotify.com/intl-ja/track/70KbAnzKYWYksIBlk3F2Fb',
        amazon:  'https://music.amazon.co.jp/albums/B0GHQB76N3',
        youtube: 'https://youtu.be/VleHNtf0t-I',
      },
      'Erica': {
        apple:   'https://music.apple.com/jp/album/erica-single/1820128211',
        spotify: 'https://open.spotify.com/intl-ja/track/1PRlgf8fjRyLPuyEEs5cd2',
        amazon:  'https://music.amazon.co.jp/albums/B0FCXWR779',
        youtube: 'https://youtu.be/MA7iWl_Ehq0',
      },
      '人なみ': {
        apple:   'https://music.apple.com/jp/album/nostalgia-single/1802343835',
        spotify: 'https://open.spotify.com/intl-ja/track/16hOrCf8q9F9FHPCC3jIn8',
        amazon:  'https://music.amazon.co.jp/albums/B0F1KJ316L',
        youtube: 'https://youtu.be/2NBE_pLG3FU',
      },
      '限りなく透明': {
        apple:   'https://music.apple.com/jp/album/endlessly-transparent-single/1796533319',
        spotify: 'https://open.spotify.com/intl-ja/track/76UyYk6Xaqp5C0k5byiB9b',
        amazon:  'https://music.amazon.co.jp/albums/B0DXBNVFLK',
        youtube: 'https://youtu.be/f_RskPFA3PM',
      },
      '蛹': {
        apple:   'https://music.apple.com/jp/album/sanagi-single/1795168007',
        spotify: 'https://open.spotify.com/intl-ja/album/6Am3f26EZFSszCBtLYMf86',
        amazon:  'https://music.amazon.co.jp/albums/B0DWJMXF9P',
        youtube: 'https://youtu.be/u0N2fTwLfU0',
      },
    },
  },

  /* ---------- 歌詞 ----------
     ` ` の中にそのまま貼り付ければ、改行・空行もそのまま表示されます。
     並び順は自動（配信日の新しい曲が上、番号は古い順）。 */
  lyrics: [
    { title: '祈り', text: `時計の針は痛みを刻む
軋む傷は積もり鈍く追い詰める
塞ぎ込んだ醜い蛹に差し込む光は

脆くて温かくて替えようのない
美しい健気な命だった
その仕草の全てが愛おしい
無邪気な笑顔をまた見せて

今未来を隠してた霧が晴れて
生きる意味を見つけた
優しいあなたが傷つく世界だから

あなたの光に僕はなりたい
例えあなたのそばに僕がいなくていい
いつか夢が覚めたとしても
あなたの幸せだけ
祈ってる

夜は眠り朝が目覚め
無慈悲に進む世界は僕を置き去りに
だけど眠るあなたの頬をそっと撫で
満ちてく

誰かが傷つくくらいなら自分だけ
傷を負えばいいそんな呪いは断ち切って
馬鹿みたいに笑い合い少しくらい我儘に
二人で生きてみよう

もう十分耐えてきたよ
だから僕の胸の中で泣いていいんだよ
いつか夢が叶うのなら
何もかも捧げる

あなたの光に僕はなりたい
例え死んだとしてもあなたのそばにいる
もう一人には僕がさせない
あなたの幸せだけ
祈ってるだから

僕より先にあの世へ行って
あなた一人この世界に残したくない
僕の全てはあなたのもの
ここで見つけられた
愛してる` },

    { title: '悪繋ぎ', text: `他人で埋める孤独肉欲の解毒
脳が焦げ落ちていく引き留めて
誰もが特別で押し付けられるエゴ
もう変わり果ててしまった
悪繋ぎの今

着飾る偽り誰かの真似事か
呼応していく虫の様増えていく
卑屈に戯けて探し出したタネは
交差する誤解を孕ませる

絶えず流れる虚栄快楽の方へ
相応二人は空っぽなレプリカ同士
シラを切る知覚妬み憎悪抱く
蝋を絶やせる日は来ない
遠く消えて尚

今こうしてる間誰かは愛を感じてる
もう諦めがついて受け入れられたか
孤独を認められずに喚いてるだけ
いっそ消えればいい

悪繋ぎの今を見てる泣き叫ぶ
終わりはまだ見えやしない隠していく
悪繋ぎよ

他人で埋める孤独は心地よく楽になれる様
平穏な暮らしでは
摂取できない刺激がそんなに欲しいか？
誰にも相手にされず
死にゆく人間がいる中何を願うか
孤独は心の乏しさちがう
生きるための最後のサイン

愛に嘆いて恋に溺れるか？
いっそ死にたくもなる
選ぶ贖罪生に弔う
誰を上手く愛せるか繰り返す

悪繋ぎの今を見てる泣き叫ぶ
終わりはまだ見えやしない隠していく
悪繋ぎ

溶けゆくエデンの泉へ
全ての罪の帰る場所
きっと誰かが始めたこと
孤独が人の創り方` },

    { title: '限りなく透明', text: `あなたに殺されたい
消えない望みだけ残る
そんなことでしか全てを
飲み込めやしない
拭いきれない今
洗い流したい過去
どんな未来を描ける
限りなく透明

今更欲しいものなどここにはない
満たされることもない
忙しない街の中に溶けていって
息を止めて潜む

進みゆく時代は愛すら置き去る
変わらない何かは何処にあるのか？
辿り着く答えはこの一つだけ
間違いと叱って欲しい
望みを託して

あなたに殺されたい
無垢に願ってるだけ
罪は痛みでしか洗えない
そんな気がして
清白な幼さは
枯れない懦弱の果て
何を目指し歩けばいい
変わりない今のままで

後悔さえもよぎらない程に
悲しく戯けて
日々を埋めるものは何もないまま
煙は霞んでく

隣で優しく微笑んでる
あなたが魅せるその影に
何も照らせなくてただ目を背ける
誰一人救えない自分が憎い
逃げ場をまた探してる
間違いと分かっていても
望んでしまう

あなたに殺されたい
あなたに殺されたい
そんなことでしか全てを
飲み込めやしない
拭いきれない今
洗い流したい過去
どんな未来を描ける
色のない視界と
過ぎ去る仮面の人々
果てしないほど透明

もう思い残す
ことは何もない
彼岸の花びらさえも
灰になって消えていくだけで
対岸で待ってるはずの
止まったままの過去へ
馳せる思いに
美しい花の束を手向けてくれよ

あなたに殺されたい
あなたに殺されたい
あなたにあなたに
あなたに殺されたい
あなたに殺されたい
あなたに殺されたい
あなたにあなたにあなたに` },

    { title: '蛹', text: `あまりにこの世界が汚れていても
それを写すのは自分自身さ
何不自由なく笑う人もいる
ただ僕が醜いだけか

淀みなく
溢れ出す
目を逸らせないほどの汚れ
鼓動だけが
弾く部屋
無邪気に傷ついて

ただ光を探して何もここにはなかっただけ
たった一瞬の痛みを恐れ逃げ出せないままで
あなたがこの世界に与えた命と痛みは釣り合っているのか
僕はまだ何も渡せてない

夜の環状道路の角の果てに
何かがある気がして踏み込む
何よりも美しい枷が僕の足をそっと引き離す

死にたくて生きてる人がいる
生きたくて死にいく人がいる
特に理由のない世界で
薄く目を開け息を潜める

救い出そうと拾い上げた
弱った命も僕らの体温で
焼き殺してしまうだけ
苦しみに気づけない

ただ痛みを根ざして逃げることさえ許されなくて
絵画の中の神は独り微笑んでいるだけ
背負った荷物を下ろせばここに積み上げてくれたものが無駄になる
僕は独り歩き続けている

ただ明かりに群がってる蛾のように生きてみたかった
僕はまだ蛹の中で独り怯えてる

ただ光を探して何もここにはなかっただけ
たった一瞬の痛みを恐れ逃げ出せないままで
あなたがこの世界に与えた命と痛みは釣り合っているのか
僕はまだ何も返せてない

もしも僕がこの世界から消えていなくなってしまったら
またあなたは僕を見つけて笑って
許してくれるかな

積み重ねてくれたものと僕の苦しみを天秤にかけても
いつまでも揺れ続けてるだけ

悲しみも痛みでさえもその全てには意味があって
いつか僕も意味に気づいて受け入れて笑えるかな
悲しみも
痛みでさえも` },

    { title: '人なみ', text: `ぼやけていく意味を隠しながら
街の景色の一つに溶けてく
速まる日々遅く進む苦しみ
いずれ消える感覚はまだある

人なみの安らぎでいい
欲しいのものはそれだけ
願うことすら
過ちかい？教えてよ
誰も此処にはいない
自分すら何処にいる

思い出すのはいつもあなたのこと
ただ幸せでいることを祈ってる
だけど僕は1人先を見つめて
いづれ来る日を強く願っているだけ

相変わらず僕は上手く生きてるよ
殺した自分を嘲笑うよう
愛想笑いも少しは慣れたような
気がしてもまだ此処にある遠い過去

人なみの安らぎでいい
欲しいのものはそれだけ
願うことすら
過ちかい？教えてよ
誰も此処にはいない
自分すら何処に

僕は今此処にいる
誰とも違う僕が
今ここにいる
見つけて抱きしめて
欲しいものはそれだけ
人なみの幸せだけ...

(巡る季節
 過ぎいく季節...)` },

    { title: 'Erica', text: `息ができないかい？Erica
醜い面を見せないで欲しい
全ては俺のせいか
黙ってそう言えばいいだけのこと
Erica

何を映してる？Erica
俺はお前に映ってすらいないかい？
酷く狂気めいた色のない目で睨み殺して
何も分かってないErica
火照る体の心臓が欲しい
辺獄の間で今
無数の海を作り続けている

Ah消えないいつかの匂いはへばりついて
浮かぶその曲がった線で変わり果てる
ここは何処？お前が選べばいい
連れ出すだけ
拒絶しないその顔つきに
潜む毒蝕む荊棘の果てまで

俺が生きてる間逃げ場なんてどこにもない
胸が痛むかい？いいさ俺もお前も何も変わらない
無機質に巡る七並べの果てには何があるか
飼い慣らせないほど手に余る渇きはどこまで続くだろう

Ah消えないいつかの匂いはへばりついて
浮かぶその曲がった線で変わり果てる
ここは何処？お前が選べばいい
連れ出すだけ
拒絶しないその顔つきに
潜む毒は

AH消えない
AH見えない
何が欲しいその答えの潔白はここには無い
少し嘘はついてもいいさ
間違い混じりの不完全さ誰もが孤独なだけ
Erica
Erica
Erica
Erica
Erica...` },
  ],

  /* ---------- お問い合わせ ---------- */
  contact: {
    email: 'leithmore2024@gmail.com',
    text: 'ライブ出演・取材・制作のご依頼など、お問い合わせは下記メールアドレスまで。',
  },

  /* ---------- SNS ---------- */
  sns: [
    { name: 'Instagram', handle: '@leith_more', url: 'https://www.instagram.com/leith_more/' },
    { name: 'TikTok',    handle: '@leith_more', url: 'https://www.tiktok.com/@leith_more' },
    { name: 'X',         handle: '@leithmore',  url: 'https://x.com/leithmore' },
    { name: 'YouTube',   handle: '@LEITHMORE',  url: 'https://www.youtube.com/@LEITHMORE' },
  ],
};
