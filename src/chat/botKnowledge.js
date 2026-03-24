export const intents = [
  {
    id: 'greeting',
    patterns: ['hi', 'hello', 'salam', 'hey', 'good morning', 'good evening', 'good afternoon', 'howdy', 'greetings', 'sup'],
    answer: "Hello! 👋 Welcome! I'm Maruf's assistant. How can I help you today? Feel free to ask about services, pricing, timelines, or anything else.",
    quickReplies: ['Services', 'Pricing', 'Timeline', 'Portfolio', 'Book a Meeting'],
  },
  {
    id: 'services',
    patterns: ['service', 'what do you do', 'what can you do', 'what do you offer'],
    answer: "Maruf offers a wide range of software development services. Which area are you interested in?",
    quickReplies: ['Website Development', 'Mobile App Development', 'SaaS Development', 'Custom Software', 'UI/UX Design'],
  },
  {
    id: 'custom_software',
    patterns: ['custom software', 'erp', 'crm', 'admin dashboard', 'business tool', 'booking system'],
    answer: "Maruf builds tailor-made software solutions — ERPs, CRMs, admin dashboards, booking systems, and more. Every tool is built to match your specific workflow and business requirements. Would you like to share your project details?",
  },
  {
    id: 'website',
    patterns: ['website', 'web app', 'landing page', 'web development', 'develop website'],
    answer: "Maruf develops modern, fast, and responsive websites and web applications — from landing pages to full-stack web apps. Built with Vue, React, or other frameworks depending on your needs. Want to get a quote?",
  },
  {
    id: 'mobile_app',
    patterns: ['mobile app', 'android', 'ios', 'cross-platform', 'flutter', 'react native'],
    answer: "Maruf builds cross-platform mobile apps for Android and iOS using Flutter or React Native. Clean UIs, smooth performance, and real-world functionality. Want to discuss your app idea?",
  },
  {
    id: 'saas',
    patterns: ['saas', 'software as a service', 'subscription platform', 'multi-tenant'],
    answer: "Maruf has experience building SaaS platforms with multi-tenancy, subscription billing, role-based access, and scalable backends. If you have a SaaS idea, let's explore it together!",
  },
  {
    id: 'technologies',
    patterns: ['technology', 'tech stack', 'what language', 'what framework', 'frontend', 'backend'],
    answer: "Maruf works with a modern, full-stack tech lineup. Which layer would you like to know more about?",
    quickReplies: ['Frontend', 'Backend', 'Mobile', 'Database', 'Cloud / Deployment'],
  },
  {
    id: 'pricing',
    patterns: ['price', 'cost', 'how much', 'budget', 'rate', 'fee', 'charge'],
    answer: "Pricing depends on project scope and complexity. Here's a rough guide — which type of project are you planning?",
    quickReplies: ['Basic Website', 'Business Website', 'Mobile App', 'SaaS Platform', 'Custom Quotation'],
  },
  {
    id: 'timeline',
    patterns: ['timeline', 'how long', 'duration', 'delivery', 'deadline', 'when will'],
    answer: "Delivery timelines vary by project size and complexity. Which type of project timeline are you asking about?",
    quickReplies: ['Website', 'Mobile App', 'SaaS Product', 'Redesign Project', 'Support / Maintenance'],
  },
  {
    id: 'portfolio',
    patterns: ['portfolio', 'previous work', 'examples', 'past project', 'sample'],
    answer: "You can explore Maruf's work right here on this portfolio site! Scroll through the Projects section to see live demos and case studies. Want Maruf to personally walk you through any specific project?",
  },
  {
    id: 'support',
    patterns: ['support', 'maintenance', 'after delivery', 'post launch', 'bug fix'],
    answer: "Yes! Maruf provides post-launch support and maintenance packages. This includes bug fixes, performance monitoring, feature updates, and priority response. Would you like details on a support plan?",
  },
  {
    id: 'existing_system',
    patterns: ['maintain', 'existing system', 'upgrade', 'legacy', 'extend', 'improve existing'],
    answer: "Maruf regularly takes on existing systems for upgrades, refactoring, or feature extension — even legacy codebases. Share more about your current system and what you'd like improved.",
  },
  {
    id: 'redesign',
    patterns: ['redesign', 'ui/ux', 'user experience', 'interface', 'ux design'],
    answer: "A great user experience can transform how people engage with your product. Maruf offers UI/UX redesign services — from wireframing and prototyping to full visual redesigns. Want to share what you have currently?",
  },
  {
    id: 'book_meeting',
    patterns: ['book', 'meeting', 'schedule', 'call', 'appointment'],
    answer: "Absolutely! You can book a meeting with Maruf to discuss your project in detail. How would you like to proceed?",
    quickReplies: ['Share My Requirement', 'Request a Meeting', 'Leave Contact Details'],
  },
  {
    id: 'talk_human',
    patterns: ['human', 'real person', 'talk to someone', 'speak to maruf', 'live agent'],
    answer: "Understood! Maruf will connect with you directly as soon as possible. You can also reach him immediately via WhatsApp 📲 +966510609881. In the meantime, feel free to leave your details and he'll get back to you.",
  },
  {
    id: 'international',
    patterns: ['outside', 'remote', 'overseas', 'different country', 'international client'],
    answer: "Absolutely! Maruf works with clients globally — across the Middle East, Europe, North America, and beyond. All communication and delivery is handled remotely with full transparency. Time zones are no barrier! 🌍",
  },
  {
    id: 'nda',
    patterns: ['nda', 'confidential', 'non-disclosure', 'agreement'],
    answer: "Client confidentiality is taken very seriously. Maruf is happy to sign an NDA before any project discussion. Just let him know and it can be arranged before sharing any sensitive details.",
  },
  {
    id: 'api_integration',
    patterns: ['api', 'integration', 'third-party', 'payment gateway', 'stripe', 'maps'],
    answer: "Maruf has extensive experience integrating third-party APIs — payment gateways (Stripe, PayPal, Moyasar), Google Maps, SMS/email services, social logins, and more. What integration do you need?",
  },
  {
    id: 'hosting',
    patterns: ['hosting', 'deployment', 'server', 'cloud', 'ssl', 'domain', 'go-live'],
    answer: "Maruf handles full deployment — from server setup to SSL certificates, domain configuration, CI/CD pipelines, and ongoing cloud management (AWS, Vercel, DigitalOcean, etc.). Going live is part of the service.",
  },
  {
    id: 'get_started',
    patterns: ['get started', 'how to start', 'begin', 'start project', 'process', 'next step'],
    answer: "Great! Here's how to get started: Share your project idea → Get a free consultation → Receive a detailed proposal → Kick off! Which step would you like to take now?",
    quickReplies: ['Share Requirement', 'Get Quotation', 'Book a Meeting'],
  },
]

export const followUpSets = {
  general: {
    question: "Can you tell me which area you need help with?",
    options: ['Website Development', 'Mobile App', 'SaaS / Platform', 'Custom Software', 'UI/UX Design', 'API Integration', 'Support / Maintenance'],
  },
  pricing: {
    question: "To guide you better, what type of project are you planning?",
    options: ['Basic Website', 'Business Website / Web App', 'Mobile App', 'SaaS Platform', 'Custom Software', 'Custom Quotation'],
  },
  timeline: {
    question: "What kind of project timeline do you want to know about?",
    options: ['Website', 'Mobile App', 'SaaS Product', 'Redesign Project', 'Support / Maintenance'],
  },
  service: {
    question: "Please select the service you are interested in.",
    options: ['Website Development', 'Mobile App Development', 'SaaS Development', 'Custom Software', 'UI/UX Design', 'API Integration'],
  },
  lead: {
    question: "Would you like to share your project details so I can guide you better?",
    options: ["Yes, I'll share now", 'Book a Meeting', 'Talk to Human Later'],
  },
}

export const leadCaptureSteps = [
  {
    field: 'projectType',
    question: "What type of project do you need?",
    quickReplies: ['Web App', 'Mobile App', 'SaaS Platform', 'Custom Software', 'UI/UX Design'],
  },
  {
    field: 'isNew',
    question: "Is this a new project or an existing system upgrade?",
    quickReplies: ['New Project', 'Upgrade Existing'],
  },
  {
    field: 'goal',
    question: "What is the main goal of the project? (Briefly describe what it should do)",
  },
  {
    field: 'platform',
    question: "Which platform do you need?",
    quickReplies: ['Web', 'Mobile', 'Both', 'Desktop'],
  },
  {
    field: 'features',
    question: "What are the main features you need? (List the key ones)",
  },
  {
    field: 'hasTimeline',
    question: "Do you have a target timeline?",
    quickReplies: ['Within 1 month', '1–3 months', '3–6 months', 'Flexible'],
  },
  {
    field: 'budget',
    question: "Do you have an estimated budget range?",
    quickReplies: ['Under $1K', '$1K–$5K', '$5K–$20K', '$20K+', "Let's discuss"],
  },
  {
    field: 'name',
    question: "Please share your name and company name.",
  },
  {
    field: 'contact',
    question: "Please share your email or WhatsApp number so Maruf can reach you.",
  },
  {
    field: 'meetingWanted',
    question: "Would you like to book a meeting to discuss further?",
    quickReplies: ['Yes, book a meeting', 'No, I\'ll wait for a reply'],
  },
]

export const leadTriggerPatterns = [
  'i need', 'i want', 'build me', 'develop', 'create', 'make a',
  'project', 'quote', 'quotation', 'requirement', 'i have a project', 'interested in',
]
