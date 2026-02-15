// HSK Vocabulary Data - Easy to edit and extend
// Add new vocabulary by following the structure below

export type HSKLevel = 1 | 2 | 3 | 4 | 5;

export interface Vocabulary {
  id: string;
  hanzi: string;       // Chinese characters
  pinyin: string;      // Romanized pronunciation
  meaning: string;     // Indonesian meaning
  english?: string;    // English meaning (optional)
  level: HSKLevel;
  // Example sentence (optional)
  kalimat?: string;
  pinyinKalimat?: string;
  artiKalimat?: string;
}

/**
 * HSK Vocabulary Database
 * 
 * To add new vocabulary:
 * 1. Find the correct HSK level section
 * 2. Add a new object following the pattern:
 *    { id: 'unique_id', hanzi: '汉字', pinyin: 'pinyin', meaning: 'arti', level: 1-5 }
 * 
 * Tips:
 * - ID should be unique (e.g., 'hsk1_001', 'hsk2_015')
 * - Hanzi is the main Chinese character
 * - Pinyin uses tone marks or numbers
 * - Meaning is the Indonesian translation
 */
export const vocabularyDatabase: Vocabulary[] = [
  // ===== HSK 1 (150 kata dasar) =====
  { id: 'hsk1_001', hanzi: '爱', pinyin: 'ài', meaning: 'Cinta', english: 'Love', level: 1, kalimat: '我爱你', pinyinKalimat: 'Wǒ ài nǐ', artiKalimat: 'Aku cinta kamu' },
  { id: 'hsk1_002', hanzi: '八', pinyin: 'bā', meaning: 'Delapan', english: 'Eight', level: 1, kalimat: '他今年八岁', pinyinKalimat: 'Tā jīnnián bā suì', artiKalimat: 'Dia tahun ini delapan tahun' },
  { id: 'hsk1_003', hanzi: '爸爸', pinyin: 'bàba', meaning: 'Ayah', english: 'Father', level: 1, kalimat: '爸爸在看书', pinyinKalimat: 'Bàba zài kànshū', artiKalimat: 'Ayah sedang membaca buku' },
  { id: 'hsk1_004', hanzi: '杯子', pinyin: 'bēizi', meaning: 'Gelas', english: 'Cup', level: 1, kalimat: '这是我的杯子', pinyinKalimat: 'Zhè shì wǒ de bēizi', artiKalimat: 'Ini gelas saya' },
  { id: 'hsk1_005', hanzi: '北京', pinyin: 'Běijīng', meaning: 'Beijing', english: 'Beijing', level: 1, kalimat: '我去过北京', pinyinKalimat: 'Wǒ qùguò běijīng', artiKalimat: 'Saya pernah ke Beijing' },
  { id: 'hsk1_006', hanzi: '本', pinyin: 'běn', meaning: 'Satuan buku', english: 'Measure word for books', level: 1, kalimat: '我买了一本书', pinyinKalimat: 'Wǒ mǎile yī běn shū', artiKalimat: 'Saya membeli sebuah buku' },
  { id: 'hsk1_007', hanzi: '不', pinyin: 'bù', meaning: 'Tidak', english: 'No/Not', level: 1, kalimat: '我不想吃饭', pinyinKalimat: 'Wǒ bùxiǎng chīfàn', artiKalimat: 'Saya tidak ingin makan' },
  { id: 'hsk1_008', hanzi: '不客气', pinyin: 'bú kèqi', meaning: 'Sama-sama', english: "You're welcome", level: 1 },
  { id: 'hsk1_009', hanzi: '菜', pinyin: 'cài', meaning: 'Sayur/Hidangan', english: 'Dish/Vegetable', level: 1, kalimat: '我想点菜', pinyinKalimat: 'Wǒ xiǎng diǎn cài', artiKalimat: 'Saya ingin memesan makanan' },
  { id: 'hsk1_010', hanzi: '茶', pinyin: 'chá', meaning: 'Teh', english: 'Tea', level: 1, kalimat: '我喜欢喝茶', pinyinKalimat: 'Wǒ xǐhuān hē chá', artiKalimat: 'Saya suka minum teh' },
  { id: 'hsk1_011', hanzi: '吃', pinyin: 'chī', meaning: 'Makan', english: 'Eat', level: 1, kalimat: '我想吃面包', pinyinKalimat: 'Wǒ xiǎng chī miànbāo', artiKalimat: 'Saya ingin makan roti' },
  { id: 'hsk1_012', hanzi: '出租车', pinyin: 'chūzūchē', meaning: 'Taksi', english: 'Taxi', level: 1 },
  { id: 'hsk1_013', hanzi: '打电话', pinyin: 'dǎ diànhuà', meaning: 'Menelepon', english: 'Make a call', level: 1, kalimat: '下午我给你打电话', pinyinKalimat: 'Xiàwǔ wǒ gěi nǐ dǎ diànhuà', artiKalimat: 'Sore saya menelepon kamu' },
  { id: 'hsk1_014', hanzi: '大', pinyin: 'dà', meaning: 'Besar', english: 'Big', level: 1, kalimat: '你的房子很大', pinyinKalimat: 'Nǐ de fángzi hěn dà', artiKalimat: 'Rumahmu sangat besar' },
  { id: 'hsk1_015', hanzi: '的', pinyin: 'de', meaning: 'Partikel kepemilikan', english: 'Possessive particle', level: 1 },
  { id: 'hsk1_016', hanzi: '点', pinyin: 'diǎn', meaning: 'Jam/Titik', english: 'O\'clock/Point', level: 1, kalimat: '现在十二点', pinyinKalimat: 'Xiànzài shí\'èr diǎn', artiKalimat: 'Sekarang jam 12' },
  { id: 'hsk1_017', hanzi: '电脑', pinyin: 'diànnǎo', meaning: 'Komputer', english: 'Computer', level: 1, kalimat: '你可以用我的电脑', pinyinKalimat: 'Nǐ kěyǐ yòng wǒ de diànnǎo', artiKalimat: 'Kamu boleh menggunakan komputer saya' },
  { id: 'hsk1_018', hanzi: '电视', pinyin: 'diànshì', meaning: 'Televisi', english: 'Television', level: 1, kalimat: '爸爸在看电视', pinyinKalimat: 'Bàba zài kàn diànshì', artiKalimat: 'Ayah sedang menonton televisi' },
  { id: 'hsk1_019', hanzi: '电影', pinyin: 'diànyǐng', meaning: 'Film', english: 'Movie', level: 1, kalimat: '我喜欢看中国电影', pinyinKalimat: 'Wǒ xǐhuān kàn zhōngguó diànyǐng', artiKalimat: 'Saya suka menonton film China' },
  { id: 'hsk1_020', hanzi: '东西', pinyin: 'dōngxi', meaning: 'Barang', english: 'Thing', level: 1, kalimat: '我要买东西', pinyinKalimat: 'Wǒ yāomǎi dōngxi', artiKalimat: 'Saya mau membeli barang' },
  { id: 'hsk1_021', hanzi: '都', pinyin: 'dōu', meaning: 'Semua', english: 'All', level: 1 },
  { id: 'hsk1_022', hanzi: '读', pinyin: 'dú', meaning: 'Membaca', english: 'Read', level: 1 },
  { id: 'hsk1_023', hanzi: '对不起', pinyin: 'duìbuqǐ', meaning: 'Maaf', english: 'Sorry', level: 1 },
  { id: 'hsk1_024', hanzi: '多', pinyin: 'duō', meaning: 'Banyak', english: 'Many', level: 1 },
  { id: 'hsk1_025', hanzi: '多少', pinyin: 'duōshao', meaning: 'Berapa', english: 'How many', level: 1 },
  { id: 'hsk1_026', hanzi: '儿子', pinyin: 'érzi', meaning: 'Anak laki-laki', english: 'Son', level: 1 },
  { id: 'hsk1_027', hanzi: '二', pinyin: 'èr', meaning: 'Dua', english: 'Two', level: 1 },
  { id: 'hsk1_028', hanzi: '饭店', pinyin: 'fàndiàn', meaning: 'Restoran', english: 'Restaurant', level: 1 },
  { id: 'hsk1_029', hanzi: '飞机', pinyin: 'fēijī', meaning: 'Pesawat', english: 'Airplane', level: 1 },
  { id: 'hsk1_030', hanzi: '分钟', pinyin: 'fēnzhōng', meaning: 'Menit', english: 'Minute', level: 1 },

  // ===== HSK 2 (150 kata) =====
  { id: 'hsk2_001', hanzi: '吧', pinyin: 'ba', meaning: 'Partikel modal', english: 'Modal particle', level: 2 },
  { id: 'hsk2_002', hanzi: '白', pinyin: 'bái', meaning: 'Putih', english: 'White', level: 2, kalimat: '我喜欢白色', pinyinKalimat: 'Wǒ xǐhuān báisè', artiKalimat: 'Saya suka warna putih' },
  { id: 'hsk2_003', hanzi: '百', pinyin: 'bǎi', meaning: 'Seratus', english: 'Hundred', level: 2, kalimat: '我有一百元', pinyinKalimat: 'Wǒ yǒu yībǎi yuán', artiKalimat: 'Saya ada seratus yuan' },
  { id: 'hsk2_004', hanzi: '帮忙', pinyin: 'bāngmáng', meaning: 'Membantu', english: 'Help', level: 2, kalimat: '我来帮忙', pinyinKalimat: 'Wǒ lái bāngmáng', artiKalimat: 'Saya akan membantu' },
  { id: 'hsk2_005', hanzi: '报纸', pinyin: 'bàozhǐ', meaning: 'Koran', english: 'Newspaper', level: 2 },
  { id: 'hsk2_006', hanzi: '比', pinyin: 'bǐ', meaning: 'Dibanding', english: 'Compare', level: 2, kalimat: '我比你漂亮', pinyinKalimat: 'Wǒ bǐ nǐ piàoliang', artiKalimat: 'Saya lebih cantik dari kamu' },
  { id: 'hsk2_007', hanzi: '别', pinyin: 'bié', meaning: 'Jangan', english: 'Don\'t', level: 2, kalimat: '别离开我', pinyinKalimat: 'Bié líkāi wǒ', artiKalimat: 'Jangan tinggalkan saya' },
  { id: 'hsk2_008', hanzi: '宾馆', pinyin: 'bīnguǎn', meaning: 'Hotel', english: 'Hotel', level: 2 },
  { id: 'hsk2_009', hanzi: '长', pinyin: 'cháng', meaning: 'Panjang', english: 'Long', level: 2 },
  { id: 'hsk2_010', hanzi: '唱歌', pinyin: 'chànggē', meaning: 'Bernyanyi', english: 'Sing', level: 2, kalimat: '她喜欢唱歌', pinyinKalimat: 'Tā xǐhuān chànggē', artiKalimat: 'Dia suka bernyanyi' },
  { id: 'hsk2_011', hanzi: '出', pinyin: 'chū', meaning: 'Keluar', english: 'Out', level: 2 },
  { id: 'hsk2_012', hanzi: '穿', pinyin: 'chuān', meaning: 'Memakai', english: 'Wear', level: 2, kalimat: '今天我想穿红色衣服', pinyinKalimat: 'Jīntiān wǒ xiǎng chuān hóngsè yīfú', artiKalimat: 'Hari ini saya ingin memakai baju merah' },
  { id: 'hsk2_013', hanzi: '床', pinyin: 'chuáng', meaning: 'Tempat tidur', english: 'Bed', level: 2 },
  { id: 'hsk2_014', hanzi: '次', pinyin: 'cì', meaning: 'Kali', english: 'Time (frequency)', level: 2 },
  { id: 'hsk2_015', hanzi: '从', pinyin: 'cóng', meaning: 'Dari', english: 'From', level: 2, kalimat: '我从雅加达来的', pinyinKalimat: 'Wǒ cóng yǎjiādá lái de', artiKalimat: 'Saya datang dari Jakarta' },
  { id: 'hsk2_016', hanzi: '错', pinyin: 'cuò', meaning: 'Salah', english: 'Wrong', level: 2 },
  { id: 'hsk2_017', hanzi: '打篮球', pinyin: 'dǎ lánqiú', meaning: 'Main basket', english: 'Play basketball', level: 2 },
  { id: 'hsk2_018', hanzi: '大家', pinyin: 'dàjiā', meaning: 'Semua orang', english: 'Everyone', level: 2 },
  { id: 'hsk2_019', hanzi: '到', pinyin: 'dào', meaning: 'Sampai', english: 'Arrive', level: 2, kalimat: '我到学校了', pinyinKalimat: 'Wǒ dào xuéxiàole', artiKalimat: 'Saya sudah sampai sekolah' },
  { id: 'hsk2_020', hanzi: '得', pinyin: 'de', meaning: 'Partikel hasil', english: 'Result particle', level: 2 },
  { id: 'hsk2_021', hanzi: '等', pinyin: 'děng', meaning: 'Menunggu', english: 'Wait', level: 2, kalimat: '我在等她', pinyinKalimat: 'Wǒ zài děng tā', artiKalimat: 'Saya sedang menunggu dia' },
  { id: 'hsk2_022', hanzi: '弟弟', pinyin: 'dìdi', meaning: 'Adik laki-laki', english: 'Younger brother', level: 2 },
  { id: 'hsk2_023', hanzi: '第一', pinyin: 'dì yī', meaning: 'Pertama', english: 'First', level: 2 },
  { id: 'hsk2_024', hanzi: '懂', pinyin: 'dǒng', meaning: 'Mengerti', english: 'Understand', level: 2 },
  { id: 'hsk2_025', hanzi: '对', pinyin: 'duì', meaning: 'Benar', english: 'Correct', level: 2 },
  { id: 'hsk2_026', hanzi: '房间', pinyin: 'fángjiān', meaning: 'Kamar', english: 'Room', level: 2 },
  { id: 'hsk2_027', hanzi: '非常', pinyin: 'fēicháng', meaning: 'Sangat', english: 'Very', level: 2 },
  { id: 'hsk2_028', hanzi: '服务员', pinyin: 'fúwùyuán', meaning: 'Pelayan', english: 'Waiter', level: 2 },
  { id: 'hsk2_029', hanzi: '高', pinyin: 'gāo', meaning: 'Tinggi', english: 'Tall', level: 2 },
  { id: 'hsk2_030', hanzi: '告诉', pinyin: 'gàosu', meaning: 'Memberitahu', english: 'Tell', level: 2 },

  // ===== HSK 3 (300 kata) =====
  { id: 'hsk3_001', hanzi: '阿姨', pinyin: 'āyí', meaning: 'Bibi', english: 'Aunt', level: 3 },
  { id: 'hsk3_002', hanzi: '啊', pinyin: 'a', meaning: 'Partikel ekspresi', english: 'Exclamation particle', level: 3 },
  { id: 'hsk3_003', hanzi: '矮', pinyin: 'ǎi', meaning: 'Pendek', english: 'Short (height)', level: 3 },
  { id: 'hsk3_004', hanzi: '爱好', pinyin: 'àihào', meaning: 'Hobi', english: 'Hobby', level: 3, kalimat: '我的爱好是看中国电影', pinyinKalimat: 'Wǒ de àihào shì kàn zhōngguó diànyǐng', artiKalimat: 'Hobi saya adalah menonton film China' },
  { id: 'hsk3_005', hanzi: '安静', pinyin: 'ānjìng', meaning: 'Tenang', english: 'Quiet', level: 3 },
  { id: 'hsk3_006', hanzi: '把', pinyin: 'bǎ', meaning: 'Partikel objek', english: 'Object particle', level: 3 },
  { id: 'hsk3_007', hanzi: '班', pinyin: 'bān', meaning: 'Kelas', english: 'Class', level: 3, kalimat: '我们班在里面', pinyinKalimat: 'Wǒmen bān zài lǐmiàn', artiKalimat: 'Kelas kita di dalam' },
  { id: 'hsk3_008', hanzi: '搬', pinyin: 'bān', meaning: 'Pindah', english: 'Move', level: 3 },
  { id: 'hsk3_009', hanzi: '半', pinyin: 'bàn', meaning: 'Setengah', english: 'Half', level: 3 },
  { id: 'hsk3_010', hanzi: '办法', pinyin: 'bànfǎ', meaning: 'Cara', english: 'Method', level: 3 },
  { id: 'hsk3_011', hanzi: '办公室', pinyin: 'bàngōngshì', meaning: 'Kantor', english: 'Office', level: 3 },
  { id: 'hsk3_012', hanzi: '帮助', pinyin: 'bāngzhù', meaning: 'Membantu', english: 'Help', level: 3 },
  { id: 'hsk3_013', hanzi: '包', pinyin: 'bāo', meaning: 'Tas', english: 'Bag', level: 3 },
  { id: 'hsk3_014', hanzi: '饱', pinyin: 'bǎo', meaning: 'Kenyang', english: 'Full (stomach)', level: 3 },
  { id: 'hsk3_015', hanzi: '北方', pinyin: 'běifāng', meaning: 'Utara', english: 'North', level: 3 },
  { id: 'hsk3_016', hanzi: '被', pinyin: 'bèi', meaning: 'Oleh (pasif)', english: 'By (passive)', level: 3 },
  { id: 'hsk3_017', hanzi: '鼻子', pinyin: 'bízi', meaning: 'Hidung', english: 'Nose', level: 3 },
  { id: 'hsk3_018', hanzi: '比较', pinyin: 'bǐjiào', meaning: 'Cukup/Perbandingan', english: 'Relatively', level: 3 },
  { id: 'hsk3_019', hanzi: '比赛', pinyin: 'bǐsài', meaning: 'Pertandingan', english: 'Competition', level: 3 },
  { id: 'hsk3_020', hanzi: '必须', pinyin: 'bìxū', meaning: 'Harus', english: 'Must', level: 3 },
  { id: 'hsk3_021', hanzi: '变化', pinyin: 'biànhuà', meaning: 'Perubahan', english: 'Change', level: 3 },
  { id: 'hsk3_022', hanzi: '表示', pinyin: 'biǎoshì', meaning: 'Menunjukkan', english: 'Express', level: 3 },
  { id: 'hsk3_023', hanzi: '表演', pinyin: 'biǎoyǎn', meaning: 'Pertunjukan', english: 'Performance', level: 3 },
  { id: 'hsk3_024', hanzi: '别人', pinyin: 'biérén', meaning: 'Orang lain', english: 'Other people', level: 3 },
  { id: 'hsk3_025', hanzi: '冰箱', pinyin: 'bīngxiāng', meaning: 'Kulkas', english: 'Refrigerator', level: 3 },
  { id: 'hsk3_026', hanzi: '不但...而且', pinyin: 'búdàn...érqiě', meaning: 'Tidak hanya...tapi juga', english: 'Not only...but also', level: 3 },
  { id: 'hsk3_027', hanzi: '菜单', pinyin: 'càidān', meaning: 'Menu', english: 'Menu', level: 3 },
  { id: 'hsk3_028', hanzi: '参加', pinyin: 'cānjiā', meaning: 'Ikut serta', english: 'Participate', level: 3 },
  { id: 'hsk3_029', hanzi: '草', pinyin: 'cǎo', meaning: 'Rumput', english: 'Grass', level: 3 },
  { id: 'hsk3_030', hanzi: '层', pinyin: 'céng', meaning: 'Lantai/Lapis', english: 'Floor/Layer', level: 3 },

  // ===== HSK 4 (600 kata) =====
  { id: 'hsk4_001', hanzi: '爱情', pinyin: 'àiqíng', meaning: 'Cinta (romantis)', english: 'Romantic love', level: 4 },
  { id: 'hsk4_002', hanzi: '安排', pinyin: 'ānpái', meaning: 'Mengatur', english: 'Arrange', level: 4 },
  { id: 'hsk4_003', hanzi: '安全', pinyin: 'ānquán', meaning: 'Keamanan', english: 'Safety', level: 4 },
  { id: 'hsk4_004', hanzi: '按时', pinyin: 'ànshí', meaning: 'Tepat waktu', english: 'On time', level: 4 },
  { id: 'hsk4_005', hanzi: '按照', pinyin: 'ànzhào', meaning: 'Menurut', english: 'According to', level: 4 },
  { id: 'hsk4_006', hanzi: '百分之', pinyin: 'bǎifēnzhī', meaning: 'Persen', english: 'Percent', level: 4 },
  { id: 'hsk4_007', hanzi: '棒', pinyin: 'bàng', meaning: 'Hebat', english: 'Great', level: 4 },
  { id: 'hsk4_008', hanzi: '包括', pinyin: 'bāokuò', meaning: 'Termasuk', english: 'Include', level: 4 },
  { id: 'hsk4_009', hanzi: '保护', pinyin: 'bǎohù', meaning: 'Melindungi', english: 'Protect', level: 4 },
  { id: 'hsk4_010', hanzi: '保证', pinyin: 'bǎozhèng', meaning: 'Menjamin', english: 'Guarantee', level: 4 },
  { id: 'hsk4_011', hanzi: '抱', pinyin: 'bào', meaning: 'Memeluk', english: 'Hug', level: 4 },
  { id: 'hsk4_012', hanzi: '抱歉', pinyin: 'bàoqiàn', meaning: 'Minta maaf', english: 'Apologize', level: 4 },
  { id: 'hsk4_013', hanzi: '报名', pinyin: 'bàomíng', meaning: 'Mendaftar', english: 'Register', level: 4 },
  { id: 'hsk4_014', hanzi: '倍', pinyin: 'bèi', meaning: 'Kali lipat', english: 'Times (multiple)', level: 4 },
  { id: 'hsk4_015', hanzi: '本来', pinyin: 'běnlái', meaning: 'Awalnya', english: 'Originally', level: 4 },
  { id: 'hsk4_016', hanzi: '笨', pinyin: 'bèn', meaning: 'Bodoh', english: 'Stupid', level: 4 },
  { id: 'hsk4_017', hanzi: '比如', pinyin: 'bǐrú', meaning: 'Misalnya', english: 'For example', level: 4 },
  { id: 'hsk4_018', hanzi: '毕业', pinyin: 'bìyè', meaning: 'Lulus', english: 'Graduate', level: 4 },
  { id: 'hsk4_019', hanzi: '遍', pinyin: 'biàn', meaning: 'Kali (pengulangan)', english: 'Times (repetition)', level: 4 },
  { id: 'hsk4_020', hanzi: '标准', pinyin: 'biāozhǔn', meaning: 'Standar', english: 'Standard', level: 4 },
  { id: 'hsk4_021', hanzi: '表格', pinyin: 'biǎogé', meaning: 'Formulir', english: 'Form', level: 4 },
  { id: 'hsk4_022', hanzi: '表扬', pinyin: 'biǎoyáng', meaning: 'Memuji', english: 'Praise', level: 4 },
  { id: 'hsk4_023', hanzi: '饼干', pinyin: 'bǐnggān', meaning: 'Biskuit', english: 'Biscuit', level: 4 },
  { id: 'hsk4_024', hanzi: '并且', pinyin: 'bìngqiě', meaning: 'Dan juga', english: 'And also', level: 4 },
  { id: 'hsk4_025', hanzi: '博士', pinyin: 'bóshì', meaning: 'Doktor', english: 'Doctor (PhD)', level: 4 },
  { id: 'hsk4_026', hanzi: '不得不', pinyin: 'bùdébù', meaning: 'Terpaksa', english: 'Have to', level: 4 },
  { id: 'hsk4_027', hanzi: '不管', pinyin: 'bùguǎn', meaning: 'Tidak peduli', english: 'No matter', level: 4 },
  { id: 'hsk4_028', hanzi: '不过', pinyin: 'búguò', meaning: 'Tetapi', english: 'However', level: 4 },
  { id: 'hsk4_029', hanzi: '不仅', pinyin: 'bùjǐn', meaning: 'Tidak hanya', english: 'Not only', level: 4 },
  { id: 'hsk4_030', hanzi: '部分', pinyin: 'bùfen', meaning: 'Bagian', english: 'Part', level: 4 },

  // ===== HSK 5 (1300 kata) =====
  { id: 'hsk5_001', hanzi: '挨', pinyin: 'āi', meaning: 'Dekat/Menderita', english: 'Near/Suffer', level: 5 },
  { id: 'hsk5_002', hanzi: '爱护', pinyin: 'àihù', meaning: 'Menyayangi', english: 'Cherish', level: 5 },
  { id: 'hsk5_003', hanzi: '爱惜', pinyin: 'àixī', meaning: 'Menghargai', english: 'Treasure', level: 5 },
  { id: 'hsk5_004', hanzi: '爱心', pinyin: 'àixīn', meaning: 'Kasih sayang', english: 'Love/Compassion', level: 5 },
  { id: 'hsk5_005', hanzi: '安慰', pinyin: 'ānwèi', meaning: 'Menghibur', english: 'Comfort', level: 5 },
  { id: 'hsk5_006', hanzi: '安装', pinyin: 'ānzhuāng', meaning: 'Memasang', english: 'Install', level: 5 },
  { id: 'hsk5_007', hanzi: '岸', pinyin: 'àn', meaning: 'Pantai/Tepi', english: 'Shore/Bank', level: 5 },
  { id: 'hsk5_008', hanzi: '暗', pinyin: 'àn', meaning: 'Gelap', english: 'Dark', level: 5 },
  { id: 'hsk5_009', hanzi: '熬夜', pinyin: 'áoyè', meaning: 'Begadang', english: 'Stay up late', level: 5 },
  { id: 'hsk5_010', hanzi: '把握', pinyin: 'bǎwò', meaning: 'Menguasai', english: 'Grasp', level: 5 },
  { id: 'hsk5_011', hanzi: '摆', pinyin: 'bǎi', meaning: 'Meletakkan', english: 'Place', level: 5 },
  { id: 'hsk5_012', hanzi: '办理', pinyin: 'bànlǐ', meaning: 'Mengurus', english: 'Handle', level: 5 },
  { id: 'hsk5_013', hanzi: '傍晚', pinyin: 'bàngwǎn', meaning: 'Senja', english: 'Dusk', level: 5 },
  { id: 'hsk5_014', hanzi: '包裹', pinyin: 'bāoguǒ', meaning: 'Paket', english: 'Package', level: 5 },
  { id: 'hsk5_015', hanzi: '包含', pinyin: 'bāohán', meaning: 'Mengandung', english: 'Contain', level: 5 },
  { id: 'hsk5_016', hanzi: '薄', pinyin: 'báo', meaning: 'Tipis', english: 'Thin', level: 5 },
  { id: 'hsk5_017', hanzi: '宝贝', pinyin: 'bǎobèi', meaning: 'Sayang', english: 'Baby/Treasure', level: 5 },
  { id: 'hsk5_018', hanzi: '宝贵', pinyin: 'bǎoguì', meaning: 'Berharga', english: 'Precious', level: 5 },
  { id: 'hsk5_019', hanzi: '保持', pinyin: 'bǎochí', meaning: 'Menjaga', english: 'Maintain', level: 5 },
  { id: 'hsk5_020', hanzi: '保存', pinyin: 'bǎocún', meaning: 'Menyimpan', english: 'Preserve', level: 5 },
  { id: 'hsk5_021', hanzi: '保留', pinyin: 'bǎoliú', meaning: 'Mempertahankan', english: 'Retain', level: 5 },
  { id: 'hsk5_022', hanzi: '保险', pinyin: 'bǎoxiǎn', meaning: 'Asuransi', english: 'Insurance', level: 5 },
  { id: 'hsk5_023', hanzi: '报道', pinyin: 'bàodào', meaning: 'Melaporkan', english: 'Report', level: 5 },
  { id: 'hsk5_024', hanzi: '报告', pinyin: 'bàogào', meaning: 'Laporan', english: 'Report', level: 5 },
  { id: 'hsk5_025', hanzi: '报社', pinyin: 'bàoshè', meaning: 'Kantor berita', english: 'Newspaper office', level: 5 },
  { id: 'hsk5_026', hanzi: '抱怨', pinyin: 'bàoyuàn', meaning: 'Mengeluh', english: 'Complain', level: 5 },
  { id: 'hsk5_027', hanzi: '悲观', pinyin: 'bēiguān', meaning: 'Pesimis', english: 'Pessimistic', level: 5 },
  { id: 'hsk5_028', hanzi: '背', pinyin: 'bèi', meaning: 'Punggung/Hafal', english: 'Back/Memorize', level: 5 },
  { id: 'hsk5_029', hanzi: '背景', pinyin: 'bèijǐng', meaning: 'Latar belakang', english: 'Background', level: 5 },
  { id: 'hsk5_030', hanzi: '被子', pinyin: 'bèizi', meaning: 'Selimut', english: 'Quilt', level: 5 },
];

/**
 * Get vocabulary filtered by HSK level
 */
export function getVocabularyByLevel(level: HSKLevel | 'all'): Vocabulary[] {
  if (level === 'all') {
    return vocabularyDatabase;
  }
  return vocabularyDatabase.filter((v) => v.level === level);
}

/**
 * Get vocabulary count per HSK level
 */
export function getVocabularyCounts(): Record<HSKLevel | 'all', number> {
  return {
    1: vocabularyDatabase.filter((v) => v.level === 1).length,
    2: vocabularyDatabase.filter((v) => v.level === 2).length,
    3: vocabularyDatabase.filter((v) => v.level === 3).length,
    4: vocabularyDatabase.filter((v) => v.level === 4).length,
    5: vocabularyDatabase.filter((v) => v.level === 5).length,
    all: vocabularyDatabase.length,
  };
}

/**
 * Shuffle array (Fisher-Yates)
 */
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Prepare vocabulary list for session
 * - Single level: 30 soal dari level tersebut
 * - All levels: 6 soal dari masing-masing level (total 30)
 */
export function prepareVocabularyList(level: HSKLevel | 'all'): Vocabulary[] {
  if (level === 'all') {
    // Get 6 random from each HSK level (total 30)
    const hsk1 = shuffleArray(getVocabularyByLevel(1)).slice(0, 6);
    const hsk2 = shuffleArray(getVocabularyByLevel(2)).slice(0, 6);
    const hsk3 = shuffleArray(getVocabularyByLevel(3)).slice(0, 6);
    const hsk4 = shuffleArray(getVocabularyByLevel(4)).slice(0, 6);
    const hsk5 = shuffleArray(getVocabularyByLevel(5)).slice(0, 6);
    return shuffleArray([...hsk1, ...hsk2, ...hsk3, ...hsk4, ...hsk5]);
  } else {
    const levelList = shuffleArray(getVocabularyByLevel(level));
    return levelList.slice(0, 30);
  }
}
