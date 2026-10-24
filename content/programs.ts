import type { Program } from '../types/content';

export const programs: Program[] = [
  {
    slug: 'library',
    title: { value: 'Library', isPlaceholder: false },
    description: {
      value: 'We support schools in setting up or revitalizing their libraries into engaging and inspiring learning spaces. Our goal is to create environments where students go beyond exam preparation to develop a genuine love of learning, discover new interests, and gain knowledge and confidence.',
      isPlaceholder: false,
    },
    category: 'Learning & Education',
    image: {
      src: '/images/programs/secondary-students-library.jpeg',
      alt: 'Nigerian secondary school students engaged in reading and study inside the school library',
      ratio: '16:9',
      description: 'Students in a modern, quiet study library',
      isPlaceholder: false,
    },
    featured: true,
    introduction: {
      value: 'We support schools in setting up or revitalizing their libraries into engaging and inspiring learning spaces. Our goal is to create environments where students go beyond exam preparation to develop a genuine love of learning, discover new interests, and gain knowledge and confidence.',
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
      value: 'We create vibrant Resource Centres in schools and communities, giving young people welcoming spaces to learn, explore, build new skills, embrace creativity and develop lifelong skills to succeed in both school and life.',
      isPlaceholder: false,
    },
    category: 'Digital Skills',
    image: {
      src: '/images/programs/secondary-students-computer-lab.jpeg',
      alt: 'Nigerian secondary school students in uniform learning digital skills on computers in the school resource center',
      ratio: '16:9',
      description: 'Resource center computer lab',
      isPlaceholder: false,
    },
    featured: false,
    introduction: {
      value: 'We create vibrant Resource Centres in schools and communities, giving young people welcoming spaces to learn, explore, build new skills, embrace creativity and develop lifelong skills to succeed in both school and life.',
      isPlaceholder: false,
    },
    whatItDoes: {
      value:
        'Provides educational materials, digital learning resources, and a welcoming space that encourages reading, research, and self-development. It also offers practical activities and creative projects that help young people discover their talents and develop useful skills.',
      isPlaceholder: false,
    },
    whoItServes: {
      value:
        'Students, and aspiring innovators who need reliable access to broadband internet, educational media and performing space.',
      isPlaceholder: false,
    },
    objectives: [
      {
        value:
          'Eliminate barriers that prevent youngsters from discovering their potential at an early stage.',
        isPlaceholder: false,
      },
      {
        value:
          'To provide young people with opportunities to discover their talents, develop practical skills, and transform their ideas into creative solutions and productive ventures.',
        isPlaceholder: false,
      },
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
      value: 'We establish vocational centres that provide young people with practical skills, creative opportunities, and hands-on training to support career development, entrepreneurship, and economic independence.',
      isPlaceholder: false,
    },
    category: 'Skills Development',
    image: {
      src: '/images/programs/secondary-students-vocational-workshop.jpeg',
      alt: 'Nigerian secondary school students in uniform participating in practical vocational craft and tailoring training',
      ratio: '16:9',
      description: 'Vocational workshop session',
      isPlaceholder: false,
    },
    featured: false,
    introduction: {
      value: 'We establish vocational centres that provide young people with practical skills, creative opportunities, and hands-on training to support career development, entrepreneurship, and economic independence.',
      isPlaceholder: false,
    },
    whatItDoes: {
      value:
        'Provides hands-on training in skills like making things with digital tools, crafts, electronics, tailoring, and how to start and manage a small business.',
      isPlaceholder: false,
    },
    whoItServes: {
      value:
        'Secondary school students and leavers, non-formal learners, and creative makers eager to turn practical skills into viable commercial enterprises.',
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
    title: { value: 'Career Mentorship', isPlaceholder: false },
    description: {
      value: 'Through guidance, mentorship, and exposure to diverse career paths, we connect young people with knowledge, experiences, and role models that inspire them to set meaningful goals and pursue careers aligned with their interests, talents, and potential.',
      isPlaceholder: false,
    },
    category: 'Mentorship & Personal Development',
    image: {
      src: '/images/programs/secondary-students-career-mentorship.jpeg',
      alt: 'Nigerian secondary school students in uniform receiving career mentorship and educational guidance from a mentor',
      ratio: '16:9',
      description: 'Personal mentorship and coaching session',
      isPlaceholder: false,
    },
    featured: false,
    introduction: {
      value: 'Through guidance, mentorship, and exposure to diverse career paths, we connect young people with knowledge, experiences, and role models that inspire them to set meaningful goals and pursue careers aligned with their interests, talents, and potential.',
      isPlaceholder: false,
    },
    whatItDoes: {
      value:
        'Provides 6–12 months of mentorship, career talks, guidance on choosing courses and universities, and training on good values and leadership skills.',
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
