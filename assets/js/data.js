// Semua konten portofolio ada di file ini (diambil dari database db_portofolio).
// Untuk mengubah isi website, cukup edit data di bawah lalu refresh browser.
window.PORTFOLIO = {
    profile: {
        name: 'I Wayan Aldy Nuada Juliantara',
        shortName: 'Aldy Nuada',
        title: 'Fullstack Web Developer',
        subtitle: 'Laravel & JavaScript Enthusiast',
        tagline: 'Fullstack Web Developer yang membangun aplikasi Laravel dari desain di Figma hingga live di server. Berpengalaman mengerjakan e-commerce, sistem manajemen, hingga panel admin dan API.',
        location: 'Badung, Bali, Indonesia',
        timezone: 'GMT+7 (Asia/Jakarta)',
        email: 'aldynuada132@gmail.com',
        // Isi dengan format internasional tanpa "+", contoh: '6281234567890'. null = tombol WhatsApp disembunyikan.
        whatsapp: null,
        instagram: 'aldy_nuada',
        avatar: 'assets/images/profile.jpg',
        banner: 'assets/images/banner.jpg',
    },

    about: [
        'Saya mulai serius di dunia web sejak 2023, berawal dari mengubah desain Figma menjadi halaman web yang responsif. Dari sana saya mendalami sisi desain sebagai UI/UX Designer, lalu melangkah ke back-end hingga kini menangani aplikasi secara menyeluruh sebagai Fullstack Developer.',
        'Latar belakang desain membuat saya tidak hanya memikirkan apakah sebuah fitur berjalan, tapi juga apakah fitur itu mudah dipakai. Saya terbiasa mengerjakan proyek dari awal: memahami kebutuhan, merancang tampilan, membangun front-end dan back-end dengan Laravel, sampai deploy ke server.',
        'Di luar pekerjaan utama, saya juga menyelesaikan berbagai proyek freelance, mulai dari website e-commerce dan company profile hingga sistem e-learning untuk sekolah. Saat ini saya terus memperdalam Laravel dan JavaScript, dan selalu terbuka untuk kolaborasi maupun peluang baru.',
    ],

    education: [
        { institution: 'ITB STIKOM Bali', degree: 'S1 Sistem Informasi — IPK 3,55', period: '2020 — 2024' },
        { institution: 'SMA PGRI 4 Denpasar', degree: 'Jurusan IPA', period: '2017 — 2020' },
    ],

    experience: [
        {
            role: 'Fullstack Developer',
            company: 'Dinas Komunikasi dan Informatika Kabupaten Badung',
            period: 'Okt 2025 — Sekarang',
            points: [
                'Mengembangkan dan memelihara aplikasi Pelayanan Umum.',
                'Mengembangkan aplikasi E-SAKIP untuk mendukung sistem akuntabilitas kinerja instansi pemerintah.',
                'Mengembangkan aplikasi Menara Badung.',
            ],
        },
        {
            role: 'Junior Developer Fullstack',
            company: 'Bali Gatra',
            period: 'Apr 2025 — Aug 2025',
            points: [
                'Membuat website Bali Pearl, sebuah website e-commerce.',
                'Melakukan deploy website ke shared hosting.',
                'Membuat website admin dan API untuk aplikasi Creb, aplikasi pencari driver.',
                'Membuat website admin Balivalas, aplikasi pencatatan bulanan.',
            ],
        },
        {
            role: 'Freelance Junior Developer Fullstack',
            company: 'Bali Gatra',
            period: 'Apr 2025 — Sep 2025',
            points: [
                'Melanjutkan pengembangan website Bali Pearl.',
                'Memperbaiki bug pada website Sanur Cycle.',
                'Melanjutkan pengembangan website Creb.',
            ],
        },
        {
            role: 'UI/UX Designer',
            company: 'Sadhana Corporation',
            period: 'Sep 2023 — Jan 2024',
            points: [
                'Membuat component design untuk membantu kebutuhan kerja sehari-hari.',
                'Mendesain mobile web bernama FitnessFlow.',
                'Membuat mockup RSPR, sebuah sistem absensi.',
            ],
        },
        {
            role: 'Front End Web Developer',
            company: 'Bit House',
            period: 'Mar 2023 — Jun 2023',
            points: [
                'Merancang desain antarmuka pengguna menggunakan Figma sesuai kebutuhan klien dan tim produk.',
                'Mengubah desain Figma menjadi tampilan web yang responsif dan fungsional menggunakan HTML, CSS, dan JavaScript.',
                'Mengoptimalkan performa halaman web agar cepat, ringan, dan kompatibel di berbagai perangkat dan browser.',
            ],
        },
    ],

    // images: daftar path gambar, contoh ['assets/images/projects/bali-pearl-1.jpg']. Gambar pertama jadi cover.
    projects: [
        {
            name: 'Bali Pearl',
            slug: 'bali-pearl',
            category: 'E-Commerce',
            description: 'Website e-commerce yang dikembangkan dan dideploy ke shared hosting saat bekerja di Bali Gatra.',
            tags: ['Laravel', 'E-Commerce'],
            images: [],
            tasks: [
                'Membangun modul katalog produk dan halaman detail produk.',
                'Mengembangkan alur keranjang belanja dan checkout.',
                'Melakukan deploy aplikasi ke shared hosting.',
            ],
            features: ['Katalog & pencarian produk', 'Keranjang belanja', 'Checkout & riwayat pesanan', 'payment gateway doku & paypal'],
            stack: ['Laravel', 'MySQL', 'Tailwind CSS', 'JavaScript'],
        },
        {
            name: 'Creb',
            slug: 'creb',
            category: 'Web App',
            description: 'Website admin dan API untuk aplikasi Creb, sebuah aplikasi pencari driver (find driver).',
            tags: ['Laravel', 'API', 'Admin Panel'],
            images: [],
            tasks: [
                'Membangun REST API untuk kebutuhan aplikasi mobile pencari driver.',
                'Mengembangkan dashboard admin untuk memantau data driver dan order.',
            ],
            features: ['Manajemen data driver', 'Monitoring order & perjalanan', 'API terintegrasi dengan aplikasi mobile'],
            stack: ['Laravel', 'MySQL', 'Tailwind CSS', 'REST API'],
        },
        {
            name: 'Balivalas',
            slug: 'balivalas',
            category: 'Admin Panel',
            description: 'Website admin untuk pencatatan transaksi bulanan.',
            tags: ['Laravel', 'Admin Panel'],
            images: [],
            tasks: [
                'Membangun form input dan validasi transaksi bulanan.',
                'Membuat laporan rekap data dalam bentuk tabel.',
            ],
            features: ['Input transaksi bulanan', 'Rekap & laporan data'],
            stack: ['Laravel', 'MySQL', 'Bootstrap'],
        },
        {
            name: 'Sanur Cycle',
            slug: 'sanur-cycle',
            category: 'Maintenance',
            description: 'Perbaikan bug dan maintenance website sebagai freelance developer.',
            tags: ['Bug Fixing', 'Maintenance'],
            images: [],
            tasks: [
                'Menganalisis dan memperbaiki bug pada fitur yang sudah berjalan.',
                'Melakukan maintenance rutin sebagai freelance developer.',
            ],
            features: ['Perbaikan bug', 'Peningkatan stabilitas sistem'],
            stack: ['JavaScript', 'PHP', 'jQuery'],
        },
        {
            name: 'E-Learning SMP Negeri 2 Kuta Utara',
            slug: 'e-learning-smp-negeri-2-kuta-utara',
            category: 'Education',
            description: 'Website pembelajaran daring untuk sekolah, dikerjakan selama 5 bulan sebagai freelance.',
            tags: ['Freelance', 'E-Learning'],
            images: [],
            tasks: [
                'Merancang struktur materi pembelajaran online.',
                'Mengembangkan sistem manajemen kelas dan tugas.',
            ],
            features: ['Materi & modul pembelajaran', 'Pengumpulan tugas online', 'Manajemen kelas & siswa'],
            stack: ['Laravel', 'MySQL', 'Bootstrap'],
        },
        {
            name: 'Iron Handicraft',
            slug: 'iron-handicraft',
            category: 'E-Commerce',
            description: 'Website e-commerce lengkap dengan admin panel dan landing page, dikerjakan selama 3 bulan.',
            tags: ['Freelance', 'E-Commerce'],
            images: [],
            tasks: [
                'Membangun landing page company profile.',
                'Mengembangkan admin panel untuk kelola produk.',
            ],
            features: ['Landing page produk', 'Admin panel manajemen produk'],
            stack: ['Laravel', 'MySQL', 'Tailwind CSS'],
        },
        {
            name: 'Kutus-Kutus',
            slug: 'kutus-kutus',
            category: 'Company Profile',
            description: 'Website portofolio perusahaan lengkap dengan admin panel, dikerjakan selama 2 bulan.',
            tags: ['Freelance', 'Company Profile'],
            images: [],
            tasks: [
                'Membangun website portofolio perusahaan.',
                'Mengembangkan admin panel untuk update konten.',
            ],
            features: ['Halaman profil perusahaan', 'Admin panel kelola konten'],
            stack: ['Laravel', 'MySQL', 'Bootstrap'],
        },
        {
            name: 'GKPB Jemaat Tirta Amerta Pelambingan',
            slug: 'gkpb-jemaat-tirta-amerta-pelambingan',
            category: 'Management System',
            description: 'Website manajemen jemaat gereja, dikerjakan selama 2 bulan.',
            tags: ['Freelance', 'Management System'],
            images: [],
            tasks: [
                'Membangun sistem pendataan jemaat gereja.',
                'Mengembangkan fitur manajemen kegiatan/jadwal.',
            ],
            features: ['Data jemaat', 'Manajemen kegiatan & jadwal gereja'],
            stack: ['Laravel', 'MySQL', 'Bootstrap'],
        },
        {
            name: 'Duta Orchid Garden',
            slug: 'duta-orchid-garden',
            category: 'Company Profile',
            description: 'Website profil perusahaan dengan admin panel, dikerjakan selama 2 bulan.',
            tags: ['Freelance', 'Company Profile'],
            images: [],
            tasks: [
                'Membangun website profil perusahaan.',
                'Mengembangkan admin panel untuk kelola konten & galeri.',
            ],
            features: ['Halaman profil perusahaan', 'Admin panel kelola konten & galeri'],
            stack: ['Laravel', 'MySQL', 'Tailwind CSS'],
        },
    ],

    techStack: [
        { name: 'Languages & Frameworks', skills: ['Laravel', 'JavaScript', 'PHP', 'jQuery'] },
        { name: 'Styling', skills: ['Tailwind CSS', 'Bootstrap'] },
        { name: 'Design & Tools', skills: ['Figma', 'Git'] },
    ],
};
