/* ============================================================
 *  WAQTY — DATA BAWAAN
 *  (Konten tambahan bisa ditambah dari Panel Admin tanpa ubah kode)
 * ============================================================ */
window.WAQTY_DATA = {

  HIJRI_MONTHS: ['Muharram','Safar','Rabiul Awal','Rabiul Akhir','Jumadil Awal','Jumadil Akhir',
                 'Rajab',"Sya'ban",'Ramadhan','Syawal',"Dzulqa'dah",'Dzulhijjah'],
  HIJRI_MONTHS_AR: ['مُحَرَّم','صَفَر','رَبِيع الأَوَّل','رَبِيع الآخِر','جُمَادَى الأُولَى','جُمَادَى الآخِرَة',
                    'رَجَب','شَعْبَان','رَمَضَان','شَوَّال','ذُو القَعْدَة','ذُو الحِجَّة'],
  MONTHS: ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'],
  DAYS: ['Ahad','Senin','Selasa','Rabu','Kamis',"Jum'at",'Sabtu'],
  DAYS_AR: ['الأَحَد','الإِثْنَيْن','الثُّلَاثَاء','الأَرْبِعَاء','الخَمِيس','الجُمُعَة','السَّبْت'],
  PASARAN: ['Legi','Pahing','Pon','Wage','Kliwon'],

  /* Kota cepat pilih: [nama, wilayah, lat, lng, zona(UTC+), elevasi m] */
  CITIES: [
    ['Banda Aceh','Aceh',5.5483,95.3238,7,10],['Medan','Sumatera Utara',3.5952,98.6722,7,25],
    ['Padang','Sumatera Barat',-0.9471,100.4172,7,5],['Pekanbaru','Riau',0.5071,101.4478,7,10],
    ['Batam','Kepulauan Riau',1.1301,104.0529,7,10],['Tanjung Pinang','Kepulauan Riau',0.9186,104.4554,7,10],
    ['Jambi','Jambi',-1.6101,103.6131,7,10],['Palembang','Sumatera Selatan',-2.9761,104.7754,7,8],
    ['Pangkal Pinang','Bangka Belitung',-2.1316,106.1169,7,10],['Bengkulu','Bengkulu',-3.8004,102.2655,7,10],
    ['Bandar Lampung','Lampung',-5.3971,105.2668,7,50],['Jakarta Pusat','DKI Jakarta',-6.1744,106.8161,7,5],
    ['Serang','Banten',-6.1204,106.1503,7,30],['Tangerang','Banten',-6.1781,106.6300,7,15],
    ['Bogor','Jawa Barat',-6.5971,106.8060,7,265],['Depok','Jawa Barat',-6.4025,106.7942,7,100],
    ['Bekasi','Jawa Barat',-6.2383,106.9756,7,20],['Bandung','Jawa Barat',-6.9175,107.6191,7,768],
    ['Cirebon','Jawa Barat',-6.7320,108.5523,7,5],['Tasikmalaya','Jawa Barat',-7.3274,108.2207,7,350],
    ['Semarang','Jawa Tengah',-6.9667,110.4167,7,5],['Surakarta','Jawa Tengah',-7.5755,110.8243,7,95],
    ['Kudus','Jawa Tengah',-6.8048,110.8405,7,50],['Pekalongan','Jawa Tengah',-6.8886,109.6753,7,5],
    ['Purwokerto','Jawa Tengah',-7.4245,109.2302,7,110],['Yogyakarta','DI Yogyakarta',-7.7956,110.3695,7,115],
    ['Surabaya','Jawa Timur',-7.2575,112.7521,7,5],['Malang','Jawa Timur',-7.9666,112.6326,7,440],
    ['Kediri','Jawa Timur',-7.8480,112.0178,7,70],['Jombang','Jawa Timur',-7.5463,112.2364,7,45],
    ['Gresik','Jawa Timur',-7.1550,112.6560,7,5],['Sidoarjo','Jawa Timur',-7.4478,112.7183,7,5],
    ['Jember','Jawa Timur',-8.1724,113.7005,7,90],['Banyuwangi','Jawa Timur',-8.2192,114.3691,7,10],
    ['Denpasar','Bali',-8.6705,115.2126,8,10],['Mataram','Nusa Tenggara Barat',-8.5833,116.1167,8,20],
    ['Kupang','Nusa Tenggara Timur',-10.1772,123.6070,8,50],['Pontianak','Kalimantan Barat',-0.0263,109.3425,7,1],
    ['Palangka Raya','Kalimantan Tengah',-2.2136,113.9108,7,25],['Banjarmasin','Kalimantan Selatan',-3.3186,114.5944,8,5],
    ['Samarinda','Kalimantan Timur',-0.5022,117.1536,8,10],['Balikpapan','Kalimantan Timur',-1.2379,116.8529,8,10],
    ['Tanjung Selor','Kalimantan Utara',2.8375,117.3653,8,10],['Manado','Sulawesi Utara',1.4748,124.8421,8,10],
    ['Gorontalo','Gorontalo',0.5435,123.0568,8,10],['Palu','Sulawesi Tengah',-0.8917,119.8707,8,10],
    ['Mamuju','Sulawesi Barat',-2.6748,118.8885,8,10],['Makassar','Sulawesi Selatan',-5.1477,119.4327,8,10],
    ['Kendari','Sulawesi Tenggara',-3.9985,122.5129,8,10],['Ambon','Maluku',-3.6954,128.1814,9,10],
    ['Ternate','Maluku Utara',0.7893,127.3772,9,10],['Sorong','Papua Barat Daya',-0.8762,131.2558,9,10],
    ['Manokwari','Papua Barat',-0.8615,134.0620,9,10],['Nabire','Papua Tengah',-3.3667,135.4833,9,10],
    ['Jayapura','Papua',-2.5337,140.7181,9,10],['Merauke','Papua Selatan',-8.4932,140.4018,9,5],
    ['Makkah','Arab Saudi',21.4225,39.8262,3,277],['Madinah','Arab Saudi',24.4672,39.6112,3,608],
    ['Kuala Lumpur','Malaysia',3.1390,101.6869,8,60],['Singapura','Singapura',1.3521,103.8198,8,15],
    ['Kairo','Mesir',30.0444,31.2357,2,23],['Istanbul','Turki',41.0082,28.9784,3,40]
  ],

  /* Zona waktu provinsi Indonesia (untuk lokasi hasil pencarian) */
  PROVINCE_TZ: {
    'Aceh':7,'Sumatera':7,'Sumatra':7,'Riau':7,'Jambi':7,'Bangka':7,'Bengkulu':7,'Lampung':7,'Jakarta':7,
    'Banten':7,'Jawa':7,'Java':7,'Yogyakarta':7,'Kalimantan Barat':7,'Kalimantan Tengah':7,'West Kalimantan':7,
    'Central Kalimantan':7,'Bali':8,'Nusa Tenggara':8,'Kalimantan Selatan':8,'Kalimantan Timur':8,
    'Kalimantan Utara':8,'South Kalimantan':8,'East Kalimantan':8,'North Kalimantan':8,'Sulawesi':8,
    'Gorontalo':8,'Maluku':9,'Papua':9
  },

  /* Hari besar Islam berbasis kalender Hijriah: [bulan, tanggal, nama, jenis, keterangan]
     jenis: libur | sunnah | peringatan */
  HOLIDAYS: [
    [1,1,'Tahun Baru Islam','libur','1 Muharram — awal tahun Hijriah.'],
    [1,9,"Puasa Tasu'a",'sunnah','Puasa sunnah sehari sebelum Asyura.'],
    [1,10,'Hari Asyura','sunnah','Puasa Asyura menghapus dosa setahun yang lalu (HR Muslim).'],
    [3,12,'Maulid Nabi Muhammad ﷺ','libur','Peringatan kelahiran Rasulullah ﷺ.'],
    [7,1,'Awal Bulan Rajab','peringatan','Salah satu dari empat bulan haram.'],
    [7,27,"Isra Mi'raj Nabi Muhammad ﷺ",'libur','Perjalanan malam Nabi ﷺ dan perintah shalat lima waktu.'],
    [8,15,"Nisfu Sya'ban",'peringatan',"Pertengahan bulan Sya'ban."],
    [9,1,'Awal Ramadhan','sunnah','Hari pertama puasa Ramadhan (menunggu sidang isbat).'],
    [9,17,"Nuzulul Qur'an",'peringatan',"Peringatan turunnya Al-Qur'an."],
    [9,21,'Sepuluh Malam Terakhir','sunnah','Waktu terbaik mencari Lailatul Qadar.'],
    [10,1,'Hari Raya Idul Fitri','libur','1 Syawal — hari kemenangan.'],
    [10,2,'Idul Fitri (Hari Kedua)','libur','Cuti bersama / hari kedua Idul Fitri.'],
    [12,8,'Hari Tarwiyah','sunnah','Disunnahkan berpuasa bagi yang tidak berhaji.'],
    [12,9,'Hari Arafah','sunnah','Puasa Arafah menghapus dosa setahun lalu dan setahun mendatang (HR Muslim).'],
    [12,10,'Hari Raya Idul Adha','libur','Hari raya kurban.'],
    [12,11,'Hari Tasyrik','peringatan','Diharamkan berpuasa (11–13 Dzulhijjah).']
  ],

  /* Peristiwa penting berbasis tanggal Hijriah: [bulan, tanggal, judul, keterangan] */
  EVENTS_HIJRI: [
    [1,1,'Peringatan Hijrah Nabi ﷺ','Hijrah dari Makkah ke Madinah dijadikan titik awal kalender Hijriah oleh Khalifah Umar bin Khattab RA.'],
    [1,10,'Hari Asyura','Nabi Musa AS dan kaumnya diselamatkan dari Fir\'aun (HR Bukhari). Pada hari ini pula (61 H) terjadi peristiwa Karbala, gugurnya Sayyidina Husain bin Ali RA.'],
    [3,12,'Kelahiran Rasulullah ﷺ','Nabi Muhammad ﷺ lahir di Makkah pada Tahun Gajah, menurut pendapat yang masyhur pada 12 Rabiul Awal.'],
    [4,11,'Haul Syaikh Abdul Qadir al-Jilani','Wafatnya Sulthanul Auliya Syaikh Abdul Qadir al-Jilani di Baghdad (561 H), dikenang dalam tradisi "Sewelasan".'],
    [6,22,'Wafat Abu Bakar Ash-Shiddiq RA','Khalifah pertama umat Islam wafat di Madinah pada 13 H, menurut riwayat yang masyhur.'],
    [7,16,'Hari Lahir Nahdlatul Ulama','NU didirikan di Surabaya pada 16 Rajab 1344 H (31 Januari 1926) oleh KH Hasyim Asy\'ari dan para ulama.'],
    [7,27,"Isra Mi'raj",'Rasulullah ﷺ diperjalankan dari Masjidil Haram ke Masjidil Aqsha lalu naik ke Sidratul Muntaha dan menerima perintah shalat lima waktu.'],
    [8,15,"Nisfu Sya'ban",'Menurut sebagian riwayat, pada pertengahan Sya\'ban tahun 2 H arah kiblat dipindahkan dari Baitul Maqdis ke Ka\'bah.'],
    [9,9,'Proklamasi Kemerdekaan RI','Proklamasi 17 Agustus 1945 bertepatan dengan 9 Ramadhan 1364 H, saat bangsa Indonesia sedang berpuasa.'],
    [9,10,'Wafat Sayyidah Khadijah RA','Istri pertama Rasulullah ﷺ wafat pada bulan Ramadhan tahun ke-10 kenabian, dikenal sebagai Tahun Duka ('+"'Amul Huzni)."],
    [9,17,"Nuzulul Qur'an & Perang Badar",'Peringatan turunnya Al-Qur\'an; pada 17 Ramadhan 2 H kaum muslimin meraih kemenangan dalam Perang Badar Kubra.'],
    [9,20,'Fathu Makkah','Pembebasan kota Makkah tanpa pertumpahan darah pada Ramadhan 8 H.'],
    [10,1,'Idul Fitri','Hari raya setelah sebulan penuh berpuasa Ramadhan.'],
    [10,15,'Perang Uhud','Menurut riwayat Ibnu Ishaq, Perang Uhud terjadi pada pertengahan Syawal 3 H.'],
    [12,9,"Wukuf di Arafah & Khutbah Wada'",'Puncak ibadah haji. Pada 9 Dzulhijjah 10 H Rasulullah ﷺ menyampaikan Khutbah Wada\' di Arafah.'],
    [12,10,'Idul Adha','Mengenang keteladanan Nabi Ibrahim AS dan Nabi Ismail AS dalam ketaatan kepada Allah.']
  ],

  /* Catatan sejarah per bulan Hijriah (tampil bila hari ini tidak ada peristiwa khusus) */
  MONTH_NOTES: [
    'Muharram adalah salah satu dari empat bulan haram (QS At-Taubah: 36). Rasulullah ﷺ menyebutnya "Syahrullah" — bulan Allah.',
    'Pada akhir Safar, Rasulullah ﷺ bersama Abu Bakar RA memulai perjalanan hijrah dan bersembunyi di Gua Tsur.',
    'Di bulan Rabiul Awal Rasulullah ﷺ lahir, tiba di Quba saat hijrah, dan wafat pada 11 H.',
    'Rabiul Akhir: bulan haul Syaikh Abdul Qadir al-Jilani yang banyak diperingati di Nusantara.',
    'Jumadil Awal 8 H: terjadi Perang Mu\'tah, ketika pasukan muslim menghadapi pasukan Romawi.',
    'Jumadil Akhir 13 H: Khalifah Abu Bakar Ash-Shiddiq RA wafat dan digantikan Umar bin Khattab RA.',
    'Rajab adalah bulan haram. Pada Rajab 9 H terjadi Perang Tabuk, ekspedisi terakhir yang dipimpin Rasulullah ﷺ.',
    'Sya\'ban adalah bulan diangkatnya amal kepada Allah; Rasulullah ﷺ memperbanyak puasa di bulan ini (HR An-Nasa\'i).',
    'Ramadhan: bulan turunnya Al-Qur\'an, bulan Badar dan Fathu Makkah.',
    'Syawal 5 H: Perang Khandaq (Ahzab), ketika kaum muslimin menggali parit atas usulan Salman al-Farisi RA.',
    'Dzulqa\'dah 6 H: Perjanjian Hudaibiyah, yang disebut Al-Qur\'an sebagai kemenangan yang nyata (QS Al-Fath: 1).',
    'Dzulhijjah 10 H: Haji Wada\', satu-satunya haji yang dilaksanakan Rasulullah ﷺ.'
  ],

  /* Hari penting nasional/internasional (Masehi): ['MM-DD', judul, keterangan] */
  EVENTS_MASEHI: [
    ['01-01','Tahun Baru Masehi','Awal tahun kalender Masehi.'],
    ['01-03','Hari Amal Bakti Kementerian Agama','Kementerian Agama RI berdiri pada 3 Januari 1946.'],
    ['01-31','Hari Lahir NU (Masehi)','Nahdlatul Ulama berdiri di Surabaya, 31 Januari 1926.'],
    ['02-05','Hari Lahir HMI','Himpunan Mahasiswa Islam didirikan di Yogyakarta, 5 Februari 1947.'],
    ['02-09','Hari Pers Nasional','Diperingati setiap 9 Februari.'],
    ['04-21','Hari Kartini','Mengenang perjuangan R.A. Kartini bagi pendidikan perempuan.'],
    ['04-22','Hari Bumi','Hari kesadaran lingkungan sedunia.'],
    ['05-02','Hari Pendidikan Nasional','Bertepatan dengan hari lahir Ki Hajar Dewantara.'],
    ['05-20','Hari Kebangkitan Nasional','Mengenang berdirinya Budi Utomo, 1908.'],
    ['06-01','Hari Lahir Pancasila','Pidato Ir. Soekarno pada 1 Juni 1945.'],
    ['06-05','Hari Lingkungan Hidup Sedunia','Merawat bumi adalah bagian dari amanah khalifah.'],
    ['07-23','Hari Anak Nasional','Diperingati setiap 23 Juli.'],
    ['08-17','Hari Kemerdekaan RI','Proklamasi 17 Agustus 1945, bertepatan dengan 9 Ramadhan 1364 H.'],
    ['10-01','Hari Kesaktian Pancasila','Diperingati setiap 1 Oktober.'],
    ['10-02','Hari Batik Nasional','Batik diakui UNESCO sebagai warisan budaya takbenda, 2 Oktober 2009.'],
    ['10-22','Hari Santri Nasional','Mengenang Resolusi Jihad KH Hasyim Asy\'ari, 22 Oktober 1945.'],
    ['10-28','Hari Sumpah Pemuda','Ikrar para pemuda Indonesia, 28 Oktober 1928.'],
    ['11-10','Hari Pahlawan','Mengenang pertempuran 10 November 1945 di Surabaya.'],
    ['11-18','Milad Muhammadiyah','Muhammadiyah didirikan KH Ahmad Dahlan di Yogyakarta, 18 November 1912.'],
    ['11-25','Hari Guru Nasional','Bertepatan dengan HUT PGRI. Terima kasih, para guru!'],
    ['12-03','Hari Disabilitas Internasional','Diperingati setiap 3 Desember.'],
    ['12-10','Hari Hak Asasi Manusia','Diperingati setiap 10 Desember.'],
    ['12-22','Hari Ibu','Mengenang Kongres Perempuan Indonesia I, 22 Desember 1928.']
  ],

  /* Mutiara harian: {t: jenis, ar: teks Arab (opsional), id: makna, src: sumber} */
  QUOTES: [
    {t:"Al-Qur'an", ar:'فَإِنَّ مَعَ الْعُسْرِ يُسْرًا ۝ إِنَّ مَعَ الْعُسْرِ يُسْرًا', id:'Maka sesungguhnya bersama kesulitan ada kemudahan. Sesungguhnya bersama kesulitan ada kemudahan.', src:'QS Al-Insyirah: 5–6'},
    {t:"Al-Qur'an", ar:'أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ', id:'Ingatlah, hanya dengan mengingat Allah hati menjadi tenteram.', src:"QS Ar-Ra'd: 28"},
    {t:"Al-Qur'an", ar:'إِنَّ اللَّهَ مَعَ الصَّابِرِينَ', id:'Sesungguhnya Allah beserta orang-orang yang sabar.', src:'QS Al-Baqarah: 153'},
    {t:"Al-Qur'an", ar:'لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا', id:'Allah tidak membebani seseorang melainkan sesuai dengan kesanggupannya.', src:'QS Al-Baqarah: 286'},
    {t:"Al-Qur'an", ar:'فَاذْكُرُونِي أَذْكُرْكُمْ', id:'Maka ingatlah kepada-Ku, niscaya Aku ingat kepadamu.', src:'QS Al-Baqarah: 152'},
    {t:"Al-Qur'an", ar:'لَئِن شَكَرْتُمْ لَأَزِيدَنَّكُمْ', id:'Sesungguhnya jika kamu bersyukur, pasti Aku akan menambah (nikmat) kepadamu.', src:'QS Ibrahim: 7'},
    {t:"Al-Qur'an", ar:'إِنَّ الصَّلَاةَ تَنْهَىٰ عَنِ الْفَحْشَاءِ وَالْمُنكَرِ', id:'Sesungguhnya shalat itu mencegah dari perbuatan keji dan mungkar.', src:"QS Al-'Ankabut: 45"},
    {t:"Al-Qur'an", ar:'إِنَّ اللَّهَ لَا يُغَيِّرُ مَا بِقَوْمٍ حَتَّىٰ يُغَيِّرُوا مَا بِأَنفُسِهِمْ', id:'Sesungguhnya Allah tidak mengubah keadaan suatu kaum hingga mereka mengubah keadaan diri mereka sendiri.', src:"QS Ar-Ra'd: 11"},
    {t:"Al-Qur'an", ar:'لَا تَقْنَطُوا مِن رَّحْمَةِ اللَّهِ', id:'Janganlah kamu berputus asa dari rahmat Allah.', src:'QS Az-Zumar: 53'},
    {t:"Al-Qur'an", ar:'وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ', id:'Barang siapa bertawakal kepada Allah, niscaya Allah mencukupkan (keperluan)nya.', src:'QS Ath-Thalaq: 3'},
    {t:"Al-Qur'an", ar:'إِنَّ أَكْرَمَكُمْ عِندَ اللَّهِ أَتْقَاكُمْ', id:'Sesungguhnya yang paling mulia di antara kamu di sisi Allah adalah yang paling bertakwa.', src:'QS Al-Hujurat: 13'},
    {t:"Al-Qur'an", ar:'وَاسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ', id:'Dan mohonlah pertolongan (kepada Allah) dengan sabar dan shalat.', src:'QS Al-Baqarah: 45'},
    {t:"Al-Qur'an", ar:'وَقُل رَّبِّ زِدْنِي عِلْمًا', id:'Dan katakanlah: "Ya Tuhanku, tambahkanlah ilmu kepadaku."', src:'QS Thaha: 114'},
    {t:"Al-Qur'an", ar:'وَهُوَ مَعَكُمْ أَيْنَ مَا كُنتُمْ', id:'Dan Dia bersama kamu di mana saja kamu berada.', src:'QS Al-Hadid: 4'},
    {t:'Hadits', ar:'إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ', id:'Sesungguhnya setiap amal itu tergantung pada niatnya.', src:'HR Bukhari & Muslim'},
    {t:'Hadits', ar:'خَيْرُ النَّاسِ أَنْفَعُهُمْ لِلنَّاسِ', id:'Sebaik-baik manusia adalah yang paling bermanfaat bagi manusia lain.', src:'HR Ath-Thabrani'},
    {t:'Hadits', ar:'الطُّهُورُ شَطْرُ الْإِيمَانِ', id:'Kesucian itu sebagian dari iman.', src:'HR Muslim'},
    {t:'Hadits', ar:'الدِّينُ النَّصِيحَةُ', id:'Agama itu adalah nasihat.', src:'HR Muslim'},
    {t:'Hadits', ar:'مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الْآخِرِ فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ', id:'Barang siapa beriman kepada Allah dan hari akhir, hendaklah ia berkata baik atau diam.', src:'HR Bukhari & Muslim'},
    {t:'Hadits', ar:'لَا تَغْضَبْ', id:'Janganlah engkau marah.', src:'HR Bukhari'},
    {t:'Hadits', ar:'أَحَبُّ الْأَعْمَالِ إِلَى اللَّهِ أَدْوَمُهَا وَإِنْ قَلَّ', id:'Amalan yang paling dicintai Allah adalah yang paling konsisten walaupun sedikit.', src:'HR Bukhari & Muslim'},
    {t:'Hadits', ar:'تَبَسُّمُكَ فِي وَجْهِ أَخِيكَ لَكَ صَدَقَةٌ', id:'Senyummu di hadapan saudaramu adalah sedekah.', src:'HR At-Tirmidzi'},
    {t:'Hadits', ar:'الْكَلِمَةُ الطَّيِّبَةُ صَدَقَةٌ', id:'Ucapan yang baik adalah sedekah.', src:'HR Bukhari & Muslim'},
    {t:'Hadits', ar:'مَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا سَهَّلَ اللَّهُ لَهُ بِهِ طَرِيقًا إِلَى الْجَنَّةِ', id:'Barang siapa menempuh jalan untuk mencari ilmu, Allah mudahkan baginya jalan menuju surga.', src:'HR Muslim'},
    {t:'Hadits', ar:'اتَّقِ اللَّهَ حَيْثُمَا كُنْتَ', id:'Bertakwalah kepada Allah di mana pun engkau berada.', src:'HR At-Tirmidzi'},
    {t:'Mahfudzat', ar:'مَنْ جَدَّ وَجَدَ', id:'Barang siapa bersungguh-sungguh, ia akan berhasil.', src:'Mahfudzat'},
    {t:'Mahfudzat', ar:'مَنْ صَبَرَ ظَفِرَ', id:'Barang siapa bersabar, ia akan beruntung.', src:'Mahfudzat'},
    {t:'Mahfudzat', ar:'مَنْ زَرَعَ حَصَدَ', id:'Barang siapa menanam, ia akan menuai.', src:'Mahfudzat'},
    {t:'Mahfudzat', ar:'الْوَقْتُ كَالسَّيْفِ إِنْ لَمْ تَقْطَعْهُ قَطَعَكَ', id:'Waktu itu laksana pedang; jika engkau tidak menggunakannya, ia akan memotongmu.', src:'Mahfudzat'},
    {t:'Syair', ar:'خَيْرُ جَلِيسٍ فِي الزَّمَانِ كِتَابٌ', id:'Sebaik-baik teman duduk sepanjang zaman adalah buku.', src:'Al-Mutanabbi'},
    {t:'Kata Ulama', ar:'لَيْسَ الْعِلْمُ مَا حُفِظَ، الْعِلْمُ مَا نَفَعَ', id:'Ilmu bukanlah yang dihafal, ilmu adalah yang memberi manfaat.', src:"Imam Asy-Syafi'i"},
    {t:'Syair', ar:'', id:'Aku melihat air yang diam menjadi rusak karenanya; jika ia mengalir ia menjadi baik, jika tidak mengalir ia tidak akan baik. Merantaulah, engkau akan mendapat pengganti dari yang kau tinggalkan.', src:"Diwan Imam Asy-Syafi'i (makna bebas)"},
    {t:'Kata Ulama', ar:'', id:'Barang siapa tidak pernah merasakan pahitnya belajar sesaat, ia akan menelan hinanya kebodohan sepanjang hidupnya.', src:"Imam Asy-Syafi'i"},
    {t:'Kata Ulama', ar:'', id:'Dunia ini hanya tiga hari: kemarin yang telah berlalu, esok yang belum tentu engkau jumpai, dan hari ini — maka beramallah padanya.', src:'Hasan al-Bashri (makna)'},
    {t:'Kata Ulama', ar:'', id:'Jadilah seperti pohon kurma: dilempar batu, ia membalas dengan buah.', src:'Hikmah'}
  ]
};
