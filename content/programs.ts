import type { Program } from '../types/content';

export const programs: Program[] = [
  {
    slug: 'library',
    title: { value: 'Library', isPlaceholder: false },
    description: {
      value: 'A well-stocked literary sanctuary providing curriculum texts, literature, and quiet study spaces to cultivate reading and academic inquiry.',
      isPlaceholder: false,
    },
    category: 'Learning & Education',
    image: {
      src: '/images/programs/youths-collaborating-at-computers.jpeg',
      alt: 'Students engaged in study and collaborative reading inside the library',
      ratio: '16:9',
      description: 'Students in a modern, quiet study library',
      isPlaceholder: false,
    },
    featured: true,
    introduction: {
      value: 'Our community library offers a calm, well-resourced learning sanctuary for students and lifelong learners. By making textbooks, literature, and scholarly reference materials accessible to all, we foster a deep, lifelong passion for reading, independent discovery, and critical thought.',
      isPlaceholder: false,
    },
    whatItDoes: {
      value: 'Houses an expanding collection of academic textbooks, African literature, reference works, and digital cataloguing. It hosts book clubs, reading circles, guided study hours, and early-grade literacy sessions.',
      isPlaceholder: false,
    },
    whoItServes: {
      value: 'Primary and secondary school students, independent researchers, teachers, and community members seeking educational literature in a quiet learning environment.',
      isPlaceholder: false,
    },
    objectives: [
      { value: 'Cultivate strong literacy skills and reading habits from early childhood through secondary education.', isPlaceholder: false },
      { value: 'Provide free, equitable access to costly academic textbooks and examination prep materials.', isPlaceholder: false },
      { value: 'Create a safe, distraction-free environment for concentrated homework and collaborative study.', isPlaceholder: false },
    ],
    activities: [
      { value: 'Curriculum textbook lending and research referencing.', isPlaceholder: false },
      { value: 'Weekly student book clubs and analytical reading circles.', isPlaceholder: false },
      { value: 'Quiet study sessions and exam preparation clinics.', isPlaceholder: false },
      { value: 'Literacy improvement workshops for underserved children.', isPlaceholder: false },
    ],
    isPlaceholder: false,
  },
  {
    slug: 'resource-center',
    title: { value: 'Resource Center', isPlaceholder: false },
    description: {
      value: 'High-speed internet workstations, digital learning tools, and research databases bridging the digital divide for young researchers.',
      isPlaceholder: false,
    },
    category: 'Digital Skills',
    image: {
      src: '/images/programs/woman-coding-on-laptop.jpeg',
      alt: 'Young learner operating a computer workstation in the resource center',
      ratio: '16:9',
      description: 'Resource center computer lab',
      isPlaceholder: false,
    },
    featured: false,
    introduction: {
      value: 'The Ecodite Resource Center delivers open digital access to young minds who lack reliable internet and computing hardware at home. Equipped with modern computers, printing hubs, and curated research platforms, it empowers students to bridge the digital divide.',
      isPlaceholder: false,
    },
    whatItDoes: {
      value: 'Provides desktop computer terminals, high-speed broadband, printing/scanning services, and educational software for school assignments, university applications, and online skill development.',
      isPlaceholder: false,
    },
    whoItServes: {
      value: 'Students, young jobseekers, and aspiring innovators who need reliable access to computer hardware, broadband internet, and educational media.',
      isPlaceholder: false,
    },
    objectives: [
      { value: 'Eliminate technological barriers that prevent youth from completing school research and online coursework.', isPlaceholder: false },
      { value: 'Equip learners with day-to-day computer proficiency, document authoring, and web navigation skills.', isPlaceholder: false },
      { value: 'Facilitate university admissions applications, scholarship research, and educational discovery.', isPlaceholder: false },
    ],
    activities: [
      { value: 'Open-access computer labs for academic research and assignments.', isPlaceholder: false },
      { value: 'Computer literacy fundamentals training and office suite classes.', isPlaceholder: false },
      { value: 'Online scholarship search and tertiary institution application clinics.', isPlaceholder: false },
      { value: 'Educational software simulations and multimedia learning sessions.', isPlaceholder: false },
    ],
    isPlaceholder: false,
  },
  {
    slug: 'vocational-training',
    title: { value: 'Vocational Training', isPlaceholder: false },
    description: {
      value: 'Hands-on practical crafts, technical trades, and market-ready enterprise skills driving youth self-reliance and economic independence.',
      isPlaceholder: false,
    },
    category: 'Skills Development',
    image: {
      src: '/images/programs/teenager-using-digital-drawing-tablet.jpeg',
      alt: 'Youth participating in practical vocational craft training',
      ratio: '16:9',
      description: 'Vocational workshop session',
      isPlaceholder: false,
    },
    featured: false,
    introduction: {
      value: 'Our Vocational Training programme bridges education and economic self-sufficiency. Through rigorous hands-on instruction in marketable crafts, creative media, and technical trades, we equip young people with the tangible skills needed to create sustainable livelihoods.',
      isPlaceholder: false,
    },
    whatItDoes: {
      value: 'Conducts intensive apprenticeships and modular training courses covering digital fabrication, craft production, electronics, tailoring, and micro-business management.',
      isPlaceholder: false,
    },
    whoItServes: {
      value: 'Secondary school leavers, non-formal learners, unemployed youth, and creative makers eager to turn practical skills into viable commercial enterprises.',
      isPlaceholder: false,
    },
    objectives: [
      { value: 'Equip young people with market-demanded artisan and technical competencies.', isPlaceholder: false },
      { value: 'Foster entrepreneurial capability, financial literacy, and product pricing knowledge.', isPlaceholder: false },
      { value: 'Create sustainable paths from skills training into formal employment or self-initiated enterprise.', isPlaceholder: false },
    ],
    activities: [
      { value: 'Practical hands-on technical workshop series with experienced craftsmen.', isPlaceholder: false },
      { value: 'Entrepreneurship foundations, bookkeeping, and customer relations training.', isPlaceholder: false },
      { value: 'Product showcase exhibitions and market linkage support.', isPlaceholder: false },
      { value: 'Toolkits and starter assistance for standout vocational graduates.', isPlaceholder: false },
    ],
    isPlaceholder: false,
  },
  {
    slug: 'mentorship',
    title: { value: 'Mentorship', isPlaceholder: false },
    description: {
      value: 'One-on-one professional guidance, career roadmapping, and ethical leadership development connecting youth with accomplished role models.',
      isPlaceholder: false,
    },
    category: 'Mentorship & Personal Development',
    image: {
      src: '/images/programs/adults-reviewing-project-on-tablet.jpeg',
      alt: 'Mentor providing career guidance to an ambitious student',
      ratio: '16:9',
      description: 'Personal mentorship and coaching session',
      isPlaceholder: false,
    },
    featured: false,
    introduction: {
      value: 'Behind every transformative journey is a mentor who believed first. The Ecodite Mentorship Programme matches ambitious young minds with accomplished professionals, creating empowering relationships that nurture leadership, ethical grounding, and ambitious career ambitions.',
      isPlaceholder: false,
    },
    whatItDoes: {
      value: 'Facilitates tailored 6-to-12 month mentoring cohorts, career discovery panel sessions, university pathway guidance, and ethical leadership seminars.',
      isPlaceholder: false,
    },
    whoItServes: {
      value: 'Secondary and tertiary students seeking career direction, personal development support, and exposure to professional networks.',
      isPlaceholder: false,
    },
    objectives: [
      { value: 'Build confidence, self-awareness, and emotional resilience in young emerging leaders.', isPlaceholder: false },
      { value: 'Demystify diverse career paths across technology, business, sciences, and public service.', isPlaceholder: false },
      { value: 'Instill high ethical standards, civic responsibility, and community mindset.', isPlaceholder: false },
    ],
    activities: [
      { value: 'One-on-one virtual and in-person monthly mentoring sessions.', isPlaceholder: false },
      { value: 'Quarterly career immersion workshops and guest leadership lectures.', isPlaceholder: false },
      { value: 'Resume building, portfolio reviews, and mock interview clinics.', isPlaceholder: false },
      { value: 'Peer-to-peer leadership circles and collaborative community initiatives.', isPlaceholder: false },
    ],
    isPlaceholder: false,
  },
];
