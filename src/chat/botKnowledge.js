export const intents = [
  {
    id: 'greeting',
    patterns: ['hi', 'hello', 'salam', 'hey', 'good morning', 'good evening', 'good afternoon', 'howdy', 'greetings', 'sup'],
    answer: "Hello! 👋 Welcome! I'm Maruf's assistant. How can I help you today?",
    quickReplies: ['Services', 'Pricing', 'Timeline', 'Portfolio', 'Book a Meeting'],
  },
  {
    id: 'services',
    patterns: ['service', 'what do you do', 'what can you do', 'what do you offer'],
    answer: "Maruf offers web, mobile, SaaS, and custom software development. Which area are you interested in?",
    quickReplies: ['Website Development', 'Mobile App Development', 'SaaS Development', 'Custom Software', 'UI/UX Design'],
  },
  {
    id: 'custom_software',
    patterns: ['custom software', 'erp', 'crm', 'admin dashboard', 'business tool', 'booking system'],
    answer: "Maruf builds tailor-made software — ERPs, CRMs, admin dashboards, booking systems — matched to your exact workflow.",
    flow: 'saas',
  },
  {
    id: 'website',
    patterns: ['website', 'web app', 'landing page', 'web development', 'develop website'],
    answer: "Maruf builds modern, fast, responsive websites and web apps — from landing pages to full-stack platforms.",
    flow: 'website',
  },
  {
    id: 'mobile_app',
    patterns: ['mobile app', 'android', 'ios', 'cross-platform', 'flutter', 'react native'],
    answer: "Maruf builds cross-platform apps for Android and iOS using Flutter or React Native — clean UIs, smooth performance.",
    flow: 'mobile_app',
  },
  {
    id: 'saas',
    patterns: ['saas', 'software as a service', 'subscription platform', 'multi-tenant'],
    answer: "Maruf builds SaaS platforms with multi-tenancy, subscription billing, role-based access, and scalable backends.",
    flow: 'saas',
  },
  {
    id: 'technologies',
    patterns: ['technology', 'tech stack', 'what language', 'what framework', 'frontend', 'backend'],
    answer: "Maruf works with a modern full-stack lineup. Which layer would you like to know more about?",
    quickReplies: ['Frontend', 'Backend', 'Mobile', 'Database', 'Cloud / Deployment'],
  },
  {
    id: 'pricing',
    patterns: ['price', 'cost', 'how much', 'budget', 'rate', 'fee', 'charge'],
    answer: null,
    flow: 'pricing',
  },
  {
    id: 'timeline',
    patterns: ['timeline', 'how long', 'duration', 'delivery', 'deadline', 'when will'],
    answer: null,
    flow: 'timeline',
  },
  {
    id: 'portfolio',
    patterns: ['portfolio', 'previous work', 'examples', 'past project', 'sample'],
    answer: null,
    flow: 'portfolio',
  },
  {
    id: 'support',
    patterns: ['support', 'maintenance', 'after delivery', 'post launch', 'bug fix'],
    answer: "Yes! Maruf provides post-launch support — bug fixes, performance monitoring, feature updates, and priority response.",
    quickReplies: ['Get support plan', 'Book a meeting', 'Share my project'],
  },
  {
    id: 'existing_system',
    patterns: ['maintain', 'existing system', 'upgrade', 'legacy', 'extend', 'improve existing'],
    answer: "Maruf regularly takes on existing systems for upgrades, refactoring, or feature extension — even legacy codebases.",
    quickReplies: ['Discuss my system', 'Get pricing', 'Book a meeting'],
  },
  {
    id: 'redesign',
    patterns: ['redesign', 'ui/ux', 'user experience', 'interface', 'ux design'],
    answer: "Maruf offers UI/UX redesign services — from wireframing and prototyping to full visual redesigns.",
    quickReplies: ['See examples', 'Get pricing', 'Book a meeting'],
  },
  {
    id: 'book_meeting',
    patterns: ['book', 'meeting', 'schedule', 'call', 'appointment'],
    answer: null,
    flow: 'book_meeting',
  },
  {
    id: 'talk_human',
    patterns: ['human', 'real person', 'talk to someone', 'speak to maruf', 'live agent'],
    answer: null,
    flow: 'talk_human',
  },
  {
    id: 'international',
    patterns: ['outside', 'remote', 'overseas', 'different country', 'international client'],
    answer: "Absolutely! Maruf works with clients globally — Middle East, Europe, North America, and beyond. Time zones are no barrier! 🌍",
    quickReplies: ['Start a project', 'Book a meeting'],
  },
  {
    id: 'nda',
    patterns: ['nda', 'confidential', 'non-disclosure', 'agreement'],
    answer: "Client confidentiality is taken seriously. Maruf is happy to sign an NDA before any discussion.",
    quickReplies: ['Book a meeting', 'Share my idea'],
  },
  {
    id: 'api_integration',
    patterns: ['api', 'integration', 'third-party', 'payment gateway', 'stripe', 'maps'],
    answer: "Maruf integrates third-party APIs — payment gateways, Google Maps, SMS/email services, social logins, and more.",
    quickReplies: ['Discuss integration', 'Get pricing', 'Book a meeting'],
  },
  {
    id: 'hosting',
    patterns: ['hosting', 'deployment', 'server', 'cloud', 'ssl', 'domain', 'go-live'],
    answer: "Maruf handles full deployment — SSL, domain config, CI/CD pipelines, and cloud management (AWS, Vercel, DigitalOcean).",
    quickReplies: ['Get pricing', 'Book a meeting'],
  },
  {
    id: 'get_started',
    patterns: ['get started', 'how to start', 'begin', 'start project', 'process', 'next step'],
    answer: "Here's how to start: Share your idea → Free consultation → Detailed proposal → Kick off!",
    quickReplies: ['Share my idea', 'Get pricing', 'Book a meeting'],
  },
]

export const flows = {
  global_followup: [
    {
      question: 'Would you like me to guide you based on your idea?',
      quickReplies: ['I have an idea', 'I need pricing', 'I want timeline', 'Show me similar work', 'Book a meeting'],
      routes: {
        'I have an idea':       'lead_capture',
        'I need pricing':       'pricing',
        'I want timeline':      'timeline',
        'Show me similar work': 'portfolio',
        'Book a meeting':       'book_meeting',
      },
    },
  ],

  mobile_app: [
    {
      question: 'What type of app are you planning?',
      quickReplies: ['Business App', 'Marketplace App', 'Service Booking App', 'Internal Company App', "I'm not sure"],
    },
    {
      question: 'What are the main features you are expecting?',
      quickReplies: ['User login / accounts', 'Payments', 'Live tracking', 'Chat / messaging', 'Admin dashboard', 'Custom features'],
    },
    {
      question: 'I can give you a proper estimate based on your idea. What would you like next?',
      quickReplies: ['Get rough pricing', 'Get timeline', 'Share my idea', 'Book a meeting'],
      routes: {
        'Get rough pricing': 'pricing',
        'Get timeline':      'timeline',
        'Share my idea':     'lead_capture',
        'Book a meeting':    'book_meeting',
      },
    },
  ],

  website: [
    {
      question: 'What type of website do you need?',
      quickReplies: ['Business Website', 'E-commerce', 'Landing Page', 'Portal / Dashboard', 'Not sure'],
    },
    {
      question: 'Do you already have content / design, or need everything from scratch?',
      quickReplies: ['From scratch', 'I have content', 'I have design', 'Need redesign'],
    },
    {
      question: 'I can suggest the best structure and cost for your website.',
      quickReplies: ['Get pricing', 'See examples', 'Get timeline', 'Book a meeting'],
      routes: {
        'Get pricing':    'pricing',
        'See examples':   'portfolio',
        'Get timeline':   'timeline',
        'Book a meeting': 'book_meeting',
      },
    },
  ],

  saas: [
    {
      question: 'Are you planning to build a SaaS product for:',
      quickReplies: ['Your own business', 'Selling to customers (subscription)', 'Internal company system', 'Not sure'],
    },
    {
      question: 'Do you need a multi-user system with roles and dashboard?',
      quickReplies: ['Yes', 'No', 'Not sure'],
    },
    {
      question: 'Do you want this as a scalable SaaS (ready for multiple clients)?',
      quickReplies: ['Yes (SaaS model)', 'No (single company use)', 'Need guidance'],
    },
    {
      question: 'This type of system needs proper planning. What would you like to do next?',
      quickReplies: ['Get estimation', 'Discuss architecture', 'Share idea', 'Book meeting'],
      routes: {
        'Get estimation': 'pricing',
        'Share idea':     'lead_capture',
        'Book meeting':   'book_meeting',
      },
    },
  ],

  pricing: [
    {
      question: 'To give accurate pricing, I need a quick idea about your project. What type is it?',
      quickReplies: ['Website', 'Mobile App', 'SaaS System', 'Custom Software'],
    },
    {
      question: 'What level are you planning?',
      quickReplies: ['Basic', 'Medium', 'Advanced'],
    },
    {
      question: 'I can give you a rough estimate or a detailed quotation. Which do you prefer?',
      quickReplies: ['Rough estimate', 'Detailed proposal', 'Talk to human'],
      routes: {
        'Rough estimate':    'lead_capture',
        'Detailed proposal': 'lead_capture',
        'Talk to human':     'talk_human',
      },
    },
  ],

  timeline: [
    {
      question: 'What type of project timeline do you want to know about?',
      quickReplies: ['Website', 'App', 'SaaS', 'Custom system'],
    },
    {
      question: 'Do you want a fast MVP or a full system?',
      quickReplies: ['MVP (fast launch)', 'Full system', 'Not sure'],
    },
    {
      question: 'I can break this into phases and a timeline for you.',
      quickReplies: ['Show timeline', 'Book meeting', 'Share idea'],
      routes: {
        'Show timeline': 'lead_capture',
        'Book meeting':  'book_meeting',
        'Share idea':    'lead_capture',
      },
    },
  ],

  portfolio: [
    {
      question: 'What type of work do you want to see?',
      quickReplies: ['Web apps', 'Mobile apps', 'SaaS platforms', 'UI/UX design'],
    },
    {
      question: 'Do you want something similar to your own idea?',
      quickReplies: ['Yes', 'Not sure', 'Just browsing'],
    },
    {
      question: 'I can suggest similar solutions based on your need.',
      quickReplies: ['Show examples', 'Share idea', 'Book meeting'],
      routes: {
        'Share idea':  'lead_capture',
        'Book meeting': 'book_meeting',
      },
    },
  ],

  confused: [
    {
      question: 'No problem — I will guide you. What best describes your situation?',
      quickReplies: ["I have an idea but it's not clear", 'I want to build something like another app', 'I need a suggestion', 'Talk to human'],
      routes: {
        "I have an idea but it's not clear": 'lead_capture',
        'Talk to human': 'talk_human',
      },
    },
    {
      question: 'Tell me in one line what you are thinking, and I will guide you from there.',
      quickReplies: [],
    },
  ],

  lead_capture: [], // handled by leadCaptureSteps
}

export const leadCaptureSteps = [
  {
    field: 'name',
    question: 'What is your name?',
  },
  {
    field: 'contact',
    question: 'What is your email or WhatsApp number?',
  },
  {
    field: 'idea',
    question: 'Describe your project idea in one or two sentences.',
  },
  {
    field: 'platform',
    question: 'Which platform do you need?',
    quickReplies: ['Web', 'Mobile', 'Both', 'Desktop'],
  },
  {
    field: 'budget',
    question: 'Do you have an estimated budget range?',
    quickReplies: ['Under $1K', '$1K–$5K', '$5K–$20K', '$20K+', "Let's discuss"],
  },
  {
    field: 'meeting',
    question: 'Would you like to book a meeting to discuss further?',
    quickReplies: ['Yes, book a meeting', "No, I'll wait for a reply"],
  },
]

export const leadTriggerPatterns = [
  'i need', 'i want', 'build me', 'develop', 'create', 'make a',
  'project', 'quote', 'quotation', 'requirement', 'i have a project', 'interested in',
]

export const finalConversionBlock = {
  text: 'I can guide you properly and give exact cost + timeline.',
  quickReplies: ['Share my requirement', 'Book a meeting', 'Talk to human now'],
  routes: {
    'Share my requirement': 'lead_capture',
    'Book a meeting':       'book_meeting',
    'Talk to human now':    'talk_human',
  },
}

export const proTipMessage = {
  text: 'Looks like you have a real project in mind. Want to jump on a quick discussion and save time?',
  quickReplies: ['Yes, book meeting', 'Continue here', 'Share details first'],
  routes: {
    'Yes, book meeting':   'book_meeting',
    'Share details first': 'lead_capture',
  },
}
