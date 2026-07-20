import { ComponentData } from "../types";

// High-quality, modern vector SVG drawings representing engineered technical schematics.
// This guarantees that images look incredibly crisp, are fully scalable, zoomable, and load instantly offline.

export const DEFAULT_COMPONENTS: ComponentData[] = [
  {
    slug: "saklar",
    name: "Saklar",
    category: "Kelistrikan",
    imageUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%"><rect width="400" height="300" fill="%230f172a" rx="12"/><g stroke="%2338bdf8" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"><circle cx="120" cy="150" r="10" fill="%230f172a" stroke="%2338bdf8" stroke-width="4"/><circle cx="280" cy="150" r="10" fill="%230f172a" stroke="%2338bdf8" stroke-width="4"/><path d="M70 150 h40" stroke-dasharray="4 4"/><path d="M290 150 h40" stroke-dasharray="4 4"/><path d="M128 144 L250 80" stroke="%2360a5fa" stroke-width="5"/><path d="M220 120 A 40 40 0 0 0 250 142" stroke="%23fbbf24" stroke-width="2" stroke-dasharray="3 3"/><text x="175" y="70" fill="%2360a5fa" font-family="monospace" font-size="14" text-anchor="middle">OFF STATE (OPEN)</text></g><text x="200" y="240" fill="%2394a3b8" font-family="sans-serif" font-size="14" text-anchor="middle">Diagram Skematik Kontak Saklar Sederhana</text><text x="200" y="265" fill="%2338bdf8" font-family="monospace" font-size="12" text-anchor="middle">SMK Teknik Kelistrikan &amp; Elektronika</text></svg>`,
    functionDescription: "Saklar berfungsi untuk menghubungkan dan memutus aliran listrik pada suatu rangkaian.",
    workingPrinciple: [
      "Saat saklar berada pada posisi mati (OFF), tuas atau tombol memisahkan kontak logam di dalam saklar.",
      "Hal ini menciptakan celah udara (terbuka) di dalam rangkaian listrik yang menghentikan aliran arus listrik.",
      "Saat saklar diubah ke posisi hidup (ON), tuas akan menggerakkan kontak logam sehingga saling bersentuhan.",
      "Sentuhan logam tersebut menutup celah (tertutup) dan memungkinkan elektron mengalir kembali melalui rangkaian.",
      "Arus listrik yang mengalir ini mengaktifkan beban yang terhubung seperti lampu, motor, atau peralatan elektronik lainnya."
    ],
    types: [
      "Saklar Toggle (Tuas)",
      "Saklar Push Button (Tombol Tekan)",
      "Saklar Rocker (Ayun)",
      "Saklar Selector (Putar)",
      "Saklar Limit (Pembatas)"
    ],
    youtubeUrl: "https://www.youtube.com/embed/9BqV1f35T_w",
    quiz: [
      {
        question: "Apa fungsi utama saklar dalam rangkaian listrik?",
        options: [
          "Menyimpan energi listrik",
          "Memutus dan menghubungkan arus listrik",
          "Mengukur besarnya tegangan listrik",
          "Menurunkan hambatan kawat penghantar"
        ],
        correctAnswerIndex: 1
      },
      {
        question: "Saat saklar berada dalam kondisi OFF, apa yang terjadi pada rangkaian?",
        options: [
          "Arus listrik bertambah besar",
          "Tegangan listrik naik secara drastis",
          "Rangkaian menjadi terbuka dan arus terputus",
          "Aliran listrik berjalan bolak-balik"
        ],
        correctAnswerIndex: 2
      },
      {
        question: "Manakah di bawah ini yang merupakan contoh jenis saklar?",
        options: [
          "Resistor Karbon",
          "Toggle Switch",
          "Dioda Zener",
          "Kapasitor Elektrolit"
        ],
        correctAnswerIndex: 1
      },
      {
        question: "Apa perbedaan utama antara Saklar Push Button (Normally Open) dan Saklar Toggle?",
        options: [
          "Push Button hanya menyambungkan arus selama ditekan, sedangkan Toggle mengunci posisinya",
          "Push Button hanya bisa dialiri AC, sedangkan Toggle untuk arus DC saja",
          "Push Button memiliki terminal positif saja tanpa terminal negatif",
          "Toggle Switch bekerja secara magnetik tanpa adanya kontak mekanis fisik"
        ],
        correctAnswerIndex: 0
      },
      {
        question: "Pada diagram rangkaian skematik listrik, saklar yang terbuka digambarkan sebagai...",
        options: [
          "Garis lurus tebal bersambung",
          "Garis miring yang mengangkat menjauhi titik terminal kontak",
          "Simbol lingkaran dengan tanda tambah di dalamnya",
          "Simbol gelombang sinusoidal berfrekuensi tinggi"
        ],
        correctAnswerIndex: 1
      }
    ]
  },
  {
    slug: "resistor",
    name: "Resistor",
    category: "Elektronika",
    imageUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%"><rect width="400" height="300" fill="%230f172a" rx="12"/><g stroke="%2338bdf8" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M50 150 h60 L125 120 L140 180 L155 120 L170 180 L185 120 L200 180 L215 120 L230 180 L245 120 L260 180 L275 150 h60" stroke="%2360a5fa" stroke-width="4"/><rect x="135" y="105" width="130" height="90" fill="%231e293b" stroke="%2338bdf8" stroke-width="2" rx="6"/><rect x="155" y="105" width="12" height="90" fill="%23ef4444" stroke="none"/><rect x="180" y="105" width="12" height="90" fill="%239333ea" stroke="none"/><rect x="205" y="105" width="12" height="90" fill="%23f59e0b" stroke="none"/><rect x="235" y="105" width="12" height="90" fill="%23d97706" stroke="none"/><text x="200" y="70" fill="%2360a5fa" font-family="monospace" font-size="14" text-anchor="middle">R = Gelang Warna (Ohm)</text></g><text x="200" y="240" fill="%2394a3b8" font-family="sans-serif" font-size="14" text-anchor="middle">Skematik Resistor Tetap &amp; Gelang Warna</text><text x="200" y="265" fill="%2338bdf8" font-family="monospace" font-size="12" text-anchor="middle">Hukum Ohm: V = I x R</text></svg>`,
    functionDescription: "Resistor berfungsi untuk menghambat dan mengatur aliran arus listrik serta menurunkan tegangan dalam suatu rangkaian.",
    workingPrinciple: [
      "Arus listrik terbentuk dari elektron-elektron bebas yang bergerak melewati suatu material konduktor.",
      "Di dalam resistor, terdapat bahan berhambatan tinggi (seperti karbon, film logam, atau kawat resistif) yang mengganggu laju bebas elektron.",
      "Saat elektron menabrak atom-atom bahan resistif tersebut, sebagian energi kinetiknya diubah menjadi energi panas.",
      "Akibatnya, jumlah muatan listrik (elektron) yang dapat mengalir keluar dari resistor berkurang per detiknya (arus listrik berkurang).",
      "Penurunan laju arus ini menciptakan perbedaan potensi tegangan antara kedua terminal kaki resistor sesuai Hukum Ohm (V = I * R)."
    ],
    types: [
      "Resistor Tetap (Fixed Resistor - Karbon/Film Logam)",
      "Resistor Variabel (Potensiometer & Rheostat)",
      "LDR (Light Dependent Resistor - Sensitif Cahaya)",
      "NTC / PTC Thermistor (Sensitif Suhu)",
      "VDR (Varistor - Sensitif Tegangan)"
    ],
    youtubeUrl: "https://www.youtube.com/embed/Gc1wVdb5Xio",
    quiz: [
      {
        question: "Apa satuan internasional untuk mengukur nilai hambatan sebuah resistor?",
        options: ["Volt", "Ampere", "Ohm", "Farad"],
        correctAnswerIndex: 2
      },
      {
        question: "Komponen resistor yang nilai hambatannya berubah drastis berdasarkan intensitas cahaya adalah...",
        options: [
          "Potensiometer",
          "Thermistor NTC",
          "LDR (Light Dependent Resistor)",
          "Varistor VDR"
        ],
        correctAnswerIndex: 2
      },
      {
        question: "Berdasarkan Hukum Ohm, jika nilai hambatan (R) diperbesar sedangkan tegangannya (V) tetap, maka arus (I) akan...",
        options: [
          "Menurun",
          "Meningkat",
          "Tetap sama",
          "Berubah menjadi bolak-balik (AC)"
        ],
        correctAnswerIndex: 0
      },
      {
        question: "Gelang warna pertama, kedua, dan ketiga pada resistor tetap berturut-turut menentukan...",
        options: [
          "Nilai toleransi kesalahan resistor",
          "Angka pertama, angka kedua, dan faktor pengali (multiplier)",
          "Batas maksimum suhu operasional",
          "Daya maksimum dalam satuan Watt"
        ],
        correctAnswerIndex: 1
      },
      {
        question: "Jenis resistor variabel yang memiliki 3 terminal kaki dan biasa digunakan sebagai pengatur volume audio adalah...",
        options: ["LDR", "Potensiometer", "Thermistor", "Resistor Film Karbon"],
        correctAnswerIndex: 1
      }
    ]
  },
  {
    slug: "relay",
    name: "Relay",
    category: "Kelistrikan",
    imageUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%"><rect width="400" height="300" fill="%230f172a" rx="12"/><g stroke="%2338bdf8" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M70 120 H90 M70 180 H90" stroke="%2360a5fa"/><path d="M90 120 C 100 110, 100 130, 110 120 C 120 110, 120 130, 130 120 C 140 110, 140 130, 150 120 C 160 110, 160 130, 170 120 H190" stroke="%2338bdf8" stroke-width="3"/><path d="M190 120 V150 H170 M90 120 V150 H110"/><rect x="110" y="135" width="60" height="30" fill="%231e293b" stroke="%2338bdf8" stroke-width="2"/><circle cx="280" cy="150" r="8" fill="%230f172a" stroke="%2360a5fa" stroke-width="3"/><circle cx="330" cy="110" r="8" fill="%230f172a" stroke="%23ef4444" stroke-width="3"/><circle cx="330" cy="190" r="8" fill="%230f172a" stroke="%2322c55e" stroke-width="3"/><path d="M287 150 L322 116" stroke="%23fbbf24" stroke-width="4"/><path d="M230 120 V180" stroke="%2338bdf8" stroke-dasharray="4 4"/><text x="140" y="90" fill="%2360a5fa" font-family="monospace" font-size="12" text-anchor="middle">KOIL MAGNET</text><text x="350" y="115" fill="%23ef4444" font-family="monospace" font-size="11">NC</text><text x="350" y="195" fill="%2322c55e" font-family="monospace" font-size="11">NO</text></g><text x="200" y="240" fill="%2394a3b8" font-family="sans-serif" font-size="14" text-anchor="middle">Koil Elektromagnet &amp; Kontak SPDT Relay</text><text x="200" y="265" fill="%2338bdf8" font-family="monospace" font-size="12" text-anchor="middle">Kontrol Daya Tinggi lewat Tegangan Rendah</text></svg>`,
    functionDescription: "Relay berfungsi sebagai saklar elektromagnetik yang dikendalikan oleh arus listrik kecil untuk menghubungkan atau memutuskan rangkaian berarus besar secara aman.",
    workingPrinciple: [
      "Ketika bagian kumparan (koil) relay dialiri arus listrik rendah, kumparan kawat tersebut akan memunculkan medan elektromagnetik.",
      "Gaya magnet yang terbentuk di sekeliling koil akan menarik tuas atau armature besi lentur mendekati inti besi koil.",
      "Gerakan mekanis armature tersebut kemudian mendorong atau menarik kontak utama (switch internal) berpindah posisi.",
      "Pada relay jenis SPDT, kontak logam akan berpindah dari terminal NC (Normally Closed) menuju terminal NO (Normally Open).",
      "Ketika pasokan listrik koil diputus, medan magnet menghilang, dan pegas mekanis mengembalikan kontak ke posisi semula (NC)."
    ],
    types: [
      "Relay Elektromagnetik (Mekanik Koil)",
      "Solid State Relay (SSR - Semikonduktor & Tanpa Kontak Bergerak)",
      "Relay Proteksi Overload (Thermal Relay)",
      "Reed Relay (Relay Buluh Magnetik)"
    ],
    youtubeUrl: "https://www.youtube.com/embed/n594CkrP6yU",
    quiz: [
      {
        question: "Prinsip dasar fisika apa yang digunakan oleh relay untuk memindahkan posisi kontaknya?",
        options: ["Gaya gravitasi bumi", "Elektromagnetisme", "Radiasi termal", "Induksi elektrostatik"],
        correctAnswerIndex: 1
      },
      {
        question: "Apa kepanjangan dari istilah NO dan NC pada kaki kontaktor atau relay?",
        options: [
          "Normally Open dan Normally Closed",
          "New Outflow dan Natural Charge",
          "Nominal Voltage dan Negative Conductor",
          "Normal Operator dan Nominal Circuit"
        ],
        correctAnswerIndex: 0
      },
      {
        question: "Mengapa kita membutuhkan bantuan relay dalam mengendalikan motor AC 220V menggunakan Arduino yang berdaya DC 5V?",
        options: [
          "Agar motor AC berputar lebih lambat",
          "Untuk menyearahkan arus AC menjadi DC",
          "Mengisolasi dan mengendalikan sirkuit tegangan tinggi AC yang berbahaya dengan sirkuit kontrol DC kecil secara aman",
          "Menghemat kabel grounding motor"
        ],
        correctAnswerIndex: 2
      },
      {
        question: "Apa keunggulan utama Solid State Relay (SSR) dibandingkan dengan relay elektromagnetik biasa?",
        options: [
          "Harganya jauh lebih murah",
          "Bekerja tanpa suara berisik klik, masa pakai sangat panjang karena tidak ada kontak mekanis yang aus",
          "Tidak memerlukan arus input sama sekali",
          "Mampu menahan sambaran petir secara langsung"
        ],
        correctAnswerIndex: 1
      },
      {
        question: "Saat koil relay TIDAK diberi energi listrik, kondisi kontak terminal COM akan terhubung ke terminal...",
        options: ["NO (Normally Open)", "NC (Normally Closed)", "Ground", "VCC baterai"],
        correctAnswerIndex: 1
      }
    ]
  },
  {
    slug: "kapasitor",
    name: "Kapasitor",
    category: "Elektronika",
    imageUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%"><rect width="400" height="300" fill="%230f172a" rx="12"/><g stroke="%2338bdf8" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M80 150 H165 M235 150 H320" stroke="%2360a5fa" stroke-width="4"/><path d="M165 100 V200" stroke="%2338bdf8" stroke-width="5"/><path d="M235 100 V200" stroke="%2338bdf8" stroke-width="5"/><path d="M150 120 h10 M150 150 h10 M150 180 h10" stroke="%2322c55e"/><path d="M250 120 h-10 M250 150 h-10 M250 180 h-10" stroke="%23ef4444"/><rect x="180" y="105" width="40" height="90" fill="%231e293b" stroke="%2394a3b8" stroke-dasharray="2 2" stroke-width="2"/><text x="200" y="80" fill="%2394a3b8" font-family="monospace" font-size="11" text-anchor="middle">DIELEKTRIK</text><text x="130" y="90" fill="%2322c55e" font-family="monospace" font-weight="bold" font-size="20" text-anchor="middle">+</text><text x="270" y="90" fill="%23ef4444" font-family="monospace" font-weight="bold" font-size="20" text-anchor="middle">-</text></g><text x="200" y="240" fill="%2394a3b8" font-family="sans-serif" font-size="14" text-anchor="middle">Medan Listrik di Antara Pelat Kapasitor</text><text x="200" y="265" fill="%2338bdf8" font-family="monospace" font-size="12" text-anchor="middle">Kapasitansi (Farad): Q = C x V</text></svg>`,
    functionDescription: "Kapasitor berfungsi untuk menyimpan energi listrik dalam bentuk medan elektrostatik untuk sementara waktu, menyaring frekuensi, serta menstabilkan tegangan.",
    workingPrinciple: [
      "Kapasitor secara struktural dibentuk oleh dua pelat logam konduktor sejajar yang dipisahkan sekat bahan isolator (dielektrik).",
      "Saat dihubungkan ke sumber listrik DC, elektron mengalir menuju salah satu pelat dan menumpuk di sana, menjadikannya bermuatan negatif.",
      "Secara bersamaan, pelat pasangannya melepaskan elektron menuju kutub positif sumber, menjadikannya bermuatan positif.",
      "Perbedaan muatan di antara kedua pelat memicu timbulnya medan elektrostatik melintasi bahan dielektrik penyekat.",
      "Medan elektrostatik inilah yang mengunci muatan agar tetap tersimpan meskipun koneksi sumber listrik dilepaskan."
    ],
    types: [
      "Kapasitor Elektrolit (Elco - Memiliki Polaritas +/-)",
      "Kapasitor Keramik (Non-Polar & Ukuran Kecil)",
      "Kapasitor Mika & Film (Stabilitas Tinggi)",
      "Kapasitor Tantalum (Kapasitansi Tinggi per Volume)",
      "Kapasitor Variabel (Varco - Untuk Tuning Frekuensi Radio)"
    ],
    youtubeUrl: "https://www.youtube.com/embed/F_VDK4O9fcc",
    quiz: [
      {
        question: "Apa satuan internasional untuk mengukur besarnya nilai kapasitas atau kapasitansi sebuah kapasitor?",
        options: ["Ohm", "Henry", "Farad", "Weber"],
        correctAnswerIndex: 2
      },
      {
        question: "Jenis kapasitor yang memiliki polaritas kaki positif (+) dan negatif (-) sehingga tidak boleh dipasang terbalik adalah...",
        options: ["Kapasitor Keramik", "Kapasitor Elektrolit (Elco)", "Kapasitor Mika", "Kapasitor Kertas"],
        correctAnswerIndex: 1
      },
      {
        question: "Apa fungsi utama dari kapasitor yang dipasang pada sirkuit penyearah catu daya (power supply rectifier)?",
        options: [
          "Meningkatkan tegangan AC sirkuit",
          "Sebagai filter untuk meratakan riak (ripple) gelombang tegangan agar menjadi DC yang lebih stabil",
          "Mengubah arus DC menjadi AC secara berkala",
          "Memutuskan sirkuit ketika terjadi korsleting"
        ],
        correctAnswerIndex: 1
      },
      {
        question: "Bahan non-konduktor yang disisipkan di antara kedua pelat kapasitor untuk meningkatkan kapasitas hambatannya disebut...",
        options: ["Elektroda", "Dielektrik", "Resistor", "Semi-konduktor"],
        correctAnswerIndex: 1
      },
      {
        question: "Jika sebuah kapasitor dialiri arus searah (DC) hingga mencapai kondisi penuh (steady state), maka kapasitor akan...",
        options: [
          "Mengalami korsleting (short circuit)",
          "Bertindak sebagai saklar terbuka (open circuit) yang memblokir arus DC",
          "Mengubah energinya menjadi energi magnetik dinamis",
          "Membakar sirkuit karena panas tinggi"
        ],
        correctAnswerIndex: 1
      }
    ]
  },
  {
    slug: "dioda",
    name: "Dioda",
    category: "Elektronika",
    imageUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%"><rect width="400" height="300" fill="%230f172a" rx="12"/><g stroke="%2338bdf8" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M60 150 H150 M250 150 H340" stroke="%2360a5fa" stroke-width="4"/><path d="M150 90 L250 150 L150 210 Z" fill="%231e293b" stroke="%2338bdf8" stroke-width="4"/><path d="M250 90 V210" stroke="%2360a5fa" stroke-width="5"/><text x="120" y="70" fill="%2322c55e" font-family="monospace" font-size="14" font-weight="bold" text-anchor="middle">ANODA (+)</text><text x="280" y="70" fill="%23ef4444" font-family="monospace" font-size="14" font-weight="bold" text-anchor="middle">KATODA (-)</text><path d="M100 130 H120 M110 120 V140" stroke="%2322c55e" stroke-width="2"/><path d="M290 130 H310" stroke="%23ef4444" stroke-width="2"/></g><text x="200" y="240" fill="%2394a3b8" font-family="sans-serif" font-size="14" text-anchor="middle">Simbol Skematik Sambungan P-N Dioda</text><text x="200" y="265" fill="%2338bdf8" font-family="monospace" font-size="12" text-anchor="middle">Karakteristik Katup Arus Satu Arah</text></svg>`,
    functionDescription: "Dioda berfungsi untuk menyearahkan arus listrik (mengalirkan arus hanya ke satu arah) serta memblokir arus dari arah sebaliknya.",
    workingPrinciple: [
      "Dioda dibangun dari penyambungan material semikonduktor tipe-P (Anoda) dan semikonduktor tipe-N (Katoda).",
      "Pada kondisi bias maju (forward bias), kaki Anoda dihubungkan ke positif sumber dan Katoda dihubungkan ke negatif.",
      "Tegangan maju ini meruntuhkan medan hambatan internal (depletion layer) sehingga arus elektron bebas mengalir lancar.",
      "Pada kondisi bias mundur (reverse bias), kaki Anoda diberi negatif dan Katoda diberi positif.",
      "Tegangan mundur ini justru memperlebar area depletion layer, menciptakan resistansi sangat tinggi yang menyumbat aliran arus."
    ],
    types: [
      "Dioda Penyearah (Rectifier Diode - Silikon/Germanium)",
      "LED (Light Emitting Diode - Pemancar Cahaya)",
      "Dioda Zener (Penyetabil Tegangan Sirkuit)",
      "Dioda Foto (Photodiode - Sensor Cahaya)",
      "Dioda Schottky (Kecepatan Switching Tinggi)"
    ],
    youtubeUrl: "https://www.youtube.com/embed/vQoKj_iCHiA",
    quiz: [
      {
        question: "Apa nama kedua kaki elektroda terminal utama yang ada pada komponen dioda?",
        options: ["Kolektor dan Emitor", "Gate dan Drain", "Anoda (+) dan Katoda (-)", "Basis dan Source"],
        correctAnswerIndex: 2
      },
      {
        question: "Dalam kondisi kelistrikan seperti apa sebuah dioda dapat meloloskan aliran listrik secara penuh?",
        options: [
          "Diberi tegangan bias mundur (reverse bias)",
          "Diberi tegangan bias maju (forward bias)",
          "Saat dioda dipasang terbalik dari arah sumber",
          "Ketika dioda tidak terhubung sama sekali ke baterai"
        ],
        correctAnswerIndex: 1
      },
      {
        question: "Jenis dioda semikonduktor khusus yang memancarkan energi cahaya monokromatik saat dialiri arus bias maju adalah...",
        options: ["Dioda Zener", "LED (Light Emitting Diode)", "Photodiode", "Dioda Varaktor"],
        correctAnswerIndex: 1
      },
      {
        question: "Apa keistimewaan utama Dioda Zener dibanding dioda penyearah standar biasa?",
        options: [
          "Mampu menghasilkan energi listrik mandiri",
          "Dirancang khusus untuk menghantarkan arus secara aman pada daerah breakdown tegangan bias mundur sebagai penyetabil tegangan",
          "Dapat berkedip-kedip otomatis",
          "Memiliki ukuran fisik yang jauh lebih raksasa"
        ],
        correctAnswerIndex: 1
      },
      {
        question: "Cincin warna perak atau garis putih pada bodi luar sebuah komponen dioda menandakan posisi kaki...",
        options: ["Anoda", "Katoda", "Basis", "Gland"],
        correctAnswerIndex: 1
      }
    ]
  }
];
