// ==========================================
// KONSTANTA MATEMATIKIN
// ==========================================
const PI = Math.PI;               // 3.141592653589793
const E = Math.E;                 // 2.718281828459045 (Bilangan Euler)
const PHI = (1 + Math.sqrt(5)) / 2; // 1.6180339887... (Golden Ratio / Rasio Emas)

const cekBulat = (n) => Number.isInteger(n);

const cekBilKuadrat = (n) => typeof n === 'number' && n >= 0 && cekBulat(Math.sqrt(n));

// Copyright (c) 2011 Alexei Kourbatov, www.JavaScripter.net 

// function FaktorTerkecil(n) returns:
// * the smallest prime that divides n
// * NaN if n is NaN or Infinity
// *  0  if n is 0
// *  1  if n=1, n=-1, or n is not an integer

const faktorPrimaTerkecil = (n) => {
    // 1. Validasi awal: tolak jika bukan angka atau bernilai tak terhingga (Infinity)
    if (typeof n !== 'number' || !Number.isFinite(n)) return NaN;

    // 2. Gunakan nilai absolut agar fungsi tetap bekerja untuk bilangan negatif (misal -49 menjadi 49)
    n = Math.abs(n);

    // 3. Tolak angka desimal, dan atur batasan untuk 0 dan 1
    if (!Number.isInteger(n) || n === 0) return 0;
    if (n === 1) return 1;

    // 4. Cek faktor prima dasar (2, 3, 5)
    if (n % 2 === 0) return 2;
    if (n % 3 === 0) return 3;
    if (n % 5 === 0) return 5;

    // 5. Wheel Factorization (Lompatan 30)
    const m = Math.sqrt(n);
    for (let i = 7; i <= m; i += 30) {
        if (n % i === 0) return i;
        if (n % (i + 4) === 0) return i + 4;
        if (n % (i + 6) === 0) return i + 6;
        if (n % (i + 10) === 0) return i + 10;
        if (n % (i + 12) === 0) return i + 12;
        if (n % (i + 16) === 0) return i + 16;
        if (n % (i + 22) === 0) return i + 22;
        if (n % (i + 24) === 0) return i + 24;
    }

    // 6. Jika tidak bisa dibagi apapun, maka angka tersebut adalah bilangan prima itu sendiri
    return n;
};



// function cekPrima(n) returns:
// - false if n is NaN or not a finite integer
// - true  if n is prime
// - false otherwise

const cekPrima = (n) => {
    // 1. Tolak otomatis jika bukan bilangan bulat, atau jika kurang dari 2
    if (!Number.isInteger(n) || n < 2) {
        return false;
    }

    // 2. Kembalikan hasil perbandingan (true jika sama, false jika beda)
    return n === faktorPrimaTerkecil(n);
};

// function faktorisasiPrima(n) returns:
// * a string containing the prime factorization of n
// * n.toString() if the factrization cannot be found

const faktorisasiPrima = (n) => {
    // 1. Validasi: tolak jika bukan bilangan bulat, atau jika nilainya 0, 1, atau -1
    if (!Number.isInteger(n) || n === 0 || Math.abs(n) === 1) {
        return n.toString();
    }

    // 2. Tangani bilangan negatif secara rekursif
    if (n < 0) {
        return `-${faktorisasiPrima(-n)}`;
    }

    // 3. Dapatkan faktor prima terkecil
    const minFactor = faktorPrimaTerkecil(n);

    // 4. Base case (Berhenti jika n adalah bilangan prima itu sendiri)
    if (n === minFactor) {
        return n.toString();
    }

    // 5. Rangkai string menggunakan Template Literals dan lanjutkan rekursi
    return `${minFactor}*${faktorisasiPrima(n / minFactor)}`;
};

// function primaBerikutnya(n) returns:
// * the smallest prime greater than n
// * NaN if this prime is not a representable integer

const primaBerikutnya = (n) => {
    // 1. Validasi tipe data dan pastikan nilainya terhingga
    if (typeof n !== 'number' || !Number.isFinite(n)) {
        return NaN;
    }

    // 2. Bilangan prima terkecil adalah 2
    if (n < 2) {
        return 2;
    }

    // 3. Bulatkan ke bawah untuk menangani input desimal (misal 2.5 menjadi 2)
    n = Math.floor(n);

    // 4. Tentukan titik mulai (selalu cari bilangan ganjil berikutnya)
    // Jika n=2 (genap) -> 2 + 0 + 1 = 3
    // Jika n=3 (ganjil) -> 3 + 1 + 1 = 5
    const nilaiAwal = n + (n % 2) + 1;

    // 5. Looping hanya mengecek bilangan ganjil sampai batas aman integer JavaScript
    for (let i = nilaiAwal; i <= Number.MAX_SAFE_INTEGER; i += 2) {
        if (cekPrima(i)) {
            return i;
        }
    }

    // 6. Mengembalikan NaN jika tidak ditemukan dalam batas aman
    return NaN;
};

/**
 * Menentukan anggota terkecil dari pasangan Bilangan Prima Kembar (Twin Primes) 
 * berikutnya yang bernilai lebih besar dari n.
 * * Pasangan prima kembar adalah dua bilangan prima yang memiliki selisih tepat 2 
 * (contoh: 3 & 5, 5 & 7, 11 & 13).
 * Algoritma ini menggunakan sifat matematis di mana semua bilangan prima 
 * (selain 2 dan 3) pasti terletak di sekitar kelipatan 6 (yaitu 6k - 1 dan 6k + 1).
 */
const primaKembarBerikutnya = (n) => {
    // 1. Validasi tipe data dan batas terhingga
    if (typeof n !== 'number' || !Number.isFinite(n)) {
        return NaN;
    }

    // 2. Tangani kasus dasar (Pasangan Prima Kembar terkecil adalah 3 & 5)
    // Jika n kurang dari 3, anggota kembar terkecil berikutnya adalah 3
    if (n < 3) return 3;
    // Jika n kurang dari 5, anggota kembar terkecil berikutnya adalah 5
    if (n < 5) return 5;

    // 3. Bulatkan nilai n ke bawah agar aman dari angka desimal
    n = Math.floor(n);

    // 4. Cari titik mulai pada kelipatan 6 terdekat
    const nilaiAwal = 6 * Math.ceil((n + 2) / 6);

    // 5. Looping dengan lompatan 6
    for (let i = nilaiAwal; i <= Number.MAX_SAFE_INTEGER; i += 6) {
        // Cek apakah angka sebelum (i-1) dan sesudah (i+1) kelipatan 6 adalah prima
        if (cekPrima(i - 1) && cekPrima(i + 1)) {
            return i - 1; // Mengembalikan anggota terkecil dari pasangan tersebut
        }
    }

    return NaN;
};

/**
 * Menentukan anggota pertama dari kelompok Bilangan Prima Kuadruplet 
 * (Prime Quadruplet) berikutnya yang bernilai lebih besar dari n.
 * * * Prima Kuadruplet adalah konstelasi empat bilangan prima berdekatan 
 * dengan jarak tetap yaitu {p, p+2, p+6, p+8}.
 * * Semua kuadruplet (kecuali yang dimulai dengan angka 5) secara matematis 
 * selalu berada pada posisi {30k+11, 30k+13, 30k+17, 30k+19}.
 */
const primaKuadrupletBerikutnya = (n) => {
    // 1. Validasi tipe data dan pastikan nilainya terhingga
    if (typeof n !== 'number' || !Number.isFinite(n)) {
        return NaN;
    }

    // 2. Tangani basis kasus untuk kuadruplet spesial pertama dan kedua
    // Kuadruplet terkecil di dunia matematika adalah {5, 7, 11, 13}
    if (n < 5) return 5;
    // Kuadruplet kedua adalah {11, 13, 17, 19}
    if (n < 11) return 11;

    // 3. Bulatkan ke bawah agar aman dari input desimal
    n = Math.floor(n);

    // 4. Hitung titik mulai kelipatan 30. 
    // Rumus ini memastikan i + 11 akan selalu lebih besar dari n
    const nilaiAwal = 30 * Math.ceil((n - 10) / 30);

    // 5. Looping pencarian dengan lompatan 30
    for (let i = nilaiAwal; i <= Number.MAX_SAFE_INTEGER; i += 30) {
        // Cek keempat titik kuadruplet. 
        // Karena fungsi cekPrima sudah menggunakan Wheel Factorization yang sangat cepat,
        // kita tidak perlu lagi menggunakan fungsi bantuan pscreen().
        if (
            cekPrima(i + 11) &&
            cekPrima(i + 13) &&
            cekPrima(i + 17) &&
            cekPrima(i + 19)
        ) {
            return i + 11; // Kembalikan angka pertama dari kuadruplet yang ditemukan
        }
    }

    // Mengembalikan NaN jika tidak ditemukan dalam batas komputasi JavaScript
    return NaN;
};

const faktorial = (n) => {
    // 1. Validasi yang sama kuatnya
    if (typeof n !== 'number' || !Number.isInteger(n) || n < 0) {
        return NaN;
    }

    if (n === 0 || n === 1) return 1;

    // 2. Gunakan perulangan (looping) alih-alih rekursi
    let hasil = 1;
    for (let i = 2; i <= n; i++) {
        hasil *= i;
    }

    return hasil;
};

const daftarFaktorPrima = (n) => {
    // 1. Validasi standar MATEMATIKIN
    if (typeof n !== 'number' || !Number.isInteger(n) || n < 1) {
        throw new Error("Input harus berupa bilangan bulat positif (>= 1)");
    }

    // 2. Siapkan array kosong untuk menampung hasil
    let hasil = [];

    // 3. Eksekusi pencarian berulang (looping)
    while (n !== 1) {
        // Panggil fungsi faktorPrimaTerkecil yang sudah kita buat sebelumnya
        let faktor = faktorPrimaTerkecil(n);

        // Masukkan faktor yang ditemukan ke dalam array
        hasil.push(faktor);

        // Bagi n dengan faktor tersebut untuk melanjutkan pencarian
        n /= faktor;
    }

    return hasil;
};

// ==========================================
// FUNGSI HELPER (Tidak dipanggil oleh user)
// ==========================================

const _fpbDuaAngka = (a, b) => {
    // Ubah ke nilai absolut untuk menangani angka negatif
    a = Math.abs(a);
    b = Math.abs(b);

    // Algoritma Euclidean super cepat
    while (b !== 0) {
        let sisa = a % b;
        a = b;
        b = sisa;
    }
    return a;
};

const _kpkDuaAngka = (a, b) => {
    // KPK yang melibatkan angka 0 selalu 0
    if (a === 0 || b === 0) return 0;

    // Rumus mutlak: (A x B) / FPB
    return Math.abs(a / _fpbDuaAngka(a, b) * b);
};


// ==========================================
// FUNGSI UTAMA MATEMATIKIN (Bisa diekspor)
// ==========================================

const fpb = (...angka) => {
    // Deteksi otomatis: apakah user memasukkan Array fpb([12,24]) 
    // atau parameter berjejer fpb(12, 24, 36)
    const deretAngka = Array.isArray(angka[0]) ? angka[0] : angka;

    // Cegah error jika input kosong
    if (deretAngka.length === 0) return NaN;

    // Validasi ketat: semua angka wajib bilangan bulat
    if (!deretAngka.every(n => typeof n === 'number' && Number.isInteger(n))) {
        throw new Error("MATEMATIKIN: Semua input FPB harus berupa bilangan bulat.");
    }

    // Terapkan reduce menggunakan helper
    return deretAngka.reduce((hasilSementara, n) => _fpbDuaAngka(hasilSementara, n));
};

const kpk = (...angka) => {
    const deretAngka = Array.isArray(angka[0]) ? angka[0] : angka;

    if (deretAngka.length === 0) return NaN;

    if (!deretAngka.every(n => typeof n === 'number' && Number.isInteger(n))) {
        throw new Error("MATEMATIKIN: Semua input KPK harus berupa bilangan bulat.");
    }

    return deretAngka.reduce((hasilSementara, n) => _kpkDuaAngka(hasilSementara, n));
};

const faktorKuadratTerbesar = (n) => {
    // 1. Validasi: Pastikan input adalah bilangan bulat positif yang valid
    if (typeof n !== 'number' || !Number.isInteger(n) || n < 1) {
        return NaN;
    }

    // 2. Tentukan titik mulai dari akar kuadrat tertinggi yang mungkin
    let k = Math.floor(Math.sqrt(n));

    // 3. Looping menurun untuk mencari faktor kuadrat terbesar pertama yang cocok
    while (k > 1) {
        // Menggunakan (k * k) jauh lebih cepat daripada Math.pow(k, 2)
        if (n % (k * k) === 0) {
            break; // Langsung berhenti begitu ditemukan
        }
        k--; // Kurangi nilai k jika belum membagi habis
    }

    // 4. Mengembalikan nilai akar dari faktor kuadrat tersebut (atau 1 jika tidak ada)
    return k;
};

const diskriminan = (a, b, c) => {
    // 1. Validasi: Pastikan semua input adalah angka (termasuk desimal, karena koefisien bisa berupa desimal)
    if (typeof a !== 'number' || typeof b !== 'number' || typeof c !== 'number') {
        return NaN;
    }

    // 2. Validasi nilai terhingga
    if (!Number.isFinite(a) || !Number.isFinite(b) || !Number.isFinite(c)) {
        return NaN;
    }

    // 3. Syarat mutlak persamaan kuadrat: 'a' tidak boleh 0
    if (a === 0) {
        throw new Error("MATEMATIKIN: Nilai koefisien 'a' tidak boleh 0 pada persamaan kuadrat.");
    }

    // 4. Eksekusi rumus D = b^2 - 4ac
    return (b * b) - (4 * a * c);
};

//memilih bilangan bulat dari 0 hingga n
const bilBulatAcak = (n) => {
    // 1. Validasi: Pastikan input adalah angka dan tidak bernilai negatif
    if (typeof n !== 'number' || !Number.isFinite(n) || n < 0) {
        return NaN;
    }

    // 2. Bulatkan n ke bawah untuk berjaga-jaga jika ada input desimal
    n = Math.floor(n);

    // 3. Kalikan dengan (n + 1) agar rentang acaknya mencakup angka n
    return Math.floor(Math.random() * (n + 1));
};

/**
 * Menghitung determinan dari sebuah matriks persegi (N x N)
 * Menggunakan metode Ekspansi Kofaktor sepanjang baris pertama
 */
const determinan = (matriks) => {
    // 1. Validasi: Pastikan input adalah array dan tidak kosong
    if (!Array.isArray(matriks) || matriks.length === 0) {
        throw new Error("MATEMATIKIN: Input harus berupa matriks (array 2D).");
    }

    const n = matriks.length;

    // 2. Validasi: Pastikan matriks berbentuk persegi (N x N)
    const isPersegi = matriks.every(baris => Array.isArray(baris) && baris.length === n);
    if (!isPersegi) {
        throw new Error("MATEMATIKIN: Matriks harus berbentuk persegi (jumlah baris = jumlah kolom).");
    }

    // 3. Basis Kasus (Base Cases) untuk menghentikan rekursi
    if (n === 1) {
        return matriks[0][0]; // Determinan matriks 1x1 adalah angkanya itu sendiri
    }
    if (n === 2) {
        // Rumus matriks 2x2: (ad - bc)
        return (matriks[0][0] * matriks[1][1]) - (matriks[0][1] * matriks[1][0]);
    }

    // 4. Ekspansi Kofaktor untuk matriks 3x3 ke atas
    let hasil = 0;

    // Kita selalu melakukan ekspansi sepanjang baris pertama (indeks 0)
    for (let i = 0; i < n; i++) {
        // Tentukan tanda: genap = positif, ganjil = negatif
        // Ini jauh lebih cepat daripada menggunakan Math.pow(-1, i)
        const tanda = (i % 2 === 0) ? 1 : -1;

        // Buat sub-matriks secara fungsional (Sangat Cepat & Hemat Memori)
        const subMatriks = matriks
            .slice(1) // Ambil semua baris di bawah baris pertama
            .map(baris => baris.filter((_, indeksKolom) => indeksKolom !== i)); // Hapus kolom ke-i

        // Eksekusi rekursi dan tambahkan ke total hasil
        hasil += tanda * matriks[0][i] * determinan(subMatriks);
    }

    return hasil;
};

/**
 * Menghasilkan Matriks Minor dari sebuah matriks persegi.
 * Setiap elemen pada posisi (i, j) digantikan oleh determinan sub-matriks
 * setelah baris ke-i dan kolom ke-j dihilangkan.
 */
const matriksMinor = (matriks) => {
    // 1. Validasi Matriks Persegi
    if (!Array.isArray(matriks) || matriks.length === 0) {
        throw new Error("MATEMATIKIN: Input harus berupa matriks (array 2D).");
    }
    const n = matriks.length;
    const isPersegi = matriks.every(baris => Array.isArray(baris) && baris.length === n);
    if (!isPersegi) {
        throw new Error("MATEMATIKIN: Matriks harus berbentuk persegi untuk mencari minor.");
    }

    // 2. Kasus Khusus Matriks 1x1
    // Secara definisi matematis standar, minor dari matriks 1x1 dianggap 1
    if (n === 1) {
        return [[1]];
    }

    // 3. Proses Pembentukan Matriks Minor
    // Menggunakan dua lapis .map() untuk iterasi baris (i) dan kolom (j)
    return matriks.map((baris, i) => {
        return baris.map((_, j) => {

            // a. Ciptakan sub-matriks (coret baris ke-i dan kolom ke-j)
            const subMatriks = matriks
                .filter((_, indeksBaris) => indeksBaris !== i) // Buang baris ke-i
                .map(b => b.filter((_, indeksKolom) => indeksKolom !== j)); // Buang kolom ke-j

            // b. Hitung determinan dari sub-matriks tersebut dan jadikan nilai elemen baru
            return determinan(subMatriks);
        });
    });
};

/**
 * Menghasilkan Matriks Kofaktor dari sebuah matriks persegi.
 * Merupakan hasil kali elemen Matriks Minor dengan pola tanda (-1)^(i+j).
 */
const matriksKofaktor = (matriks) => {
    // 1. Dapatkan matriks minor menggunakan fungsi yang sudah kita buat sebelumnya
    const minor = matriksMinor(matriks);

    // 2. Modifikasi setiap elemen dengan pola tanda (checkerboard pattern)
    return minor.map((baris, i) => {
        return baris.map((nilai, j) => {

            // Penentuan tanda: Jika jumlah indeks (i+j) genap = 1, jika ganjil = -1
            const tanda = ((i + j) % 2 === 0) ? 1 : -1;

            // Kalikan nilai minor dengan tanda
            let kofaktor = nilai * tanda + 0; // +0 untuk memastikan hasil tetap angka (bukan string)

            return kofaktor;
        });
    });
};

/**
 * Melakukan Transpose pada matriks (mengubah baris menjadi kolom dan sebaliknya).
 * Mendukung matriks persegi (N x N) maupun persegi panjang (M x N).
 */
const transpose = (matriks) => {
    // 1. Validasi: Pastikan input adalah matriks (array 2D) yang valid dan tidak kosong
    if (!Array.isArray(matriks) || matriks.length === 0 || !Array.isArray(matriks[0])) {
        throw new Error("MATEMATIKIN: Input harus berupa matriks (array 2D) yang tidak kosong.");
    }

    // 2. Proses Transpose dengan pendekatan fungsional
    // matriks[0].map(...) -> Iterasi berdasarkan jumlah kolom yang ada
    return matriks[0].map((_, indeksKolom) => {

        // matriks.map(...) -> Ambil nilai dari setiap baris pada posisi indeksKolom
        return matriks.map(baris => baris[indeksKolom]);

    });
};

/**
 * Menghasilkan Matriks Adjoin (Adjugate) dari sebuah matriks persegi.
 * Adjoin adalah transpose dari matriks kofaktor.
 */
const adjoin = (matriks) => {
    // 1. Validasi Input
    if (!Array.isArray(matriks) || matriks.length === 0) {
        throw new Error("MATEMATIKIN: Input harus berupa matriks yang valid.");
    }

    const n = matriks.length;

    // 2. Optimasi untuk Matriks 2x2 (Rumus Cepat)
    // Ini jauh lebih cepat daripada menghitung minor, kofaktor, lalu transpose.
    if (n === 2) {
        return [
            [matriks[1][1], -matriks[0][1]],
            [-matriks[1][0], matriks[0][0]]
        ];
    }

    // 3. Rumus Umum untuk Matriks 3x3 ke atas
    // Adjoin(A) = Transpose(Kofaktor(A))
    return transpose(matriksKofaktor(matriks));
};

/**
 * Melakukan operasi perkalian pada matriks.
 * Mendukung dua mode:
 * 1. Skalar x Matriks (a dikali M)
 * 2. Matriks x Matriks (A dikali B)
 */
const kaliMatriks = (pengali, matriks) => {
    // 1. MODE PERKALIAN SKALAR (Skalar x Matriks)
    if (typeof pengali === 'number') {
        if (!Array.isArray(matriks) || matriks.length === 0) {
            throw new Error("MATEMATIKIN: Parameter kedua harus berupa matriks.");
        }
        // Kalikan setiap elemen matriks dengan skalar menggunakan .map()
        return matriks.map(baris => baris.map(elemen => pengali * elemen));
    }

    // 2. MODE PERKALIAN MATRIKS (Matriks x Matriks)
    if (Array.isArray(pengali) && Array.isArray(matriks)) {
        const barisA = pengali.length;
        const kolomA = pengali[0].length;
        const barisB = matriks.length;
        const kolomB = matriks[0].length;

        // Validasi Syarat Mutlak Perkalian Matriks
        if (kolomA !== barisB) {
            throw new Error("MATEMATIKIN: Jumlah kolom matriks pertama harus sama dengan jumlah baris matriks kedua.");
        }

        // Proses Perkalian Matriks dengan gaya fungsional (Sangat Elegan)
        return pengali.map(baris =>
            // Iterasi sepanjang jumlah kolom matriks B
            matriks[0].map((_, j) =>
                // Kalkulasi Dot Product (Baris A x Kolom B)
                baris.reduce((total, elemenA, k) => total + (elemenA * matriks[k][j]), 0)
            )
        );
    }

    // Jika input tidak dikenali
    throw new Error("MATEMATIKIN: Tipe data pengali tidak valid (harus angka atau matriks).");
};

const invers = (matriks) => {
    const det = determinan(matriks);

    // Jika determinan adalah 0, matriks tidak memiliki invers (singular)
    if (det === 0) {
        throw new Error("MATEMATIKIN: Matriks tidak memiliki invers karena determinannya 0.");
    }

    const adj = adjoin(matriks);

    // Kalikan 1/det dengan setiap elemen di matriks Adjoin
    return adj.map(baris => baris.map(elemen => elemen / det));
};

//Bentuk matriks
/**
 * Mengubah array 2D matriks menjadi string kode LaTeX format pmatrix.
 * Sangat ideal untuk menjembatani output data dengan visualizer (seperti MathJax).
 */
const bentukMatriks = (matriks) => {
    // 1. Validasi: Pastikan input valid agar tidak error saat di-map
    if (!Array.isArray(matriks) || matriks.length === 0) return "";

    // 2. Eksekusi penggabungan string
    const isiLatex = matriks
        .map(baris => baris.join(' & ')) // Gabungkan tiap elemen baris dengan ' & '
        .join(' \\\\ ');                 // Gabungkan hasil tiap baris dengan ' \\ '

    // 3. Rangkai dengan template literal (backtick) standar
    return `\\begin{pmatrix} ${isiLatex} \\end{pmatrix}`;
};

/**
 * Menjumlahkan serangkaian angka.
 * Mendukung input berupa array ( misal: [1, 2, 3] ) 
 * maupun parameter berjejer ( misal: 1, 2, 3 ).
 */
const jumlah = (...angka) => {
    // 1. Deteksi apakah input berupa array atau angka berjejer
    const deretAngka = Array.isArray(angka[0]) ? angka[0] : angka;

    // 2. Kembalikan 0 jika tidak ada angka yang dimasukkan
    if (deretAngka.length === 0) return 0;

    // 3. Validasi ketat: Pastikan semua elemen adalah angka terhingga (bukan teks/NaN)
    if (!deretAngka.every(n => typeof n === 'number' && Number.isFinite(n))) {
        throw new Error("MATEMATIKIN: Semua elemen yang dijumlahkan harus berupa angka yang valid.");
    }

    // 4. Eksekusi penjumlahan dengan reduce dan nilai awal 0
    return deretAngka.reduce((akumulator, nilaiSaatIni) => akumulator + nilaiSaatIni, 0);
};

/**
 * Menghitung jumlah kuadrat dari serangkaian angka.
 * Mendukung input berupa array maupun parameter berjejer.
 */
const jumlahKuadrat = (...angka) => {
    // 1. Fleksibilitas input (mendukung array tunggal atau angka berjejer)
    const deretAngka = Array.isArray(angka[0]) ? angka[0] : angka;

    // 2. Kembalikan 0 jika tidak ada input
    if (deretAngka.length === 0) return 0;

    // 3. Validasi ketat untuk menghindari error komputasi
    if (!deretAngka.every(n => typeof n === 'number' && Number.isFinite(n))) {
        throw new Error("MATEMATIKIN: Semua elemen harus berupa angka yang valid.");
    }

    // 4. Eksekusi reduce yang benar: akumulator HANYA ditambah, nilaiSaatIni yang dikuadratkan
    return deretAngka.reduce((akumulator, nilaiSaatIni) => {
        return akumulator + (nilaiSaatIni * nilaiSaatIni);
    }, 0); // Nilai awal akumulator wajib 0
};

/**
 * Menghitung panjang (magnitudo) dari sebuah vektor n-dimensi.
 * Mendukung input array [x, y, z] maupun angka berjejer (x, y, z).
 */
const panjangVektor = (...vektor) => {
    // 1. Deteksi format input
    const elemenVektor = Array.isArray(vektor[0]) ? vektor[0] : vektor;

    // 2. Kembalikan 0 jika vektor kosong
    if (elemenVektor.length === 0) return 0;

    // 3. Eksekusi perhitungan menggunakan fungsi bawaan MATEMATIKIN
    return Math.sqrt(jumlahKuadrat(elemenVektor));
};

/**
 * Menghitung Perkalian Titik (Dot Product) dari dua vektor.
 * Mengembalikan sebuah nilai skalar (angka tunggal).
 */
const dotVektor = (vektor1, vektor2) => {
    // 1. Validasi Input: Pastikan keduanya adalah Array
    if (!Array.isArray(vektor1) || !Array.isArray(vektor2)) {
        throw new Error("MATEMATIKIN: Kedua input harus berupa array vektor.");
    }

    // 2. Validasi Syarat Mutlak: Dimensi (panjang) harus sama
    if (vektor1.length !== vektor2.length) {
        throw new Error("MATEMATIKIN: Operasi Dot Product gagal. Kedua vektor harus memiliki dimensi yang sama.");
    }

    // 3. Kembalikan 0 jika vektor kosong
    if (vektor1.length === 0) return 0;

    // 4. Eksekusi menggunakan reduce untuk gaya fungsional yang elegan
    return vektor1.reduce((total, nilaiSaatIni, indeks) => {
        // Kalikan elemen vektor1 dengan elemen vektor2 pada indeks yang sama
        return total + (nilaiSaatIni * vektor2[indeks]);
    }, 0);
};

/**
 * Menghitung Perkalian Silang (Cross Product) dari dua buah vektor 3D.
 * Mengembalikan array vektor baru yang tegak lurus terhadap kedua vektor input.
 */
const crossVektor = (vektor1, vektor2) => {
    // 1. Validasi Input: Pastikan keduanya adalah Array
    if (!Array.isArray(vektor1) || !Array.isArray(vektor2)) {
        throw new Error("MATEMATIKIN: Kedua input harus berupa array vektor.");
    }

    // 2. Validasi Syarat Mutlak: Harus Vektor 3D
    if (vektor1.length !== 3 || vektor2.length !== 3) {
        throw new Error("MATEMATIKIN: Operasi Cross Product hanya berlaku untuk vektor 3 dimensi (terdiri dari komponen x, y, z).");
    }

    // 3. Eksekusi Rumus Eksplisit (Sangat Cepat & Tanpa Looping)
    return [
        (vektor1[1] * vektor2[2]) - (vektor1[2] * vektor2[1]), // Komponen i (Sumbu X)
        (vektor1[2] * vektor2[0]) - (vektor1[0] * vektor2[2]), // Komponen j (Sumbu Y)
        (vektor1[0] * vektor2[1]) - (vektor1[1] * vektor2[0])  // Komponen k (Sumbu Z)
    ];
};

/**
 * Menghitung Proyeksi Vektor Ortogonal dari vektor asal ke vektor tujuan.
 * Mengembalikan array vektor baru.
 */
const proyeksiVektor = (vektorAsal, vektorTujuan) => {
    // 1. Validasi Input
    if (!Array.isArray(vektorAsal) || !Array.isArray(vektorTujuan)) {
        throw new Error("MATEMATIKIN: Input harus berupa array vektor.");
    }
    if (vektorAsal.length !== vektorTujuan.length) {
        throw new Error("MATEMATIKIN: Dimensi kedua vektor harus sama.");
    }

    // 2. Hitung kuadrat dari panjang vektor tujuan (Penyebut)
    // Menggunakan dotVektor(B, B) jauh lebih cepat dan presisi daripada Math.pow(panjang, 2)
    const penyebut = dotVektor(vektorTujuan, vektorTujuan);

    // 3. Validasi pembagian dengan nol
    // Jika vektor tujuan adalah vektor nol (0, 0, 0), proyeksi tidak terdefinisi
    if (penyebut === 0) {
        throw new Error("MATEMATIKIN: Vektor tujuan tidak boleh berupa vektor nol.");
    }

    // 4. Hitung konstanta skalar (Pembilang / Penyebut)
    const skalar = dotVektor(vektorAsal, vektorTujuan) / penyebut;

    // 5. Kalikan vektor tujuan dengan konstanta skalar menggunakan .map()
    return vektorTujuan.map(elemen => skalar * elemen);
};

/**
 * Menghitung Proyeksi Skalar Ortogonal (panjang proyeksi) dari vektor asal ke vektor tujuan.
 * Mengembalikan sebuah angka (skalar).
 */
const proyeksiSkalar = (vektorAsal, vektorTujuan) => {
    const panjangTujuan = panjangVektor(vektorTujuan);

    // Cegah pembagian dengan nol
    if (panjangTujuan === 0) {
        throw new Error("MATEMATIKIN: Vektor tujuan tidak boleh berupa vektor nol.");
    }

    // Langsung manfaatkan fungsi dotVektor yang sudah ada
    return dotVektor(vektorAsal, vektorTujuan) / panjangTujuan;
};

/**
 * Menghitung besar sudut yang dibentuk oleh dua vektor.
 * Mengembalikan hasil dalam satuan derajat (0 hingga 180).
 */
const sudutVektor = (vektor1, vektor2) => {
    const mag1 = panjangVektor(vektor1);
    const mag2 = panjangVektor(vektor2);

    if (mag1 === 0 || mag2 === 0) {
        throw new Error("MATEMATIKIN: Sudut tidak dapat dihitung jika ada vektor nol.");
    }

    // Hitung nilai cosinus
    const cosTheta = dotVektor(vektor1, vektor2) / (mag1 * mag2);

    // Keamanan ekstra: JavaScript terkadang menghasilkan angka seperti 1.0000000002 
    // akibat inakurasi floating-point, yang membuat Math.acos() menjadi NaN.
    // Kita batasi rentangnya murni dari -1 hingga 1.
    const cosAman = Math.max(-1, Math.min(1, cosTheta));

    // Cari sudut dalam radian, lalu konversi ke derajat
    const sudutRadian = Math.acos(cosAman);
    return (sudutRadian * 180) / Math.PI;
};

/**
 * Mencari Vektor Satuan dari sebuah vektor.
 * Mengembalikan array vektor baru dengan panjang 1.
 */
const vektorSatuan = (vektor) => {
    const elemenVektor = Array.isArray(vektor[0]) ? vektor[0] : vektor;
    const panjang = panjangVektor(elemenVektor);

    if (panjang === 0) {
        throw new Error("MATEMATIKIN: Vektor nol tidak memiliki vektor satuan.");
    }

    // Bagi setiap komponen vektor dengan panjang totalnya
    return elemenVektor.map(komponen => komponen / panjang);
};

/**
 * Menjumlahkan atau mengurangkan komponen dari dua vektor.
 * Parameter operasi menerima string: 'tambah' (default) atau 'kurang'.
 */
const aritmetikaVektor = (vektor1, vektor2, operasi = 'tambah') => {
    if (!Array.isArray(vektor1) || !Array.isArray(vektor2) || vektor1.length !== vektor2.length) {
        throw new Error("MATEMATIKIN: Input harus berupa array vektor dengan dimensi yang sama.");
    }

    return vektor1.map((komponen, indeks) => {
        return operasi === 'kurang'
            ? komponen - vektor2[indeks]
            : komponen + vektor2[indeks];
    });
};

/**
 * Menyederhanakan bentuk akar (sqrt(n)) menjadi bentuk a\sqrt{b}.
 * Mengembalikan string dalam format LaTeX.
 */
const sederhanakanAkar = (n) => {
    // 1. Validasi Input: Pastikan angka adalah bilangan bulat positif atau nol
    if (typeof n !== 'number' || !Number.isInteger(n) || n < 0) {
        throw new Error("MATEMATIKIN: Input harus berupa bilangan bulat positif atau nol.");
    }

    // Kasus khusus untuk angka 0
    if (n === 0) return "0";

    // 2. Panggil fungsi yang sudah kita buat sebelumnya!
    const a = faktorKuadratTerbesar(n);
    const b = n / (a * a);

    // 3. Format output LaTeX secara langsung

    // Basis Kasus 1: Kuadrat Sempurna (contoh: akar 36 -> "6")
    if (b === 1) {
        return `${a}`;
    }

    // Basis Kasus 2: Tidak bisa disederhanakan (contoh: akar 7 -> "\sqrt{7}")
    if (a === 1) {
        return `\\sqrt{${n}}`;
    }

    // Basis Kasus 3: Bisa disederhanakan (contoh: akar 12 -> "2\sqrt{3}")
    return `${a}\\sqrt{${b}}`;
};

/**
 * Menghasilkan bilangan bulat acak di antara dua nilai (inklusif).
 * Sangat berguna untuk menghasilkan angka soal yang bervariasi.
 */
const acakAntara = (min = 0, max = 1) => {
    // 1. Validasi: Pastikan kedua input adalah angka
    if (typeof min !== 'number' || typeof max !== 'number') {
        throw new Error("MATEMATIKIN: Batas minimum dan maksimum harus berupa angka.");
    }

    // 2. Bulatkan ke bawah untuk berjaga-jaga jika ada input desimal
    min = Math.floor(min);
    max = Math.floor(max);

    // 3. Keamanan Ekstra (Auto-Swap): 
    // Jika pengguna memasukkan posisi terbalik (misal max, min), 
    // fungsi Math.min dan Math.max akan otomatis mengaturnya ke posisi yang benar.
    const batasBawah = Math.min(min, max);
    const batasAtas = Math.max(min, max);

    // 4. Eksekusi pengacakan (inklusif: menyertakan batas bawah dan batas atas)
    return Math.floor(Math.random() * (batasAtas - batasBawah + 1)) + batasBawah;
};

/**
 * Memberikan tanda positif atau negatif secara acak pada sebuah angka.
 * Jika tidak ada angka yang dimasukkan, secara default akan mengembalikan 1 atau -1.
 * Sangat berguna untuk generator soal variabel/aljabar acak.
 */
const acakTanda = (n = 1) => {
    // 1. Validasi Input: Pastikan n adalah angka
    if (typeof n !== 'number' || !Number.isFinite(n)) {
        throw new Error("MATEMATIKIN: Input harus berupa angka.");
    }

    // 2. Logika Probabilitas 50/50 (Sangat Cepat!)
    // Math.random() menghasilkan desimal antara 0 hingga 0.99...
    // Peluang angkanya di bawah 0.5 adalah persis 50%.
    return Math.random() < 0.5 ? n : -n;
};

/**
 * Menyederhanakan pecahan dan mengonversinya menjadi format LaTeX \dfrac.
 * Otomatis menangani penempatan tanda negatif yang proporsional.
 */
const pecahan = (pembilang, penyebut) => {
    // 1. Validasi Input: Pastikan keduanya adalah bilangan bulat
    if (!Number.isInteger(pembilang) || !Number.isInteger(penyebut)) {
        throw new Error("MATEMATIKIN: Pembilang dan penyebut harus berupa bilangan bulat.");
    }

    // 2. Cegah Pembagian dengan Nol
    if (penyebut === 0) {
        throw new Error("MATEMATIKIN: Penyebut pecahan tidak boleh bernilai nol.");
    }

    // 3. Kasus Khusus: Jika pembilang 0, langsung kembalikan string "0"
    if (pembilang === 0) return "0";

    // 4. Deteksi Tanda Negatif 
    // Jika hanya salah satu yang negatif, maka pecahan tersebut bernilai negatif
    const apakahNegatif = (pembilang < 0) !== (penyebut < 0);

    // 5. Gunakan nilai absolut murni untuk proses penyederhanaan
    const absPem = Math.abs(pembilang);
    const absPen = Math.abs(penyebut);

    // Panggil fungsi FPB yang sudah kita asah kecepatannya sebelumnya
    const faktor = fpb(absPem, absPen);

    // 6. Sederhanakan angka
    const pemSederhana = absPem / faktor;
    const penSederhana = absPen / faktor;

    // 7. Siapkan tanda minus untuk ditempelkan di depan pecahan (bukan di dalam)
    const tanda = apakahNegatif ? "-" : "";

    // 8. Output Final
    // Jika penyebutnya 1 (berarti bilangan bulat utuh), tidak perlu format dfrac
    if (penSederhana === 1) {
        return `${tanda}${pemSederhana}`;
    }

    // Kembalikan format LaTeX yang sudah bersih dan terstandarisasi
    return `${tanda}\\dfrac{${pemSederhana}}{${penSederhana}}`;
};

/**
 * Memformat angka koefisien aljabar agar sesuai standar penulisan matematika.
 * Mengubah 1 menjadi kosong (""), dan -1 menjadi tanda minus murni ("-").
 * Selalu mengembalikan tipe data String.
 */
const koefisien = (n = 0) => {
    // 1. Validasi: Pastikan input adalah angka
    if (typeof n !== 'number' || !Number.isFinite(n)) {
        throw new Error("MATEMATIKIN: Input koefisien harus berupa angka.");
    }

    // 2. Format standar aljabar
    if (n === 1) {
        return "";
    }

    if (n === -1) {
        // Menggunakan tanda strip standar untuk kompatibilitas LaTeX/MathJax
        return "-";
    }

    // 3. Pastikan angka selain 1 dan -1 dikembalikan sebagai String
    return String(n);
};

/**
 * Memformat suku konstanta (angka tanpa variabel) di ujung persamaan.
 * Pengganti dari fungsi tanda1() dan tanda4().
 */
const formatKonstanta = (n = 0) => {
    // Validasi dan hilangkan jika n adalah 0
    if (typeof n !== 'number' || !Number.isFinite(n) || n === 0) return "";

    // Jika negatif, otomatis membawa tanda '-'. Jika positif, tambahkan '+'
    return n < 0 ? `${n}` : `+${n}`;
};

/**
 * Memformat koefisien untuk suku lanjutan (yang menempel pada variabel).
 * Pengganti dari fungsi tanda2().
 */
const formatSuku = (n = 0) => {
    // Validasi dan hilangkan seluruh suku jika n adalah 0
    if (typeof n !== 'number' || !Number.isFinite(n) || n === 0) return "";

    // Kasus khusus koefisien 1 dan -1 (angka 1 disembunyikan)
    if (n === 1) return "+ ";
    if (n === -1) return "- ";

    // Selain itu, cetak tanda dan angkanya secara proporsional
    return n < 0 ? `- ${Math.abs(n)}` : `+ ${n}`;
};

/**
 * Menghasilkan deret angka (array) dari batas minimum hingga maksimum.
 * Secara otomatis membuang angka 0 dari dalam deret.
 * Sangat cocok sebagai bank angka koefisien variabel.
 */
const deretTanpaNol = (min = -9, max = 9) => {
    // 1. Validasi Input
    if (typeof min !== 'number' || typeof max !== 'number') {
        throw new Error("MATEMATIKIN: Batas minimum dan maksimum harus berupa angka.");
    }

    // 2. Pastikan batas bawah dan atas tidak terbalik
    const batasBawah = Math.min(min, max);
    const batasAtas = Math.max(min, max);

    // 3. Generate deret angka menggunakan Array.from, lalu buang nilai 0 dengan filter
    return Array.from(
        { length: batasAtas - batasBawah + 1 },
        (_, i) => batasBawah + i
    ).filter(angka => angka !== 0);
};

/**
 * Membungkus angka negatif dengan tanda kurung. Sangat penting untuk 
 * menampilkan operasi substitusi aljabar agar tidak ambigu.
 * Selalu mengembalikan tipe data String.
 */
const kurungNegatif = (angka = 0) => {
    // Validasi input
    if (typeof angka !== 'number' || !Number.isFinite(angka)) return "";

    // Jika negatif, bungkus dengan kurung. Jika positif/nol, ubah ke teks biasa.
    return angka < 0 ? `(${angka})` : String(angka);
};

/**
 * Menghasilkan tanda minus "-" atau kosong "" dengan probabilitas 50:50.
 * Sangat ideal untuk mengacak tanda pada suku paling depan dari sebuah polinomial.
 */
const acakMinus = () => {
    // Manfaatkan fungsi acakTanda() yang sudah kita buat sebelumnya
    // Jika acakTanda() menghasilkan -1, kembalikan "-", jika tidak kosong ""
    return acakTanda() === -1 ? "-" : "";
};

/**
 * Menghasilkan array berisi deret bilangan bulat berurutan.
 * Otomatis menangani posisi batas bawah dan atas yang terbalik.
 */
const deretBilBul = (batasBawah = 0, batasAtas = 1) => {
    // 1. Validasi Input: Pastikan keduanya adalah bilangan bulat
    if (!Number.isInteger(batasBawah) || !Number.isInteger(batasAtas)) {
        throw new Error("MATEMATIKIN: Batas bawah dan atas harus berupa bilangan bulat.");
    }

    // 2. Keamanan Ekstra (Auto-Swap)
    // Jika input terbalik (misal batasBawah 10, batasAtas 5), fungsi ini 
    // otomatis mengurutkannya menjadi rentang 5 hingga 10.
    const min = Math.min(batasBawah, batasAtas);
    const max = Math.max(batasBawah, batasAtas);

    // 3. Eksekusi fungsional satu baris dengan Array.from
    return Array.from({ length: max - min + 1 }, (_, i) => min + i);
};

/**
 * 1. MESIN UTAMA: Mengacak urutan array dengan algoritma Fisher-Yates murni.
 * Menggunakan pendekatan Imutabel (mengembalikan array baru tanpa merusak array asli).
 */
const acakArray = (arr) => {
    if (!Array.isArray(arr)) throw new Error("MATEMATIKIN: Input harus berupa array.");

    // Gandakan array agar array soal/data asli siswa tidak ikut rusak
    const salinan = [...arr];

    for (let i = salinan.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [salinan[i], salinan[j]] = [salinan[j], salinan[i]];
    }
    return salinan;
};

/**
 * 2. Memilih sebagian elemen, lalu POSISINYA DIACAK.
 * Sangat aman meskipun di dalam array ada nilai kembar/duplikat.
 */
const pilihAcak = (arr, num = 1) => {
    if (!Array.isArray(arr) || num <= 0) return [];

    // Langsung acak seluruh elemen, lalu potong (slice) sebanyak yang diminta
    return acakArray(arr).slice(0, num);
};

/**
 * 3. Memilih sebagian elemen, dengan urutan TETAP TERJAGA seperti aslinya.
 */
const pilihSebagian = (arr, num = 1) => {
    if (!Array.isArray(arr) || num <= 0) return [];
    if (num >= arr.length) return [...arr];

    // Buat deret indeks (0, 1, ..., n), acak indeksnya, potong sebanyak num
    const semuaIndeks = Array.from({ length: arr.length }, (_, i) => i);
    const indeksTerpilih = acakArray(semuaIndeks).slice(0, num);

    // Urutkan kembali indeks yang terpilih dari kecil ke besar
    indeksTerpilih.sort((a, b) => a - b);

    // Tarik nilai asli berdasarkan indeks yang sudah berurutan
    return indeksTerpilih.map(indeks => arr[indeks]);
};

/**
 * 4. DERANGEMENT: Mengacak total sehingga TIDAK ADA elemen di posisi awalnya.
 * Dilengkapi "Sabuk Pengaman" agar browser tidak crash jika kondisinya mustahil.
 */
const acakDerangement = (arr) => {
    if (!Array.isArray(arr) || arr.length < 2) {
        throw new Error("MATEMATIKIN: Derangement butuh minimal 2 elemen.");
    }

    // Cek kemustahilan: Jika semua elemen nilainya sama persis
    if (arr.every(val => val === arr[0])) {
        throw new Error("MATEMATIKIN: Derangement mustahil untuk elemen yang identik semua.");
    }

    let batasLooping = 0;
    const batasMaksimal = 1000; // Mencegah Infinite Loop

    while (batasLooping < batasMaksimal) {
        let hasilAcak = acakArray(arr);

        // Pengecekan sukses: pastikan tidak ada yang posisinya sama dengan array awal
        if (hasilAcak.every((val, i) => val !== arr[i])) {
            return hasilAcak;
        }
        batasLooping++;
    }

    throw new Error("MATEMATIKIN: Gagal menemukan kombinasi acak total. Formasi array mungkin tidak mendukung.");
};



/**
 * Helper internal untuk menetralisir anomali floating-point JavaScript.
 * Membulatkan angka ke 10 angka di belakang koma.
 */
const _presisiTrigo = (nilai) => {
    return Math.round(nilai * 1e10) / 1e10;
};

/**
 * Menghitung nilai Sinus dari sudut dalam satuan derajat.
 */
const sin = (derajat = 0) => {
    if (typeof derajat !== 'number' || !Number.isFinite(derajat)) throw new Error("MATEMATIKIN: Sudut harus berupa angka.");
    return _presisiTrigo(Math.sin(derajat * Math.PI / 180));
};

/**
 * Menghitung nilai Cosinus dari sudut dalam satuan derajat.
 */
const cos = (derajat = 0) => {
    if (typeof derajat !== 'number' || !Number.isFinite(derajat)) throw new Error("MATEMATIKIN: Sudut harus berupa angka.");
    return _presisiTrigo(Math.cos(derajat * Math.PI / 180));
};

/**
 * Menghitung nilai Tangen dari sudut dalam satuan derajat.
 * Dilengkapi pengaman untuk sudut yang tidak terdefinisi (90, 270, dst).
 */
const tan = (derajat = 0) => {
    if (typeof derajat !== 'number' || !Number.isFinite(derajat)) throw new Error("MATEMATIKIN: Sudut harus berupa angka.");

    // Syarat mutlak Tangen: sudut tidak boleh kelipatan ganjil dari 90 derajat
    // (misal 90, 270, -90, 450)
    if (Math.abs(derajat % 180) === 90) {
        throw new Error(`MATEMATIKIN: Nilai Tangen untuk sudut ${derajat} derajat tidak terdefinisi (Infinity).`);
    }

    return _presisiTrigo(Math.tan(derajat * Math.PI / 180));
};
/**
 * Menghitung Cosecan (1 / sin).
 * Tidak terdefinisi pada kelipatan 180 derajat (0, 180, 360, dst).
 */
const csc = (derajat = 0) => {
    if (typeof derajat !== 'number') throw new Error("MATEMATIKIN: Sudut harus berupa angka.");
    if (derajat % 180 === 0) {
        throw new Error(`MATEMATIKIN: Cosecan untuk sudut ${derajat} derajat tidak terdefinisi (Infinity).`);
    }
    return _presisiTrigo(1 / Math.sin(derajat * Math.PI / 180));
};

/**
 * Menghitung Secan (1 / cos).
 * Tidak terdefinisi pada sudut ganjil kelipatan 90 derajat (90, 270, dst).
 */
const sec = (derajat = 0) => {
    if (typeof derajat !== 'number') throw new Error("MATEMATIKIN: Sudut harus berupa angka.");
    if (Math.abs(derajat % 180) === 90) {
        throw new Error(`MATEMATIKIN: Secan untuk sudut ${derajat} derajat tidak terdefinisi (Infinity).`);
    }
    return _presisiTrigo(1 / Math.cos(derajat * Math.PI / 180));
};

/**
 * Menghitung Cotangen (cos / sin).
 * Tidak terdefinisi pada kelipatan 180 derajat (0, 180, 360, dst).
 */
const ctg = (derajat = 0) => {
    if (typeof derajat !== 'number') throw new Error("MATEMATIKIN: Sudut harus berupa angka.");
    if (derajat % 180 === 0) {
        throw new Error(`MATEMATIKIN: Cotangen untuk sudut ${derajat} derajat tidak terdefinisi (Infinity).`);
    }
    // Rasio cos/sin lebih kebal error dibandingkan 1/tan
    const rad = derajat * Math.PI / 180;
    return _presisiTrigo(Math.cos(rad) / Math.sin(rad));
};
/**
 * Menghitung Arcsinus (mencari sudut dari nilai Sinus).
 * Input wajib berada di antara -1 hingga 1.
 */
const arcsin = (nilai) => {
    if (typeof nilai !== 'number') throw new Error("MATEMATIKIN: Input harus berupa angka.");
    if (nilai < -1 || nilai > 1) {
        throw new Error("MATEMATIKIN: Domain Arcsin (nilai sinus) harus berada di rentang -1 hingga 1.");
    }
    // Math.asin menghasilkan radian, kita kalikan (180 / PI) untuk menjadi derajat
    return _presisiTrigo(Math.asin(nilai) * 180 / Math.PI);
};

/**
 * Menghitung Arccosinus (mencari sudut dari nilai Cosinus).
 * Input wajib berada di antara -1 hingga 1.
 */
const arccos = (nilai) => {
    if (typeof nilai !== 'number') throw new Error("MATEMATIKIN: Input harus berupa angka.");
    if (nilai < -1 || nilai > 1) {
        throw new Error("MATEMATIKIN: Domain Arccos (nilai cosinus) harus berada di rentang -1 hingga 1.");
    }
    return _presisiTrigo(Math.acos(nilai) * 180 / Math.PI);
};

/**
 * Menghitung Arctangen (mencari sudut dari nilai Tangen).
 * Bisa menerima angka berapapun (dari negatif tak hingga sampai tak hingga).
 */
const arctan = (nilai) => {
    if (typeof nilai !== 'number') throw new Error("MATEMATIKIN: Input harus berupa angka.");
    return _presisiTrigo(Math.atan(nilai) * 180 / Math.PI);
};

//membuat tabel dari array
const buattabelsoal = (arr = [], tempattabel = "", opsi = {}) => {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
        throw new Error("MATEMATIKIN: buattabelsoal hanya dapat berjalan di lingkungan Browser.");
    }
    if (typeof QRCode === 'undefined') {
         throw new Error("MATEMATIKIN: Library QRCode.js tidak ditemukan.");
    }
    if (!Array.isArray(arr) || arr.length === 0) {
        throw new Error("MATEMATIKIN: Array soal tidak boleh kosong.");
    }
    if (!document.getElementById(tempattabel)) {
        throw new Error(`MATEMATIKIN: Elemen dengan id '${tempattabel}' tidak ditemukan.`);
    }
    let teks = String.raw`<table class='w3-table-all tengah'>
        <thead>
            <th>NO</th><th>SOAL</th><th>SOLUSI</th>
        </thead>
        <tbody>`;
    for (let i = 0; i < arr.length; i++) {
        teks += String.raw`<tr><td class="w3-deep-orange" style="font-size: 40px; text-align: left">${i + 1}</td><td style="text-align: justify">${arr[i][0]}</td><td><div id="qrc${i}"></div><div style="text-align: center">${arr[i][1]}</div></td></tr>`;
    };
    teks += String.raw`</tbody></table>`;
    document.getElementById(tempattabel).innerHTML = teks;
    let lebarqr = opsi.lebarqr || 100;
    let tinggiqr = opsi.tinggiqr || 100;
    let warnaqr = opsi.warnaqr || "#000000";
    let qrkode = [];
    for (let i = 0; i < arr.length; i++) {
        qrkode[i] = new QRCode("qrc" + i, {
            text: String.raw`https://n9.cl/${arr[i][1]}`,
            width: lebarqr,
            height: tinggiqr,
            colorDark: warnaqr,
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });
    }
}

/**
 * Membuat array dengan formasi "Bukit" (Menaik sampai tengah, lalu menurun).
 * Total dari seluruh elemen dijamin sama persis dengan parameter 'jumlah'.
 */
const arrayBukit = (banyakBilangan, jumlah) => {
    // 1. Validasi Input Mutlak
    if (!Number.isInteger(banyakBilangan) || !Number.isInteger(jumlah)) {
        throw new Error("MATEMATIKIN: banyakBilangan dan jumlah harus berupa bilangan bulat.");
    }
    if (banyakBilangan <= 0 || jumlah <= 0) {
        throw new Error("MATEMATIKIN: banyakBilangan dan jumlah harus lebih dari 0.");
    }
    if (jumlah < banyakBilangan) {
        throw new Error("MATEMATIKIN: 'jumlah' minimal harus sama dengan 'banyakBilangan' agar tidak ada angka 0/negatif.");
    }

    // 2. Distribusi dasar yang aman (menjaga total tetap akurat)
    let arr = Array(banyakBilangan).fill(Math.floor(jumlah / banyakBilangan));
    let sisa = jumlah % banyakBilangan;

    // 3. Sebarkan sisa pembagian secara acak
    while (sisa > 0) {
        arr[Math.floor(Math.random() * banyakBilangan)]++;
        sisa--;
    }

    // 4. Berikan sedikit variasi acak agar angkanya tidak monoton 
    // (Bongkar-pasang nilai antar elemen agar totalnya TETAP SAMA)
    for (let i = 0; i < banyakBilangan; i++) {
        let idx1 = Math.floor(Math.random() * banyakBilangan);
        let idx2 = Math.floor(Math.random() * banyakBilangan);
        // Pindahkan nilai 1 poin dari idx1 ke idx2 (syarat idx1 > 1 agar tidak jadi 0)
        if (arr[idx1] > 1 && idx1 !== idx2) {
            arr[idx1]--;
            arr[idx2]++;
        }
    }

    // 5. Tahap Formasi Bukit: Urutkan array dari yang terkecil ke terbesar
    arr.sort((a, b) => a - b);

    // 6. Gunakan teknik Two Pointers untuk menyusun formasi Naik-Turun
    let hasil = new Array(banyakBilangan);
    let kiri = 0;                     // Penunjuk indeks dari kiri
    let kanan = banyakBilangan - 1;   // Penunjuk indeks dari kanan

    for (let i = 0; i < banyakBilangan; i++) {
        // Angka secara bergiliran diletakkan di sisi kiri, lalu di sisi kanan
        if (i % 2 === 0) {
            hasil[kiri] = arr[i];
            kiri++;
        } else {
            hasil[kanan] = arr[i];
            kanan--;
        }
    }

    return hasil;
};

/**
 * Membuat array dengan formasi "Lembah" (Menurun sampai tengah, lalu menaik).
 * Total dari seluruh elemen dijamin sama persis dengan parameter 'jumlah'.
 */
const arrayLembah = (banyakBilangan, jumlah) => {
    // 1. Validasi Input Mutlak
    if (!Number.isInteger(banyakBilangan) || !Number.isInteger(jumlah)) {
        throw new Error("MATEMATIKIN: banyakBilangan dan jumlah harus berupa bilangan bulat.");
    }
    if (banyakBilangan <= 0 || jumlah <= 0) {
        throw new Error("MATEMATIKIN: banyakBilangan dan jumlah harus lebih dari 0.");
    }
    if (jumlah < banyakBilangan) {
        throw new Error("MATEMATIKIN: 'jumlah' minimal harus sama dengan 'banyakBilangan'.");
    }

    // 2. Distribusi dasar yang aman
    let arr = Array(banyakBilangan).fill(Math.floor(jumlah / banyakBilangan));
    let sisa = jumlah % banyakBilangan;

    while (sisa > 0) {
        arr[Math.floor(Math.random() * banyakBilangan)]++;
        sisa--;
    }

    // 3. Variasi acak agar tidak monoton
    for (let i = 0; i < banyakBilangan; i++) {
        let idx1 = Math.floor(Math.random() * banyakBilangan);
        let idx2 = Math.floor(Math.random() * banyakBilangan);
        if (arr[idx1] > 1 && idx1 !== idx2) {
            arr[idx1]--;
            arr[idx2]++;
        }
    }

    // 4. PERUBAHAN KUNCI: Urutkan array dari Terbesar ke Terkecil (Descending)
    arr.sort((a, b) => b - a);

    // 5. Teknik Two Pointers untuk menyusun formasi Lembah
    let hasil = new Array(banyakBilangan);
    let kiri = 0;
    let kanan = banyakBilangan - 1;

    for (let i = 0; i < banyakBilangan; i++) {
        if (i % 2 === 0) {
            hasil[kiri] = arr[i];
            kiri++;
        } else {
            hasil[kanan] = arr[i];
            kanan--;
        }
    }

    return hasil;
};

/**
 * Memformat angka menjadi standar ribuan dan desimal Indonesia.
 * Otomatis menggunakan titik (.) untuk ribuan dan koma (,) untuk desimal.
 */
const formatRibuan = (angka = 0) => {
    // 1. Validasi Input Mutlak
    if (typeof angka !== 'number' || !Number.isFinite(angka)) {
        throw new Error("MATEMATIKIN: Input harus berupa angka yang valid.");
    }

    // 2. Eksekusi format lokalisasi Indonesia ('id-ID')
    return angka.toLocaleString('id-ID');
};

// ==========================================
// PEMBANTU FORMAT TITIK (INTERNAL)
// Semua fungsi bertitik menerima dua format:
//   - Array  : [x, y] atau [x, y, z]
//   - Objek  : {x: ..., y: ...} atau {x: ..., y: ..., z: ...}
// Hasil berupa titik akan dikembalikan dalam format yang sama dengan input.
// ==========================================
const _adalahTitikObjek = (t) =>
    t !== null && typeof t === 'object' && !Array.isArray(t) && 'x' in t && 'y' in t;

const _adalahTitik = (t) => Array.isArray(t) || _adalahTitikObjek(t);

// Mengubah titik (array/objek) menjadi array koordinat
const _keArrayTitik = (t) => {
    if (Array.isArray(t)) return t;
    if (_adalahTitikObjek(t)) {
        return t.z !== undefined ? [t.x, t.y, t.z] : [t.x, t.y];
    }
    throw new Error("MATEMATIKIN: Titik harus berupa array [x, y] atau objek {x, y}.");
};

// Mengubah array koordinat kembali ke format asal (objek jika input berupa objek)
const _keFormatTitik = (koordinat, titikAsal) => {
    if (!_adalahTitikObjek(titikAsal)) return koordinat;
    const [x, y, z] = koordinat;
    return koordinat.length > 2 ? { x, y, z } : { x, y };
};

// Mengambil dua titik dari dua parameter, atau dari satu pasangan [titik1, titik2]
const _ambilDuaTitik = (titik1, titik2) => {
    if (
        titik2 === undefined &&
        Array.isArray(titik1) && titik1.length === 2 &&
        _adalahTitik(titik1[0]) && _adalahTitik(titik1[1])
    ) {
        [titik1, titik2] = titik1;
    }
    return [_keArrayTitik(titik1), _keArrayTitik(titik2)];
};

// Mengubah garis (pasangan dua titik) menjadi [[x1, y1], [x2, y2]]
const _keArrayGaris = (garis) => {
    if (!Array.isArray(garis) || garis.length !== 2) {
        throw new Error("MATEMATIKIN: Garis harus berupa pasangan dua titik.");
    }
    return garis.map(_keArrayTitik);
};

/**
* Menghitung panjang garis (jarak) antara dua titik koordinat.
* Mendukung geometri 2D, 3D, hingga n-dimensi secara otomatis.
* Titik boleh berupa [x, y] atau {x, y}.
*/
const panjangGaris = (titik1, titik2) => {
    // 1. Fleksibilitas Input:
    // Mendukung dua parameter, atau satu pasangan [[x1, y1], [x2, y2]] / [{x, y}, {x, y}]
    [titik1, titik2] = _ambilDuaTitik(titik1, titik2);

    // 2. Validasi Syarat Mutlak: Kedua titik harus memiliki dimensi yang sama
    if (titik1.length !== titik2.length) {
        throw new Error("MATEMATIKIN: Input harus berupa dua koordinat titik dengan dimensi yang sama.");
    }

    // 3. Cari selisih jarak pada masing-masing sumbu (dx, dy, dz, dst.)
    const selisihSumbu = titik1.map((koordinat, indeks) => koordinat - titik2[indeks]);

    // 4. Eksekusi dengan Math.hypot (Menghitung akar dari jumlah kuadrat secara instan)
    // Operator spread (...) akan mengeluarkan isi array menjadi argumen individual
    return Math.hypot(...selisihSumbu);
};

/**
 * Menghitung titik potong antara dua buah garis.
 * Menggunakan metode Determinan untuk menghindari jebakan garis vertikal (Infinity).
 * Setiap garis adalah pasangan dua titik; titik boleh berupa [x, y] atau {x, y}.
 * Mengembalikan titik potong dalam format yang sama dengan titik pertama garis1.
 */
const titikPotong = (garis1, garis2) => {
    // 1. Destrukturisasi Array (Membuat variabel lebih rapi tanpa [0][1] yang membingungkan)
    const [[x1, y1], [x2, y2]] = _keArrayGaris(garis1);
    const [[x3, y3], [x4, y4]] = _keArrayGaris(garis2);

    // 2. Hitung Penyebut (Determinan Utama)
    const penyebut = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

    // 3. Validasi Mutlak: Garis Sejajar atau Berimpit
    // Jika penyebut 0, kedua garis berjalan sejajar dan tidak akan pernah berpotongan
    if (penyebut === 0) {
        throw new Error("MATEMATIKIN: Garis sejajar atau berimpit, tidak memiliki titik potong.");
    }

    // 4. Kalkulasi Pembilang
    const t1 = (x1 * y2) - (y1 * x2);
    const t2 = (x3 * y4) - (y3 * x4);

    // 5. Eksekusi Hasil Akhir
    const xPotong = (t1 * (x3 - x4) - (x1 - x2) * t2) / penyebut;
    const yPotong = (t1 * (y3 - y4) - (y1 - y2) * t2) / penyebut;

    return _keFormatTitik([xPotong, yPotong], garis1[0]);
};

/**
 * Mencari koordinat titik yang membagi garis dari titik1 ke titik2 dengan perbandingan m : n.
 * Secara otomatis mendukung koordinat 2D, 3D, hingga n-dimensi.
 * Titik boleh berupa [x, y] atau {x, y}; hasil mengikuti format titik1.
 */
const titikBagiGaris = (titik1, titik2, m = 1, n = 1) => {
    // 1. Normalisasi format titik (array/objek) menjadi array koordinat
    const koordinat1 = _keArrayTitik(titik1);
    const koordinat2 = _keArrayTitik(titik2);

    // 2. Validasi Mutlak: Memastikan dimensi (panjang array) kedua titik sama
    if (koordinat1.length !== koordinat2.length) {
        throw new Error("MATEMATIKIN: Input harus berupa koordinat dengan dimensi yang sama.");
    }

    // 3. Proteksi Matematika: Mencegah pembagian dengan nol
    if (m + n === 0) {
        throw new Error("MATEMATIKIN: Jumlah rasio perbandingan (m + n) tidak boleh bernilai nol.");
    }

    // 4. Eksekusi fungsional untuk seluruh sumbu (X, Y, Z, dst)
    // Rumus Baku: (m * X2 + n * X1) / (m + n)
    const hasil = koordinat1.map((nilai1, indeks) => {
        return (m * koordinat2[indeks] + n * nilai1) / (m + n);
    });

    return _keFormatTitik(hasil, titik1);
};

/**
 * Mencari titik tengah di antara dua koordinat.
 * Titik boleh berupa [x, y] atau {x, y}; hasil mengikuti format titik1.
 */
const titikTengah = (titik1, titik2) => {
    // Terapkan prinsip DRY dengan mendelegasikan tugas ke titikBagiGaris
    // Titik tengah adalah titik yang membagi garis dengan rasio mutlak 1 : 1
    return titikBagiGaris(titik1, titik2, 1, 1);
};

/**
 * Mencari titik pusat lingkaran yang melewati 3 titik koordinat (Titik Pusat Lingkaran Luar).
 * Titik boleh berupa [x, y] atau {x, y}; hasil mengikuti format titik1.
 */
const pusatLingkaran3Titik = (titik1, titik2, titik3) => {
    // 1. Destrukturisasi Modern (Bersih dan Ringkas)
    const [x1, y1] = _keArrayTitik(titik1);
    const [x2, y2] = _keArrayTitik(titik2);
    const [x3, y3] = _keArrayTitik(titik3);

    // 2. Kalkulasi Vektor Skalar
    const a = x2 - x1;
    const b = y2 - y1;
    const c = x3 - x2;
    const d = y3 - y2;

    const e = (a * (x1 + x2)) + (b * (y1 + y2));
    const f = (c * (x2 + x3)) + (d * (y2 + y3));

    // Determinan
    const g = 2 * ((a * d) - (b * c));

    // 3. Validasi Titik Kolinier
    if (g === 0) {
        throw new Error("MATEMATIKIN: Ketiga titik sejajar (kolinier), tidak dapat membentuk lingkaran.");
    }

    const centerX = ((d * e) - (b * f)) / g;
    const centerY = ((a * f) - (c * e)) / g;

    return _keFormatTitik([centerX, centerY], titik1);
};

/**
 * Mencari panjang jari-jari lingkaran yang melewati 3 titik koordinat.
 * Memanfaatkan Teorema Heron dan fungsi panjangGaris.
 * Titik boleh berupa [x, y] atau {x, y}.
 */
const jariLingkaran3Titik = (titik1, titik2, titik3) => {
    // 1. Manfaatkan fungsi panjangGaris yang sudah kita buat sebelumnya (Prinsip DRY!)
    // panjangGaris sudah menangani format array maupun objek
    const sisiA = panjangGaris(titik1, titik2);
    const sisiB = panjangGaris(titik2, titik3);
    const sisiC = panjangGaris(titik3, titik1);

    // 2. Setengah keliling segitiga (Semi-perimeter)
    const s = (sisiA + sisiB + sisiC) / 2;

    // 3. Hitung Luas dengan Teorema Heron
    // Math.max(0, ...) digunakan sebagai pelindung ekstra terhadap inakurasi floating-point
    // yang kadang menghasilkan angka negatif sangat kecil (misal -0.0000000001)
    const luasSegitiga = Math.sqrt(Math.max(0, s * (s - sisiA) * (s - sisiB) * (s - sisiC)));

    // 4. Validasi Luas Nol (Titik Kolinier)
    if (luasSegitiga === 0) {
        throw new Error("MATEMATIKIN: Ketiga titik sejajar, luas segitiga 0 sehingga jari-jari tak terhingga.");
    }

    // 5. Eksekusi Rumus Jari-jari Lingkaran Luar (R = abc / 4L)
    return (sisiA * sisiB * sisiC) / (4 * luasSegitiga);
};

/**
 * Menghitung gradien (kemiringan) dari sebuah garis yang melalui dua titik.
 * Mendukung dua parameter (titik1, titik2) atau satu pasangan [titik1, titik2].
 * Titik boleh berupa [x, y] atau {x, y}.
 * Mengembalikan Infinity untuk garis vertikal, dan NaN untuk titik yang sama.
 */
const gradien = (titik1, titik2) => {
    // 1. Fleksibilitas Input: Mendukung dua gaya penulisan koordinat (array maupun objek)
    const [[x1, y1], [x2, y2]] = _ambilDuaTitik(titik1, titik2);

    // 2. Kalkulasi Delta (Selisih)
    const dx = x2 - x1;
    const dy = y2 - y1;

    // 3. Penanganan Kondisi Ekstrem (Edge Cases)
    if (dx === 0) {
        // Jika dy juga 0 (titik yang sama), kembalikan NaN. Jika tidak, Infinity (garis vertikal)
        return dy === 0 ? NaN : Infinity;
    }

    // 4. Eksekusi Rumus Utama
    return dy / dx;
};

/**
 * Mencari titik berat (centroid) dari segitiga yang dibentuk oleh 3 titik.
 * Mendukung koordinat 2D maupun 3D (X, Y, Z).
 * Titik boleh berupa [x, y] atau {x, y}; hasil mengikuti format titik pertama.
 */
const titikBerat = (...titik) => {
    // 1. Validasi Input: Pastikan ada 3 titik
    if (titik.length !== 3) {
        throw new Error("MATEMATIKIN: Fungsi titikBerat membutuhkan tepat 3 titik koordinat.");
    }

    // 2. Normalisasi format titik (array/objek) menjadi array koordinat
    const koordinat = titik.map(_keArrayTitik);

    // 3. Validasi Dimensi: Pastikan semua titik memiliki jumlah dimensi yang sama
    const dimensi = koordinat[0].length;
    if (!koordinat.every(t => t.length === dimensi)) {
        throw new Error("MATEMATIKIN: Semua titik harus memiliki dimensi yang sama (2D atau 3D).");
    }

    // 4. Eksekusi Fungsional: Menjumlahkan setiap sumbu lalu membaginya dengan 3
    const hasil = koordinat[0].map((_, indeks) => {
        const jumlahSumbu = koordinat.reduce((total, t) => total + t[indeks], 0);
        return jumlahSumbu / 3;
    });

    return _keFormatTitik(hasil, titik[0]);
};

/**
 * Menghitung Kombinasi (nCr). 
 * Menggunakan algoritma iteratif untuk mencegah error 'Infinity' pada angka besar.
 */
const kombinasi = (n, r) => {
    // 1. Validasi Matematis
    if (typeof n !== 'number' || typeof r !== 'number') return 0;
    if (!Number.isInteger(n) || !Number.isInteger(r)) return 0;
    if (n < 0 || r < 0 || r > n) return 0;

    // Basis kasus
    if (r === 0 || r === n) return 1;

    // 2. Optimasi Simetri: nCr = nC(n-r). 
    // Contoh: C(100, 98) akan dihitung sebagai C(100, 2) agar jauh lebih cepat.
    r = Math.min(r, n - r);

    // 3. Eksekusi Iteratif (Tanpa Faktorial!)
    let hasil = 1;
    for (let i = 1; i <= r; i++) {
        hasil = hasil * (n - i + 1) / i;
    }

    return Math.round(hasil);
};

// Cukup buat ALIAS agar fungsi C tidak memakan memori ganda
const C = kombinasi;

/**
 * Menghitung Permutasi (nPr) - Banyaknya cara memilih r objek dari n objek dengan memperhatikan urutan.
 */
const permutasi = (n, r) => {
    // Validasi Matematis
    if (typeof n !== 'number' || typeof r !== 'number') return 0;
    if (!Number.isInteger(n) || !Number.isInteger(r)) return 0;
    if (n < 0 || r < 0 || r > n) return 0;

    // Eksekusi Iteratif (Lebih cepat dan aman dari faktorial rekursif)
    let hasil = 1;
    for (let i = 0; i < r; i++) {
        hasil *= (n - i);
    }

    return Math.round(hasil);
};

// ALIAS untuk kemudahan pemanggilan
const P = permutasi;

/**
 * Menjabarkan perhitungan faktorial menjadi format string LaTeX.
 * Contoh output untuk n=4: "4 \cdot 3 \cdot 2 \cdot 1"
 */
const jabarFaktorial = (n) => {
    // Validasi
    if (!Number.isInteger(n) || n <= 0) return "";

    // Array.from mencetak array [n, n-1, ..., 1], lalu join merangkainya dengan \cdot
    return Array.from({ length: n }, (_, i) => n - i).join(" \\cdot ");
};

/**
 * Membulatkan bilangan desimal hingga 'n' digit di belakang koma secara presisi absolut.
 */
const bulatkanDesimal = (angka, desimal = 2) => {
    if (typeof angka !== 'number') {
        throw new Error("MATEMATIKIN: Input harus berupa angka.");
    }

    // Notasi ilmiah (misal 1e-7) merusak trik "e" di bawah, jadi ditangani terpisah
    if (!Number.isFinite(angka) || String(angka).includes('e')) {
        return Number.isFinite(angka) ? Number(angka.toFixed(desimal)) : angka;
    }
    // Menggunakan trik manipulasi string eksponensial (e) 
    // untuk mencegah inakurasi floating-point pada angka berakhiran 5.
    return Number(Math.round(angka + "e" + desimal) + "e-" + desimal);
};

/**
 * Menghitung nilai rata-rata (Mean) dari sekumpulan data.
 * Otomatis membulatkan hasil ke 2 digit desimal untuk kerapian laporan.
 */
const mean = (arr) => {
    // Validasi: Pastikan input adalah array dan tidak kosong
    if (!Array.isArray(arr) || arr.length === 0) return 0;

    // Jumlahkan semua elemen
    const total = arr.reduce((akumulator, nilai) => akumulator + nilai, 0);

    // Rata-rata = Total / Banyak Data
    // Kita gunakan fungsi bulatkanDesimal dari ekosistem MATEMATIKIN sebelumnya
    return bulatkanDesimal(total / arr.length, 2);
};

/**
 * Mencari nilai tengah (Median).
 * Otomatis menangani jumlah data ganjil (mengambil nilai tengah) 
 * maupun genap (rata-rata dari dua nilai tengah).
 */
const median = (arr) => {
    if (!Array.isArray(arr) || arr.length === 0) return 0;

    // Gandakan array agar data aslinya tidak rusak, lalu urutkan (Kecil -> Besar)
    const dataUrut = [...arr].sort((a, b) => a - b);
    const titikTengah = Math.floor(dataUrut.length / 2);

    // Jika jumlah data genap
    if (dataUrut.length % 2 === 0) {
        const nilaiTengahGenap = (dataUrut[titikTengah - 1] + dataUrut[titikTengah]) / 2;
        return bulatkanDesimal(nilaiTengahGenap, 2);
    }

    // Jika jumlah data ganjil
    return dataUrut[titikTengah];
};

/**
 * Mencari nilai yang paling sering muncul (Modus).
 * Mampu mengembalikan lebih dari satu nilai jika terjadi seri (bimodal/multimodal).
 * Mengembalikan array kosong [] jika semua data frekuensinya sama (tidak ada modus).
 */
const modus = (arr) => {
    if (!Array.isArray(arr) || arr.length === 0) return [];

    const frekuensi = {};
    let frekuensiTertinggi = 0;

    // Peta frekuensi kemunculan setiap angka
    arr.forEach(angka => {
        frekuensi[angka] = (frekuensi[angka] || 0) + 1;
        if (frekuensi[angka] > frekuensiTertinggi) {
            frekuensiTertinggi = frekuensi[angka];
        }
    });

    // Tarik semua angka yang mencapai frekuensi tertinggi
    const daftarModus = Object.keys(frekuensi)
        .filter(kunci => frekuensi[kunci] === frekuensiTertinggi)
        .map(Number); // Ubah kembali dari string (kunci object) menjadi angka

    // Jika semua angka memiliki frekuensi yang sama, berarti TIDAK ADA modus
    if (daftarModus.length === Object.keys(frekuensi).length) {
        return [];
    }

    // Urutkan array modus dari kecil ke besar agar rapi saat dicetak ke soal
    return daftarModus.sort((a, b) => a - b);
};

/**
 * Menghitung Varians (Ragam) Populasi dari sekumpulan data.
 */
const varians = (arr) => {
    if (!Array.isArray(arr) || arr.length === 0) return 0;
    
    const rataRata = mean(arr); // Memanggil fungsi mean Anda
    const jumlahKuadratSelisih = arr.reduce((total, angka) => {
        return total + Math.pow(angka - rataRata, 2);
    }, 0);
    
    return bulatkanDesimal(jumlahKuadratSelisih / arr.length, 2);
};

// (Opsional) Refactor fungsi simpanganBaku Anda agar lebih DRY (Don't Repeat Yourself):
// const simpanganBaku = (arr) => bulatkanDesimal(Math.sqrt(varians(arr)), 2);

/**
 * Menghitung Simpangan Baku / Standar Deviasi (Populasi).
 * Sangat berguna untuk mengetahui seberapa jauh nilai menyimpang dari rata-rata kelas.
 */
const simpanganBaku = (arr) => {
    if (!Array.isArray(arr) || arr.length < 2) return 0;

    const rata = arr.reduce((t, n) => t + n, 0) / arr.length;
    const v = arr.reduce((t, n) => t + (n - rata) ** 2, 0) / arr.length;
    return bulatkanDesimal(Math.sqrt(v), 2);
};

/**
 * Menghasilkan opsi pilihan ganda (A, B, C, D, E, dst.) dengan distraktor otomatis.
 * Output berupa array objek lengkap dengan status kebenaran (isBenar) untuk grading.
 *
 * Pengecoh dibuat simetris di sekitar jawaban benar (jawaban ± k × toleransi),
 * selalu unik, dan jangkauannya melebar otomatis sehingga mendukung hingga 26 opsi.
 *
 * @param {number} jawabanBenar - Jawaban yang benar.
 * @param {number} [toleransi=1] - Jarak antar pengecoh.
 * @param {number} [jumlahOpsi=5] - Banyak opsi (maksimal 26).
 * @param {Object} [opsi={}] - Pengaturan tambahan:
 *   - tidakNegatif: true -> pengecoh tidak boleh negatif (hanya berlaku jika jawaban benar >= 0)
 *   - desimal: n -> pengecoh dibulatkan ke n digit desimal
 */
const buatOpsiGanda = (jawabanBenar, toleransi = 1, jumlahOpsi = 5, opsi = {}) => {
    // 1. Validasi Input
    if (typeof jawabanBenar !== 'number' || !Number.isFinite(jawabanBenar)) {
        throw new Error("MATEMATIKIN: Jawaban benar harus berupa angka agar distraktor dapat dihitung.");
    }
    if (typeof toleransi !== 'number' || !Number.isFinite(toleransi) || toleransi === 0) {
        throw new Error("MATEMATIKIN: Toleransi harus berupa angka terhingga yang tidak sama dengan 0.");
    }
    if (!Number.isInteger(jumlahOpsi) || jumlahOpsi < 1) {
        throw new Error("MATEMATIKIN: Jumlah opsi harus berupa bilangan bulat minimal 1.");
    }

    const dibutuhkan = Math.min(jumlahOpsi, 26) - 1; // banyaknya pengecoh
    const jarak = Math.abs(toleransi);
    const tidakNegatif = opsi.tidakNegatif === true && jawabanBenar >= 0;
    const desimal = opsi.desimal;

    // 2. Kumpulkan kandidat pengecoh secara simetris (±1, ±2, ±3, ... kali toleransi).
    // Rentang melebar otomatis sampai kandidat unik cukup. Kandidat dibuat sekitar dua kali
    // lipat kebutuhan agar pemilihan acak tetap bervariasi.
    const kandidat = new Set();
    const targetKandidat = Math.max(dibutuhkan * 2, 6);
    for (let k = 1; k <= 1000 && kandidat.size < targetKandidat; k++) {
        for (const tanda of [-1, 1]) {
            let nilai = _rapikan(jawabanBenar + tanda * k * jarak);
            if (desimal !== undefined) nilai = bulatkanDesimal(nilai, desimal) + 0;
            if (nilai === jawabanBenar) continue;      // jangan sampai sama dengan jawaban benar
            if (tidakNegatif && nilai < 0) continue;   // buang pengecoh negatif jika diminta
            kandidat.add(nilai);
        }
    }

    if (kandidat.size < dibutuhkan) {
        throw new Error("MATEMATIKIN: Tidak dapat membuat cukup pengecoh unik. Perbesar toleransi atau kurangi jumlah opsi.");
    }

    // 3. Pilih pengecoh secara acak, gabungkan dengan jawaban benar, lalu acak posisinya
    const pengecoh = acakArray([...kandidat]).slice(0, dibutuhkan);
    const semuaOpsi = acakArray([
        { nilai: jawabanBenar, isBenar: true },
        ...pengecoh.map(nilai => ({ nilai, isBenar: false }))
    ]);

    // 4. Pemetaan Abjad (A, B, C, D, E, dst.) dan Format Akhir
    const abjad = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

    return semuaOpsi.map((item, indeks) => ({
        opsi: abjad[indeks],
        nilai: item.nilai, // Bisa dipadukan dengan formatRibuan() jika nilainya besar
        isBenar: item.isBenar
    }));
};

/**
 * 1. FORMATTER RUPIAH
 * Mengonversi angka mentah menjadi format mata uang Rupiah resmi (EYD).
 * Otomatis membuang desimal ",00" jika angkanya adalah bilangan bulat.
 */
const formatRupiah = (angka = 0) => {
    if (typeof angka !== 'number' || !Number.isFinite(angka)) return "Rp0";

    // Menggunakan Intl.NumberFormat bawaan mesin JavaScript
    // Jauh lebih cepat dan aman daripada menggunakan Regex manual
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0, // Hilangkan desimal jika tidak perlu
        maximumFractionDigits: 2  // Maksimal 2 digit desimal (misal untuk sen)
    }).format(angka);
};

/**
 * 2. FORMATTER SATUAN (SIAP MATHJAX)
 * Menggabungkan angka dengan satuan pengukurannya.
 * Otomatis mendeteksi angka di akhir teks (misal: m2, cm3) dan 
 * mengubahnya menjadi pangkat (superscript) berstandar LaTeX.
 */
const formatSatuan = (angka = 0, satuan = "") => {
    if (typeof angka !== 'number' || !Number.isFinite(angka)) return "";

    // Gunakan formatRibuan() yang sudah kita buat sebelumnya
    // agar angkanya rapi sebelum digabung dengan satuan
    const angkaRapi = angka.toLocaleString('id-ID');

    if (!satuan) return angkaRapi;

    // Regex Cerdas: Mencari angka di ujung string dan menambahkan simbol pangkat LaTeX
    // Contoh: "cm2" -> "cm^{2}", "dm3" -> "dm^{3}"
    const satuanBerpangkat = satuan.replace(/([+-]?\d+)$/, '^{$1}');

    // \text{} digunakan agar huruf satuan berdiri tegak (tidak miring seperti variabel aljabar)
    return `${angkaRapi} \\text{ ${satuanBerpangkat}}`;
};


/**
 * Menghitung nilai turunan (gradien) dari sebuah fungsi matematika f(x) pada titik x tertentu
 * menggunakan metode Hampiran Beda Hingga (Finite Difference) dengan 5-Point Stencil.
 * Metode ini berstandar profesional karena sangat presisi (tingkat kesalahan O(h^4)) 
 * dan jauh lebih akurat dibandingkan limit beda maju/mundur sederhana.
 *
 * @param {Function} f - Fungsi matematika yang akan dievaluasi (contoh: x => x*x).
 * @param {number} x - Titik sumbu X di mana turunan akan dihitung.
 * @param {Object} [opsi={}] - Parameter kustom (contoh: { h: 1e-5 } untuk ukuran langkah manual).
 * @returns {number} Nilai turunan pertama (f'(x)) di titik x.
 */
const dfung = (f, x, opsi = {}) => {
    // 1. Validasi Tipe Data dan Kelayakan Input
    if (typeof f !== 'function') {
        throw new Error("MATEMATIKIN [dfung]: Parameter pertama harus berupa fungsi (Function).");
    }
    if (typeof x !== 'number' || !Number.isFinite(x)) {
        throw new Error("MATEMATIKIN [dfung]: Titik evaluasi (x) harus berupa bilangan terhingga (Finite Number).");
    }

    // 2. Menentukan Ukuran Langkah (Step Size / h)
    // Jika tidak diberikan oleh pengguna, kita hitung h secara dinamis berdasarkan nilai x.
    // Tujuannya untuk mencegah bencana "Catastrophic Cancellation" pada aritmatika Floating-Point.
    // Konstanta 1e-4 adalah ukuran ideal untuk mesin 64-bit yang memakai algoritma 5-point stencil.
    const h = opsi.h || (1e-4 * Math.max(1, Math.abs(x)));

    try {
        // 3. Evaluasi fungsi pada empat titik berdekatan secara simetris
        const f_min2h = f(x - 2 * h);
        const f_min1h = f(x - h);
        const f_plus1h = f(x + h);
        const f_plus2h = f(x + 2 * h);

        // 4. Deteksi Anomali Asimtot (Pembagian dengan nol, akar negatif, dsb)
        if (
            !Number.isFinite(f_min2h) ||
            !Number.isFinite(f_min1h) ||
            !Number.isFinite(f_plus1h) ||
            !Number.isFinite(f_plus2h)
        ) {
            return NaN; // Mengembalikan NaN jika fungsi tidak terdefinisi di sekitar titik x
        }

        // 5. Eksekusi Rumus Utama (5-Point Stencil Derivative)
        // Formula: f'(x) ≈ [ -f(x+2h) + 8f(x+h) - 8f(x-h) + f(x-2h) ] / 12h
        const turunan = (-f_plus2h + 8 * f_plus1h - 8 * f_min1h + f_min2h) / (12 * h);

        // 6. Koreksi Presisi (Membulatkan angka bising mikroskopis menjadi 0 murni)
        if (Math.abs(turunan) < 1e-12) return 0;

        return turunan;
    } catch (error) {
        // 7. Pengamanan terhadap error internal fungsi f(x) milik user
        throw new Error(`MATEMATIKIN [dfung]: Terjadi kesalahan saat mengevaluasi fungsi. Detail: ${error.message}`);
    }
};

/**
 * Menghitung Modulo Sejati. Sangat penting untuk fungsi rotasi, 
 * kriptografi, atau aritmetika jam yang melibatkan angka negatif.
 */
const mod = (n, m) => {
    if (m === 0) throw new Error("MATEMATIKIN: Modulo (pembagi) tidak boleh nol.");
    
    // Rumus penawar sisa bagi negatif JavaScript
    return ((n % m) + m) % m;
};

/**
 * Mencari akar-akar persamaan kuadrat (ax^2 + bx + c = 0).
 * Mengembalikan array [x1, x2]. Jika akar imajiner, mengembalikan array kosong [].
 */
const akarKuadrat = (a, b, c) => {
    const D = diskriminan(a, b, c); // Memanggil fungsi Anda sebelumnya
    
    // Jika D < 0, akarnya imajiner/kompleks (tidak berpotongan dengan sumbu X)
    if (D < 0) return []; 
    
    // Jika D = 0, akar kembar (x1 = x2)
    if (D === 0) {
        const x = -b / (2 * a);
        // Hilangkan -0 akibat inakurasi floating point
        return [x === -0 ? 0 : x]; 
    }
    
    // Jika D > 0, dua akar nyata berbeda
    const akarD = Math.sqrt(D);

    // Rumus stabil: menghindari pengurangan dua angka yang hampir sama (catastrophic cancellation)
    const q = -0.5 * (b + (b < 0 ? -akarD : akarD));
    const x1 = q / a;
    const x2 = c / q;

    // Kembalikan akar dengan urutan dari yang terkecil ke terbesar (+ 0 membuang -0)
    return [Math.min(x1, x2) + 0, Math.max(x1, x2) + 0];
};

/**
 * Mengubah satuan sudut dari Derajat ke Radian.
 */
const rad = (derajat) => {
    if (typeof derajat !== 'number') return NaN;
    return (derajat * PI) / 180;
};

/**
 * Mengubah satuan sudut dari Radian ke Derajat.
 */
const derajat = (radian) => {
    if (typeof radian !== 'number') return NaN;
    return (radian * 180) / PI;
};

// ==========================================================================
// FUNGSI TAMBAHAN
// Geometri titik, barisan & deret, statistika, pecahan, integral, logaritma,
// dan terbilang.
// ==========================================================================

// --------------------------------------------------------------------------
// PEMBANTU UMUM (INTERNAL)
// --------------------------------------------------------------------------

// Membersihkan "noise" floating-point (misal 2.0000000000000004 -> 2) dan mengubah -0 menjadi 0.
// Bilangan bulat dibiarkan utuh.
const _rapikan = (n) => {
    if (!Number.isFinite(n)) return n;
    if (Number.isInteger(n)) return n + 0;
    if (Math.abs(n) >= 1e5) return Number(n.toPrecision(15)) + 0;
    return Math.round(n * 1e10) / 1e10 + 0;
};

// Memastikan semua parameter berupa angka terhingga
const _pastikanAngka = (...nilai) => {
    if (!nilai.every(n => typeof n === 'number' && Number.isFinite(n))) {
        throw new Error("MATEMATIKIN: Semua koordinat/parameter harus berupa angka terhingga.");
    }
};

// --------------------------------------------------------------------------
// TRANSFORMASI GEOMETRI TITIK
// Semua titik boleh berupa [x, y] atau {x, y}. Hasil mengikuti format titik input.
// Koordinat ke-3 (z) jika ada dibiarkan tidak berubah.
// --------------------------------------------------------------------------

const _transformasiTitik = (titik, fungsi) => {
    const [x, y, ...sisa] = _keArrayTitik(titik);
    _pastikanAngka(x, y);
    const [xBaru, yBaru] = fungsi(x, y);
    return _keFormatTitik([_rapikan(xBaru), _rapikan(yBaru), ...sisa], titik);
};

/**
 * Translasi (pergeseran) titik.
 * Contoh: translasi([1, 2], 3, -1) -> [4, 1]
 *         translasi({x: 1, y: 2}, [3, -1]) -> {x: 4, y: 1}
 */
const translasi = (titik, dx, dy) => {
    if (_adalahTitik(dx)) [dx, dy] = _keArrayTitik(dx); // vektor translasi sebagai satu parameter
    _pastikanAngka(dx, dy);
    return _transformasiTitik(titik, (x, y) => [x + dx, y + dy]);
};

/**
 * Dilatasi (perkalian) titik dengan faktor skala k terhadap pusat tertentu (default titik asal).
 * Contoh: dilatasi([2, 3], 2) -> [4, 6]
 *         dilatasi([2, 3], 3, [1, 1]) -> [4, 7]
 */
const dilatasi = (titik, k, pusat = [0, 0]) => {
    const [px, py] = _keArrayTitik(pusat);
    _pastikanAngka(k, px, py);
    return _transformasiTitik(titik, (x, y) => [px + k * (x - px), py + k * (y - py)]);
};

/**
 * Rotasi titik sebesar sudut (derajat) terhadap pusat tertentu (default titik asal).
 * Sudut positif = berlawanan arah jarum jam.
 * Contoh: rotasi([1, 0], 90) -> [0, 1]
 *         rotasi({x: 3, y: 1}, 180, {x: 1, y: 1}) -> {x: -1, y: 1}
 */
const rotasi = (titik, sudut, pusat = [0, 0]) => {
    const [px, py] = _keArrayTitik(pusat);
    _pastikanAngka(sudut, px, py);
    const cosSudut = cos(sudut);
    const sinSudut = sin(sudut);
    return _transformasiTitik(titik, (x, y) => {
        const dx = x - px;
        const dy = y - py;
        return [px + dx * cosSudut - dy * sinSudut, py + dx * sinSudut + dy * cosSudut];
    });
};

/**
 * Refleksi (pencerminan) titik. Parameter 'cermin' dapat berupa:
 *  - String : 'sumbu-x', 'sumbu-y', 'y=x', 'y=-x', 'asal'
 *  - Titik  : [px, py] atau {x: px, y: py} -> pencerminan terhadap sebuah titik
 *  - Garis  : {x: k} (garis x = k), {y: k} (garis y = k), atau {m, c} (garis y = mx + c)
 * Contoh: refleksi([3, 2], 'sumbu-x') -> [3, -2]
 *         refleksi([3, 2], {x: 5}) -> [7, 2]
 *         refleksi([3, 1], {m: 1, c: 0}) -> [1, 3]
 */
const refleksi = (titik, cermin) => {
    // 1. Cermin berupa teks
    if (typeof cermin === 'string') {
        const aturan = {
            'sumbu-x': (x, y) => [x, -y],
            'sumbux': (x, y) => [x, -y],
            'y=0': (x, y) => [x, -y],
            'sumbu-y': (x, y) => [-x, y],
            'sumbuy': (x, y) => [-x, y],
            'x=0': (x, y) => [-x, y],
            'y=x': (x, y) => [y, x],
            'y=-x': (x, y) => [-y, -x],
            'asal': (x, y) => [-x, -y],
            'titikasal': (x, y) => [-x, -y]
        };
        const fungsi = aturan[cermin.toLowerCase().replace(/\s+/g, '')];
        if (!fungsi) {
            throw new Error("MATEMATIKIN: Cermin tidak dikenali. Gunakan 'sumbu-x', 'sumbu-y', 'y=x', 'y=-x', 'asal', titik, atau garis {x}, {y}, {m, c}.");
        }
        return _transformasiTitik(titik, fungsi);
    }

    // 2. Cermin berupa titik (pencerminan terhadap titik)
    if (_adalahTitik(cermin)) {
        const [px, py] = _keArrayTitik(cermin);
        _pastikanAngka(px, py);
        return _transformasiTitik(titik, (x, y) => [2 * px - x, 2 * py - y]);
    }

    // 3. Cermin berupa garis
    if (cermin !== null && typeof cermin === 'object') {
        const { x: kx, y: ky, m, c = 0 } = cermin;

        if (m === undefined && typeof kx === 'number' && ky === undefined) { // garis x = k
            _pastikanAngka(kx);
            return _transformasiTitik(titik, (x, y) => [2 * kx - x, y]);
        }
        if (m === undefined && typeof ky === 'number' && kx === undefined) { // garis y = k
            _pastikanAngka(ky);
            return _transformasiTitik(titik, (x, y) => [x, 2 * ky - y]);
        }
        if (typeof m === 'number') { // garis y = mx + c
            _pastikanAngka(m, c);
            return _transformasiTitik(titik, (x, y) => {
                const d = (x + (y - c) * m) / (1 + m * m); // proyeksi titik pada garis (sumbu x)
                return [2 * d - x, 2 * (d * m + c) - y];
            });
        }
    }

    throw new Error("MATEMATIKIN: Cermin tidak valid. Gunakan teks, titik, atau garis {x}, {y}, {m, c}.");
};

// --------------------------------------------------------------------------
// GEOMETRI ANALITIK
// --------------------------------------------------------------------------

// Koefisien garis ax + by + c = 0 yang melalui dua titik (belum disederhanakan)
const _koefisienGaris = (titik1, titik2) => {
    const [x1, y1] = _keArrayTitik(titik1);
    const [x2, y2] = _keArrayTitik(titik2);
    _pastikanAngka(x1, y1, x2, y2);
    if (x1 === x2 && y1 === y2) {
        throw new Error("MATEMATIKIN: Dua titik harus berbeda untuk membentuk sebuah garis.");
    }
    return { a: y2 - y1, b: x1 - x2, c: x2 * y1 - x1 * y2 };
};

// Merangkai satu suku aljabar: _sukuAljabar(-3, 'x', false) -> " - 3x"
const _sukuAljabar = (n, variabel, pertama) => {
    if (n === 0) return '';
    const mutlak = Math.abs(n);
    const isi = `${(variabel && mutlak === 1) ? '' : mutlak}${variabel}`;
    if (pertama) return n < 0 ? `-${isi}` : isi;
    return ` ${n < 0 ? '-' : '+'} ${isi}`;
};

// Pembilang/penyebut -> teks LaTeX (pecahan jika bulat, desimal jika tidak)
const _nilaiLatex = (pembilang, penyebut) => {
    if (Number.isInteger(pembilang) && Number.isInteger(penyebut)) return pecahan(pembilang, penyebut);
    return String(_rapikan(pembilang / penyebut));
};

/**
 * Menyusun persamaan garis yang melalui dua titik, dalam format LaTeX.
 * Titik boleh berupa [x, y] atau {x, y}. Bentuk: 'umum' (ax + by + c = 0, default)
 * atau 'gradien' (y = mx + c). Garis tegak menghasilkan x = k.
 * Contoh: persamaanGaris([0, 1], [2, 4]) -> "3x - 2y + 2 = 0"
 *         persamaanGaris([0, 1], [2, 4], 'gradien') -> "y = \dfrac{3}{2}x + 1"
 */
const persamaanGaris = (titik1, titik2, bentuk = 'umum') => {
    if (typeof titik2 === 'string') { // persamaanGaris([t1, t2], 'gradien')
        bentuk = titik2;
        titik2 = undefined;
    }
    [titik1, titik2] = _ambilDuaTitik(titik1, titik2);
    let { a, b, c } = _koefisienGaris(titik1, titik2);

    // Sederhanakan: bagi dengan FPB (jika semua bulat) dan buat tanda suku pertama positif
    if ([a, b, c].every(Number.isInteger)) {
        const pembagi = fpb(a, b, c);
        a /= pembagi; b /= pembagi; c /= pembagi;
    }
    if (a < 0 || (a === 0 && b < 0)) { a = -a; b = -b; c = -c; }
    a = _rapikan(a); b = _rapikan(b); c = _rapikan(c);

    if (bentuk === 'umum') {
        return `${_sukuAljabar(a, 'x', true)}${_sukuAljabar(b, 'y', a === 0)}${_sukuAljabar(c, '', false)} = 0`;
    }

    if (bentuk === 'gradien') {
        if (b === 0) return `x = ${_nilaiLatex(-c, a)}`; // garis tegak

        const m = -a / b;  // gradien
        const k = -c / b;  // konstanta
        let suku = '';
        if (m === 1) suku = 'x';
        else if (m === -1) suku = '-x';
        else if (m !== 0) suku = `${_nilaiLatex(-a, b)}x`;

        if (k !== 0) {
            const besar = _nilaiLatex(Math.abs(c), Math.abs(b));
            if (suku === '') suku = k < 0 ? `-${besar}` : besar;
            else suku += k < 0 ? ` - ${besar}` : ` + ${besar}`;
        }
        return `y = ${suku === '' ? '0' : suku}`;
    }

    throw new Error("MATEMATIKIN: Bentuk persamaan harus 'umum' atau 'gradien'.");
};

/**
 * Menghitung jarak titik ke sebuah garis (2D).
 * Garis dapat berupa pasangan dua titik [[x1, y1], [x2, y2]] (atau objek {x, y}),
 * atau koefisien {a, b, c} untuk garis ax + by + c = 0.
 * Contoh: jarakTitikKeGaris([0, 0], {a: 3, b: 4, c: -10}) -> 2
 */
const jarakTitikKeGaris = (titik, garis) => {
    const [x0, y0] = _keArrayTitik(titik);
    let a, b, c;

    if (garis !== null && typeof garis === 'object' && !Array.isArray(garis) && 'a' in garis) {
        ({ a, b, c = 0 } = garis);
    } else {
        const [titik1, titik2] = _keArrayGaris(garis);
        ({ a, b, c } = _koefisienGaris(titik1, titik2));
    }

    _pastikanAngka(x0, y0, a, b, c);
    const penyebut = Math.hypot(a, b);
    if (penyebut === 0) {
        throw new Error("MATEMATIKIN: Koefisien a dan b tidak boleh keduanya nol.");
    }
    return _rapikan(Math.abs(a * x0 + b * y0 + c) / penyebut);
};

/**
 * Menghitung luas poligon dengan rumus Shoelace (Gauss).
 * Titik diberikan berurutan (searah atau berlawanan jarum jam), tanpa garis yang berpotongan.
 * Menerima titik berjejer luasPoligon(t1, t2, t3, ...) atau satu array berisi titik.
 * Titik boleh berupa [x, y] atau {x, y}.
 * Contoh: luasPoligon([0, 0], [4, 0], [4, 3], [0, 3]) -> 12
 */
const luasPoligon = (...titik) => {
    if (titik.length === 1 && Array.isArray(titik[0]) && titik[0].length > 0 && titik[0].every(_adalahTitik)) {
        titik = titik[0];
    }
    if (titik.length < 3) {
        throw new Error("MATEMATIKIN: Poligon membutuhkan minimal 3 titik.");
    }

    const koordinat = titik.map(_keArrayTitik);
    _pastikanAngka(...koordinat.flatMap(t => [t[0], t[1]]));

    let jumlahSilang = 0;
    for (let i = 0; i < koordinat.length; i++) {
        const [xi, yi] = koordinat[i];
        const [xj, yj] = koordinat[(i + 1) % koordinat.length];
        jumlahSilang += xi * yj - xj * yi;
    }
    return _rapikan(Math.abs(jumlahSilang) / 2);
};

/**
 * Menghitung luas segitiga dari 3 titik koordinat (kolinier menghasilkan 0).
 * Titik boleh berupa [x, y] atau {x, y}.
 * Contoh: luasSegitiga([0, 0], [4, 0], [0, 3]) -> 6
 */
const luasSegitiga = (titik1, titik2, titik3) => luasPoligon(titik1, titik2, titik3);

// --------------------------------------------------------------------------
// BARISAN DAN DERET
// --------------------------------------------------------------------------

const _pastikanSukuKe = (n) => {
    if (!Number.isInteger(n) || n < 1) {
        throw new Error("MATEMATIKIN: Suku ke-n harus berupa bilangan bulat positif (n >= 1).");
    }
};

/** Suku ke-n barisan aritmetika: Un = a + (n - 1)b. Contoh: sukuAritmetika(3, 4, 10) -> 39 */
const sukuAritmetika = (a, b, n) => {
    _pastikanAngka(a, b);
    _pastikanSukuKe(n);
    return _rapikan(a + (n - 1) * b);
};

/** Jumlah n suku pertama deret aritmetika: Sn = n/2 (2a + (n - 1)b). Contoh: jumlahAritmetika(3, 4, 10) -> 210 */
const jumlahAritmetika = (a, b, n) => {
    _pastikanAngka(a, b);
    _pastikanSukuKe(n);
    return _rapikan(n * (2 * a + (n - 1) * b) / 2);
};

/** Suku ke-n barisan geometri: Un = a * r^(n-1). Contoh: sukuGeometri(2, 3, 5) -> 162 */
const sukuGeometri = (a, r, n) => {
    _pastikanAngka(a, r);
    _pastikanSukuKe(n);
    return _rapikan(a * r ** (n - 1));
};

/** Jumlah n suku pertama deret geometri: Sn = a(r^n - 1)/(r - 1). Contoh: jumlahGeometri(2, 3, 5) -> 242 */
const jumlahGeometri = (a, r, n) => {
    _pastikanAngka(a, r);
    _pastikanSukuKe(n);
    if (r === 1) return _rapikan(a * n);
    return _rapikan(a * (r ** n - 1) / (r - 1));
};

/** Jumlah deret geometri tak hingga: S = a/(1 - r), hanya konvergen jika |r| < 1. Contoh: jumlahGeometriTakHingga(8, 0.5) -> 16 */
const jumlahGeometriTakHingga = (a, r) => {
    _pastikanAngka(a, r);
    if (!(Math.abs(r) < 1)) {
        throw new Error("MATEMATIKIN: Deret geometri tak hingga hanya konvergen jika |r| < 1.");
    }
    return _rapikan(a / (1 - r));
};

// --------------------------------------------------------------------------
// STATISTIKA TAMBAHAN
// Hasil dibulatkan 2 desimal, sama seperti mean(), median(), dan varians().
// --------------------------------------------------------------------------

const _validasiData = (arr, minimal = 1) => {
    if (!Array.isArray(arr) || arr.length < minimal ||
        !arr.every(n => typeof n === 'number' && Number.isFinite(n))) {
        throw new Error(`MATEMATIKIN: Data harus berupa array angka terhingga (minimal ${minimal} data).`);
    }
};

const _medianUrut = (urut) => {
    const tengah = Math.floor(urut.length / 2);
    return urut.length % 2 === 0 ? (urut[tengah - 1] + urut[tengah]) / 2 : urut[tengah];
};

const _rataMentah = (arr) => arr.reduce((total, n) => total + n, 0) / arr.length;

/**
 * Menghitung kuartil data (Q1, Q2, Q3) dengan metode median dua belahan data:
 * data dibagi dua di median; jika banyak data ganjil, median tidak ikut dihitung.
 * Tanpa parameter q mengembalikan {q1, q2, q3}; dengan q (1, 2, atau 3) mengembalikan angkanya.
 * Contoh: kuartil([1, 2, 3, 4, 5, 6, 7], 1) -> 2
 */
const kuartil = (arr, q) => {
    _validasiData(arr, 2);
    const urut = [...arr].sort((a, b) => a - b);
    const tengah = Math.floor(urut.length / 2);
    const bawah = urut.slice(0, tengah);
    const atas = urut.slice(urut.length % 2 === 0 ? tengah : tengah + 1);

    const hasil = {
        q1: bulatkanDesimal(_medianUrut(bawah), 2),
        q2: bulatkanDesimal(_medianUrut(urut), 2),
        q3: bulatkanDesimal(_medianUrut(atas), 2)
    };

    if (q === undefined) return hasil;
    if (![1, 2, 3].includes(q)) {
        throw new Error("MATEMATIKIN: Parameter q harus bernilai 1, 2, atau 3.");
    }
    return hasil[`q${q}`];
};

/** Jangkauan (range) data = nilai terbesar - nilai terkecil. */
const jangkauan = (arr) => {
    _validasiData(arr, 1);
    const urut = [...arr].sort((a, b) => a - b);
    return _rapikan(urut[urut.length - 1] - urut[0]);
};

/** Jangkauan interkuartil (IQR) = Q3 - Q1. */
const jangkauanInterkuartil = (arr) => {
    const { q1, q3 } = kuartil(arr);
    return _rapikan(q3 - q1);
};

/** Simpangan kuartil (Qd) = 1/2 (Q3 - Q1). */
const simpanganKuartil = (arr) => jangkauanInterkuartil(arr) / 2;

/** Simpangan rata-rata = rata-rata dari |x - mean|. */
const simpanganRataRata = (arr) => {
    _validasiData(arr, 1);
    const rata = _rataMentah(arr);
    return bulatkanDesimal(_rataMentah(arr.map(n => Math.abs(n - rata))), 2);
};

/** Varians sampel (pembagi n - 1). Berbeda dengan varians() yang memakai populasi (pembagi n). */
const variansSampel = (arr) => {
    _validasiData(arr, 2);
    const rata = _rataMentah(arr);
    const jumlahKuadratSelisih = arr.reduce((total, n) => total + (n - rata) ** 2, 0);
    return bulatkanDesimal(jumlahKuadratSelisih / (arr.length - 1), 2);
};

/** Simpangan baku sampel (pembagi n - 1). */
const simpanganBakuSampel = (arr) => {
    _validasiData(arr, 2);
    const rata = _rataMentah(arr);
    const jumlahKuadratSelisih = arr.reduce((total, n) => total + (n - rata) ** 2, 0);
    return bulatkanDesimal(Math.sqrt(jumlahKuadratSelisih / (arr.length - 1)), 2);
};

// --------------------------------------------------------------------------
// OPERASI PECAHAN
// Pecahan ditulis sebagai [pembilang, penyebut]; bilangan bulat n dibaca sebagai n/1.
// --------------------------------------------------------------------------

const _keArrayPecahan = (p) => {
    let pembilang, penyebut;
    if (Number.isInteger(p)) {
        [pembilang, penyebut] = [p, 1];
    } else if (Array.isArray(p) && p.length === 2) {
        [pembilang, penyebut] = p;
    } else {
        throw new Error("MATEMATIKIN: Pecahan harus berupa bilangan bulat atau array [pembilang, penyebut].");
    }
    if (!Number.isInteger(pembilang) || !Number.isInteger(penyebut)) {
        throw new Error("MATEMATIKIN: Pembilang dan penyebut harus berupa bilangan bulat.");
    }
    if (penyebut === 0) {
        throw new Error("MATEMATIKIN: Penyebut pecahan tidak boleh bernilai nol.");
    }
    return [pembilang, penyebut];
};

// Menyederhanakan pecahan dan memastikan penyebut selalu positif
const _sederhanakanPecahan = (pembilang, penyebut) => {
    if (pembilang === 0) return [0, 1];
    const pembagi = _fpbDuaAngka(pembilang, penyebut);
    let [a, b] = [pembilang / pembagi, penyebut / pembagi];
    if (b < 0) { a = -a; b = -b; }
    return [a, b];
};

/**
 * Menghitung operasi dua pecahan. Operasi: 'tambah' (default), 'kurang', 'kali', 'bagi'.
 * Mengembalikan pecahan paling sederhana sebagai [pembilang, penyebut].
 * Contoh: hitungPecahan([1, 2], [1, 3]) -> [5, 6]
 */
const hitungPecahan = (pecahan1, pecahan2, operasi = 'tambah') => {
    const [n1, d1] = _keArrayPecahan(pecahan1);
    const [n2, d2] = _keArrayPecahan(pecahan2);

    switch (operasi) {
        case 'tambah':
        case 'kurang': {
            const penyebut = _kpkDuaAngka(d1, d2);
            const tanda = operasi === 'tambah' ? 1 : -1;
            return _sederhanakanPecahan(n1 * (penyebut / d1) + tanda * n2 * (penyebut / d2), penyebut);
        }
        case 'kali':
            return _sederhanakanPecahan(n1 * n2, d1 * d2);
        case 'bagi':
            if (n2 === 0) throw new Error("MATEMATIKIN: Tidak dapat membagi dengan pecahan bernilai nol.");
            return _sederhanakanPecahan(n1 * d2, d1 * n2);
        default:
            throw new Error("MATEMATIKIN: Operasi harus 'tambah', 'kurang', 'kali', atau 'bagi'.");
    }
};

/**
 * Sama seperti hitungPecahan, tetapi hasilnya berupa teks LaTeX (memakai pecahan()).
 * Contoh: operasiPecahan([1, 2], [1, 3]) -> "\dfrac{5}{6}"
 */
const operasiPecahan = (pecahan1, pecahan2, operasi = 'tambah') => {
    const [pembilang, penyebut] = hitungPecahan(pecahan1, pecahan2, operasi);
    return pecahan(pembilang, penyebut);
};

/**
 * Mengubah bilangan desimal menjadi pecahan paling sederhana [pembilang, penyebut]
 * (algoritma pecahan berlanjut). Desimal berulang seperti 0.3333333333333333 menjadi [1, 3].
 * Opsi: { toleransi: 1e-14 (relatif), maksPenyebut: 1e6, latex: false }. Dengan latex: true hasilnya teks LaTeX.
 * Desimal berhingga (misal 0.333333) dikembalikan tepat sebagai [333333, 1000000].
 * Contoh: desimalKePecahan(0.75) -> [3, 4]
 */
const desimalKePecahan = (desimal, opsi = {}) => {
    if (typeof desimal !== 'number' || !Number.isFinite(desimal)) {
        throw new Error("MATEMATIKIN: Input harus berupa angka terhingga.");
    }
    const maksPenyebut = opsi.maksPenyebut === undefined ? 1e6 : opsi.maksPenyebut;

    const tanda = desimal < 0 ? -1 : 1;
    const x = Math.abs(desimal);

    // Toleransi harus jauh lebih kecil dari selisih dua pecahan berpenyebut <= maksPenyebut,
    // tetapi tetap lebih besar dari noise floating-point (sekitar 1e-16).
    const toleransi = (opsi.toleransi === undefined ? 1e-14 : opsi.toleransi) * Math.max(1, x);

    let hasil;
    if (Number.isInteger(x)) {
        hasil = [tanda * x + 0, 1];
    } else {
        let pKemarin = 1, qKemarin = 0;
        let bulatan = Math.floor(x);
        let p = bulatan, q = 1;
        let sisa = x - bulatan;

        while (sisa > 1e-15 && Math.abs(x - p / q) > toleransi) {
            const kebalikan = 1 / sisa;
            bulatan = Math.floor(kebalikan);
            sisa = kebalikan - bulatan;
            const pBaru = bulatan * p + pKemarin;
            const qBaru = bulatan * q + qKemarin;
            if (qBaru > maksPenyebut) break;
            [pKemarin, qKemarin, p, q] = [p, q, pBaru, qBaru];
        }
        hasil = [tanda * p + 0, q];
    }

    return opsi.latex === true ? pecahan(hasil[0], hasil[1]) : hasil;
};

// --------------------------------------------------------------------------
// KALKULUS: INTEGRAL (pasangan dfung)
// --------------------------------------------------------------------------

/**
 * Menghitung integral tentu f(x) dari a sampai b dengan metode Simpson komposit.
 * Opsi: { n: 1000 } = banyak subinterval (dibulatkan ke genap). Hasil dibulatkan 12 angka penting.
 * Mengembalikan NaN jika fungsi tidak terdefinisi pada rentang tersebut.
 * Contoh: integral(x => x * x, 0, 3) -> 9
 *         integral(Math.sin, 0, Math.PI) -> 2
 */
const integral = (f, a, b, opsi = {}) => {
    if (typeof f !== 'function') {
        throw new Error("MATEMATIKIN [integral]: Parameter pertama harus berupa fungsi (Function).");
    }
    _pastikanAngka(a, b);
    if (a === b) return 0;

    let n = opsi.n === undefined ? 1000 : opsi.n;
    if (!Number.isInteger(n) || n < 2) {
        throw new Error("MATEMATIKIN [integral]: opsi.n harus berupa bilangan bulat minimal 2.");
    }
    if (n % 2 !== 0) n++;

    const h = (b - a) / n;
    let total;
    try {
        let jumlahGanjil = 0;
        let jumlahGenap = 0;
        for (let i = 1; i < n; i++) {
            const nilai = f(a + i * h);
            if (i % 2 === 0) jumlahGenap += nilai;
            else jumlahGanjil += nilai;
        }
        total = (h / 3) * (f(a) + f(b) + 4 * jumlahGanjil + 2 * jumlahGenap);
    } catch (error) {
        throw new Error(`MATEMATIKIN [integral]: Terjadi kesalahan saat mengevaluasi fungsi. Detail: ${error.message}`);
    }

    if (!Number.isFinite(total)) return NaN;
    return Number(total.toPrecision(12)) + 0;
};

// --------------------------------------------------------------------------
// LOGARITMA
// --------------------------------------------------------------------------

/**
 * Menghitung logaritma dengan basis tertentu: logaritma(basis, numerus), misalnya 2log 8 ditulis logaritma(2, 8).
 * Hasil dirapikan agar bebas noise floating-point.
 * Contoh: logaritma(2, 8) -> 3
 *         logaritma(3, 81) -> 4
 *         logaritma(10, 0.01) -> -2
 */
const logaritma = (basis, numerus) => {
    if (typeof basis !== 'number' || typeof numerus !== 'number' ||
        !Number.isFinite(basis) || !Number.isFinite(numerus)) {
        throw new Error("MATEMATIKIN: Basis dan numerus harus berupa angka terhingga.");
    }
    if (basis <= 0 || basis === 1) {
        throw new Error("MATEMATIKIN: Basis logaritma harus positif dan tidak sama dengan 1.");
    }
    if (numerus <= 0) {
        throw new Error("MATEMATIKIN: Numerus logaritma harus lebih besar dari 0.");
    }

    let hasil;
    if (basis === 10) hasil = Math.log10(numerus);
    else if (basis === 2) hasil = Math.log2(numerus);
    else hasil = Math.log(numerus) / Math.log(basis);

    return _rapikan(hasil);
};

// --------------------------------------------------------------------------
// TERBILANG (angka -> teks bahasa Indonesia)
// --------------------------------------------------------------------------

const _kataSatuan = ['nol', 'satu', 'dua', 'tiga', 'empat', 'lima', 'enam', 'tujuh', 'delapan', 'sembilan', 'sepuluh', 'sebelas'];

// Mengeja angka 1 sampai 999
const _terbilangTigaDigit = (n) => {
    const kata = [];
    const ratus = Math.floor(n / 100);
    const sisa = n % 100;

    if (ratus === 1) kata.push('seratus');
    else if (ratus > 1) kata.push(`${_kataSatuan[ratus]} ratus`);

    if (sisa > 0) {
        if (sisa < 12) {
            kata.push(_kataSatuan[sisa]);
        } else if (sisa < 20) {
            kata.push(`${_kataSatuan[sisa - 10]} belas`);
        } else {
            kata.push(`${_kataSatuan[Math.floor(sisa / 10)]} puluh`);
            if (sisa % 10 > 0) kata.push(_kataSatuan[sisa % 10]);
        }
    }
    return kata.join(' ');
};

// Mengeja bilangan bulat tak negatif (sampai batas bilangan bulat aman JavaScript)
const _terbilangBulat = (n) => {
    if (n === 0) return 'nol';

    const skala = ['', 'ribu', 'juta', 'miliar', 'triliun', 'kuadriliun'];
    const kelompok = [];
    for (let sisa = n; sisa > 0; sisa = Math.floor(sisa / 1000)) {
        kelompok.push(sisa % 1000);
    }

    const bagian = [];
    for (let i = kelompok.length - 1; i >= 0; i--) {
        if (kelompok[i] === 0) continue;
        if (i === 1 && kelompok[i] === 1) bagian.push('seribu');
        else bagian.push(skala[i] ? `${_terbilangTigaDigit(kelompok[i])} ${skala[i]}` : _terbilangTigaDigit(kelompok[i]));
    }
    return bagian.join(' ');
};

/**
 * Mengeja angka dalam bahasa Indonesia. Mendukung bilangan negatif dan desimal
 * (angka di belakang koma dibaca satu per satu), hingga batas bilangan bulat aman JavaScript.
 * Contoh: terbilang(1250) -> "seribu dua ratus lima puluh"
 *         terbilang(2024) -> "dua ribu dua puluh empat"
 *         terbilang(-3.14) -> "minus tiga koma satu empat"
 */
const terbilang = (n) => {
    if (typeof n !== 'number' || !Number.isFinite(n)) {
        throw new Error("MATEMATIKIN: Input harus berupa angka terhingga.");
    }

    const teks = String(Math.abs(n));
    if (teks.includes('e')) {
        throw new Error("MATEMATIKIN: Angka terlalu besar atau terlalu kecil untuk dieja.");
    }

    const [bagianBulat, bagianDesimal] = teks.split('.');
    if (Number(bagianBulat) > Number.MAX_SAFE_INTEGER) {
        throw new Error("MATEMATIKIN: Angka melebihi batas bilangan bulat aman untuk dieja.");
    }

    let hasil = _terbilangBulat(Number(bagianBulat));
    if (bagianDesimal) {
        hasil += ` koma ${[...bagianDesimal].map(digit => _kataSatuan[Number(digit)]).join(' ')}`;
    }
    return n < 0 ? `minus ${hasil}` : hasil;
};

// ==========================================================================
// EKSPOR
// - Node.js / bundler : const { panjangGaris, sin } = require('./matematikin.js');
// - Browser           : semua fungsi tetap global, dan juga tersedia lewat objek Matematikin
//                       (misal Matematikin.panjangGaris).
// Fungsi pembantu berawalan garis bawah (_) bersifat internal dan tidak diekspor.
// ==========================================================================
(function (api) {
    if (typeof module !== 'undefined' && module.exports) module.exports = api;
    if (typeof window !== 'undefined') window.Matematikin = api;
})({
    PI, E, PHI, cekBulat, cekBilKuadrat, faktorPrimaTerkecil,
    cekPrima, faktorisasiPrima, primaBerikutnya, primaKembarBerikutnya, primaKuadrupletBerikutnya, faktorial,
    daftarFaktorPrima, fpb, kpk, faktorKuadratTerbesar, diskriminan, bilBulatAcak,
    determinan, matriksMinor, matriksKofaktor, transpose, adjoin, kaliMatriks,
    invers, bentukMatriks, jumlah, jumlahKuadrat, panjangVektor, dotVektor,
    crossVektor, proyeksiVektor, proyeksiSkalar, sudutVektor, vektorSatuan, aritmetikaVektor,
    sederhanakanAkar, acakAntara, acakTanda, pecahan, koefisien, formatKonstanta,
    formatSuku, deretTanpaNol, kurungNegatif, acakMinus, deretBilBul, acakArray,
    pilihAcak, pilihSebagian, acakDerangement, sin, cos, tan,
    csc, sec, ctg, arcsin, arccos, arctan,
    buattabelsoal, arrayBukit, arrayLembah, formatRibuan, panjangGaris, titikPotong,
    titikBagiGaris, titikTengah, pusatLingkaran3Titik, jariLingkaran3Titik, gradien, titikBerat,
    kombinasi, C, permutasi, P, jabarFaktorial, bulatkanDesimal,
    mean, median, modus, varians, simpanganBaku, buatOpsiGanda,
    formatRupiah, formatSatuan, dfung, mod, akarKuadrat, rad,
    derajat, translasi, dilatasi, rotasi, refleksi, persamaanGaris,
    jarakTitikKeGaris, luasPoligon, luasSegitiga, sukuAritmetika, jumlahAritmetika, sukuGeometri,
    jumlahGeometri, jumlahGeometriTakHingga, kuartil, jangkauan, jangkauanInterkuartil, simpanganKuartil,
    simpanganRataRata, variansSampel, simpanganBakuSampel, hitungPecahan, operasiPecahan, desimalKePecahan,
    integral, logaritma, terbilang
});
