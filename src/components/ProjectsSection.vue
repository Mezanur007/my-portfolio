<template>
  <section id="projects">
    <div class="inner">
      <div class="sec-label reveal">
        <span class="sec-num">[ 05 ]</span>
        <span class="sec-line"></span>
        <h2 class="sec-title">
          {{ language === 'en' ? 'Projects &' : 'المشاريع و' }}
          <span>{{ language === 'en' ? 'Contributions' : 'المساهمات' }}</span>
        </h2>
      </div>

      <div class="project-signal-grid reveal">
        <div
          v-for="signal in signals"
          :key="signal.label.en"
          class="project-signal"
          :style="{ '--signal-accent': signal.accent }"
        >
          <span class="signal-icon" aria-hidden="true">{{ signal.icon }}</span>
          <div>
            <span class="signal-label">{{ text(signal.label) }}</span>
            <strong>{{ text(signal.value) }}</strong>
          </div>
        </div>
      </div>

      <div class="projects-grid">
        <article
          v-for="project in projects"
          :key="project.title.en"
          class="prod-card project-card reveal"
          :style="{ '--project-accent': project.accent }"
        >
          <div class="p-glow"></div>
          <div class="project-top">
            <div class="project-icon" aria-hidden="true">
              <span class="project-mark">{{ project.icon }}</span>
              <span class="project-code">{{ project.code }}</span>
            </div>
            <span class="project-status">{{ text(project.status) }}</span>
          </div>
          <div class="project-head">
            <div class="p-type">{{ text(project.category) }}</div>
          </div>
          <h3>{{ text(project.title) }}</h3>
          <p>{{ text(project.description) }}</p>
          <div class="project-impact">{{ text(project.impact) }}</div>

          <div v-if="project.links.length" class="project-links">
            <a
              v-for="link in project.links"
              :key="link.href"
              :href="link.href"
              target="_blank"
              rel="noreferrer"
            >
              {{ text(link.label) }}
            </a>
          </div>

          <div class="p-stack">
            <span v-for="chip in project.chips" :key="text(chip)" class="p-chip">{{ text(chip) }}</span>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useLanguage } from '../composables/useLanguage'

const { language } = useLanguage()

const text = (value) => value[language.value] || value.en

const signals = computed(() => [
  {
    icon: '🤖',
    accent: '#6F42C1',
    label: { en: 'AI Systems', ar: 'أنظمة الذكاء' },
    value: { en: 'Agents + Automation', ar: 'وكلاء وأتمتة' }
  },
  {
    icon: '☁️',
    accent: '#0B5FFF',
    label: { en: 'SaaS Builds', ar: 'منصات SaaS' },
    value: { en: 'API + Dashboards', ar: 'API ولوحات' }
  },
  {
    icon: '📱',
    accent: '#E07A3A',
    label: { en: 'Operations', ar: 'العمليات' },
    value: { en: 'Mobile + Reporting', ar: 'تطبيق وتقارير' }
  },
  {
    icon: '🚀',
    accent: '#10AB7C',
    label: { en: 'Open Source', ar: 'مصدر مفتوح' },
    value: { en: 'Merged + Published', ar: 'مدمج ومنشور' }
  }
])

const projects = computed(() => [
  {
    icon: '⚖️',
    code: 'OSS',
    accent: '#2D4CC8',
    category: { en: 'Open Source', ar: 'مصدر مفتوح' },
    status: { en: 'Public work', ar: 'عمل عام' },
    title: { en: 'Codex Skills & tldr-pages', ar: 'مهارات Codex و tldr-pages' },
    description: {
      en: 'Built a public Senior Engineering Board skill for adversarial audits, merged the try-rs command page into tldr-pages, and gained Flutter issue triage experience through duplicate PR handling.',
      ar: 'بنيت مهارة Senior Engineering Board العامة لمراجعات هندسية نقدية، وتم دمج صفحة try-rs في tldr-pages، واكتسبت خبرة في فرز قضايا Flutter من خلال طلبات مكررة.'
    },
    impact: {
      en: 'Proof of disciplined contribution flow, review thinking, and public documentation work.',
      ar: 'إثبات لأسلوب مساهمة منظم، تفكير مراجعة هندسية، وعمل توثيق عام.'
    },
    links: [
      {
        label: { en: 'Codex skill', ar: 'مهارة Codex' },
        href: 'https://github.com/Mezanur007/codex-senior-engineering-board'
      },
      {
        label: { en: 'Merged tldr PR', ar: 'طلب tldr مدمج' },
        href: 'https://github.com/tldr-pages/tldr/pull/22732'
      }
    ],
    chips: [
      { en: 'Codex', ar: 'Codex' },
      { en: 'Review Systems', ar: 'أنظمة مراجعة' },
      { en: 'Docs', ar: 'توثيق' }
    ]
  },
  {
    icon: '🤖',
    code: 'AI',
    accent: '#6F42C1',
    category: { en: 'AI & Automation', ar: 'الذكاء الاصطناعي والأتمتة' },
    status: { en: 'Public + private', ar: 'عام وخاص' },
    title: { en: 'Calling Agent Systems', ar: 'أنظمة وكلاء الاتصال' },
    description: {
      en: 'Realtime voice and restaurant calling assistant work focused on call handling, structured workflows, and human-ready operational handoff.',
      ar: 'عمل على مساعدات اتصال صوتية فورية للمطاعم يركز على إدارة المكالمات، سير العمل المنظم، والتسليم التشغيلي الجاهز للفريق.'
    },
    impact: {
      en: 'Turns repetitive call handling into structured, trackable business workflows.',
      ar: 'تحويل إدارة المكالمات المتكررة إلى سير عمل منظم وقابل للمتابعة.'
    },
    links: [
      {
        label: { en: 'Public repo', ar: 'المستودع العام' },
        href: 'https://github.com/Mezanur007/calling-agent'
      }
    ],
    chips: [
      { en: 'Voice AI', ar: 'ذكاء صوتي' },
      { en: 'TypeScript', ar: 'TypeScript' },
      { en: 'Automation', ar: 'أتمتة' }
    ]
  },
  {
    icon: '☁️',
    code: 'API',
    accent: '#0B8F6A',
    category: { en: 'SaaS Platform', ar: 'منصة SaaS' },
    status: { en: 'Private', ar: 'خاص' },
    title: { en: 'Smart Coordinator Suite', ar: 'حزمة Smart Coordinator' },
    description: {
      en: 'Multi-part SaaS ecosystem covering API services, tenant dashboard, SaaS administration, and customer mobile experience.',
      ar: 'منظومة SaaS متعددة الأجزاء تشمل خدمات API، لوحة المستأجر، إدارة SaaS، وتجربة عميل عبر الهاتف.'
    },
    impact: {
      en: 'Designed around multi-tenant control, operational visibility, and customer access.',
      ar: 'مصمم للتحكم متعدد المستأجرين، وضوح العمليات، ووصول العملاء.'
    },
    links: [],
    chips: [
      { en: 'API', ar: 'API' },
      { en: 'Tenant Dashboard', ar: 'لوحة مستأجر' },
      { en: 'Mobile', ar: 'تطبيق' }
    ]
  },
  {
    icon: '📱',
    code: 'OPS',
    accent: '#E07A3A',
    category: { en: 'Operations', ar: 'العمليات' },
    status: { en: 'Private', ar: 'خاص' },
    title: { en: 'B-IT PulseWork & Sales Tools', ar: 'B-IT PulseWork وأدوات المبيعات' },
    description: {
      en: 'Internal workforce, team workflow, sales visibility, and business monitoring tools for daily operational control.',
      ar: 'أدوات داخلية لإدارة فرق العمل، سير العمليات، متابعة المبيعات، ومراقبة الأعمال اليومية.'
    },
    impact: {
      en: 'Improves field visibility, accountability, and daily execution for operating teams.',
      ar: 'تحسين وضوح العمل الميداني، المساءلة، والتنفيذ اليومي للفرق.'
    },
    links: [],
    chips: [
      { en: 'Flutter', ar: 'Flutter' },
      { en: 'Firebase', ar: 'Firebase' },
      { en: 'Reporting', ar: 'تقارير' }
    ]
  },
  {
    icon: '🌐',
    code: 'WEB',
    accent: '#0B5FFF',
    category: { en: 'Business Web', ar: 'ويب الأعمال' },
    status: { en: 'Client-safe', ar: 'ملخص آمن' },
    title: { en: 'B-IT Website, Admin & Chat', ar: 'موقع B-IT ولوحة الإدارة والمحادثة' },
    description: {
      en: 'Delivered lead capture, guided chat flows, meeting scheduling, PDF/export workflows, certificates, legal pages, and admin chat improvements.',
      ar: 'تنفيذ التقاط العملاء المحتملين، مسارات محادثة موجهة، جدولة اجتماعات، تصدير PDF، شهادات، صفحات قانونية، وتحسينات محادثة الإدارة.'
    },
    impact: {
      en: 'Connects marketing, qualification, booking, documents, and admin follow-up.',
      ar: 'ربط التسويق، تأهيل العملاء، الحجز، المستندات، ومتابعة الإدارة.'
    },
    links: [],
    chips: [
      { en: 'Lead Capture', ar: 'عملاء محتملون' },
      { en: 'Admin Chat', ar: 'محادثة الإدارة' },
      { en: 'PDF Export', ar: 'تصدير PDF' }
    ]
  },
  {
    icon: '🛠️',
    code: 'DEV',
    accent: '#10AB7C',
    category: { en: 'Developer Tools', ar: 'أدوات المطور' },
    status: { en: 'Public + private', ar: 'عام وخاص' },
    title: { en: 'Portfolio, Amanah AI & Bulk Email', ar: 'المعرض وAmanah AI والبريد الجماعي' },
    description: {
      en: 'Bilingual Vue/Vite portfolio work plus high-level AI platform and operational messaging automation projects with private implementation details protected.',
      ar: 'معرض أعمال ثنائي اللغة باستخدام Vue/Vite، مع أعمال منصة ذكاء اصطناعي وأتمتة رسائل تشغيلية مع الحفاظ على خصوصية تفاصيل التنفيذ.'
    },
    impact: {
      en: 'Public-safe engineering presentation backed by practical developer workflow tooling.',
      ar: 'عرض هندسي آمن للعامة مدعوم بأدوات عملية لسير عمل المطور.'
    },
    links: [
      {
        label: { en: 'Portfolio repo', ar: 'مستودع المعرض' },
        href: 'https://github.com/Mezanur007/my-portfolio'
      },
      {
        label: { en: 'GitHub profile', ar: 'ملف GitHub' },
        href: 'https://github.com/Mezanur007'
      }
    ],
    chips: [
      { en: 'Vue', ar: 'Vue' },
      { en: 'AI Platform', ar: 'منصة AI' },
      { en: 'Messaging', ar: 'رسائل' }
    ]
  }
])
</script>
