<template>
  <section id="experience">
    <div class="inner">
      <div class="sec-label reveal"><span class="sec-num">[ 03 ]</span><span class="sec-line"></span><h2 class="sec-title">{{ language === 'en' ? 'Mission' : 'سجل' }} <span>{{ language === 'en' ? 'Log' : 'المهام' }}</span></h2></div>
      <div class="mlog">
        <!-- Role 1 -->
        <div class="ms active reveal">
          <div class="ms-meta"><span class="ms-date">{{ language === 'en' ? 'MAR 2025 — PRESENT · 1 YR 1 MO' : 'مارس 2025 — الحاضر · 1 سنة 1 شهر' }}</span><span class="ms-org">{{ language === 'en' ? 'BI TECHNOLOGY · FULL-TIME' : 'شركة ذكاء الأعمال · دوام كامل' }}</span></div>
          <div class="ms-title">{{ language === 'en' ? 'Co-Founder & CTO' : 'المؤسس المشارك والمدير التقني' }}</div>
          <div class="ms-loc-wrap"><span class="ms-loc">{{ language === 'en' ? '◈ Riyadh, Saudi Arabia · On-site' : '◈ الرياض، المملكة العربية السعودية · بالموقع' }}</span><span class="ms-badge">{{ language === 'en' ? 'ACTIVE NOW' : 'نشط الآن' }}</span></div>
          <div class="ms-body">{{ language === 'en' ? 'Building scalable SaaS platforms, AI solutions, and enterprise software. Leading software architecture, product development, and technical teams while developing strategic technology partnerships across the region.' : 'بناء منصات SaaS قابلة للتطوير وحلول الذكاء الاصطناعي والبرمجيات المؤسسية. قيادة معمارية البرمجيات وتطوير المنتجات والفرق التقنية مع تطوير شراكات تكنولوجية إستراتيجية عبر المنطقة.' }}</div>
          <div class="ms-skills">
            <span class="ms-sk">{{ language === 'en' ? 'Project Management' : 'إدارة المشاريع' }}</span>
            <span class="ms-sk">{{ language === 'en' ? 'Team Leadership' : 'قيادة الفريق' }}</span>
            <span class="ms-sk">{{ language === 'en' ? 'IT Service Management' : 'إدارة خدمات تكنولوجيا المعلومات' }}</span>
            <span class="ms-sk">{{ language === 'en' ? 'Strategic Partnerships' : 'الشراكات الإستراتيجية' }}</span>
            <span class="ms-sk">{{ language === 'en' ? 'Business Development' : 'تطوير الأعمال' }}</span>
          </div>
        </div>
        
        <!-- Role 2 -->
        <div class="ms reveal">
          <div class="ms-meta"><span class="ms-date">{{ language === 'en' ? 'NOV 2022 — AUG 2025 · 2 YRS 10 MOS' : 'نوفمبر 2022 — أغسطس 2025 · سنتان وعشرة أشهر' }}</span><span class="ms-org">{{ language === 'en' ? 'ALGHANIM INDUSTRIES — F&B · FULL-TIME' : 'الجزيرة — قطاع الأغذية والمشروبات · دوام كامل' }}</span></div>
          <div class="ms-title">{{ language === 'en' ? 'Operation' : 'العمليات' }}</div>
          <div class="ms-loc-wrap"><span class="ms-loc">{{ language === 'en' ? '◈ Riyadh, Saudi Arabia · On-site' : '◈ الرياض، المملكة العربية السعودية · بالموقع' }}</span></div>
          <div class="ms-body">{{ language === 'en' ? 'Led operational functions within Alghanim\'s Food & Beverage division — one of the region\'s largest conglomerates. Deepened expertise in large-scale enterprise operations, systems management, and technology integration.' : 'قادت الوظائف التشغيلية في قسم الأغذية والمشروبات بالجزيرة — أحد أكبر مجموعات المشاريع في المنطقة. عمقت الخبرة في العمليات المؤسسية واسعة النطاق وإدارة الأنظمة والتكامل التكنولوجي.' }}</div>
        </div>
        
        <!-- Career Break -->
        <div class="ms reveal" style="opacity:.45">
          <div class="ms-meta"><span class="ms-date">{{ language === 'en' ? 'MAY 2022 — OCT 2022 · 6 MOS' : 'مايو 2022 — أكتوبر 2022 · ستة أشهر' }}</span><span class="ms-org">{{ language === 'en' ? 'CAREER BREAK' : 'انقطاع مهني' }}</span></div>
          <div class="ms-title">{{ language === 'en' ? 'Strategic Recharge' : 'شحنة إستراتيجية' }}</div>
          <div class="ms-loc-wrap"><span class="ms-loc">{{ language === 'en' ? '◈ Riyadh, Saudi Arabia' : '◈ الرياض، المملكة العربية السعودية' }}</span><span class="ms-badge break">{{ language === 'en' ? 'INTENTIONAL PAUSE' : 'توقف مقصود' }}</span></div>
          <div class="ms-body">{{ language === 'en' ? 'Intentional time for reflection, strategic planning, and preparing for the next phase of execution.' : 'وقت مقصود للتأمل والتخطيط الإستراتيجي والاستعداد للمرحلة التالية من التنفيذ.' }}</div>
        </div>
        
        <!-- Role 3 -->
        <div class="ms reveal">
          <div class="ms-meta"><span class="ms-date">{{ language === 'en' ? 'NOV 2021 — APR 2022 · 6 MOS' : 'نوفمبر 2021 — أبريل 2022 · ستة أشهر' }}</span><span class="ms-org">{{ language === 'en' ? 'JOULESLABS · FULL-TIME' : 'JoulesLabs · دوام كامل' }}</span></div>
          <div class="ms-title">{{ language === 'en' ? 'Technical Project Manager' : 'مدير المشاريع التقني' }}</div>
          <div class="ms-loc-wrap"><span class="ms-loc">{{ language === 'en' ? '◈ Mirpur, Dhaka, Bangladesh' : '◈ ميرپور، داكا، بنغلاديش' }}</span></div>
          <div class="ms-body">{{ language === 'en' ? 'Managed end-to-end technical project delivery — coordinating engineering teams, defining milestones, and ensuring on-time product launches aligned with business objectives.' : 'إدارة تسليم المشاريع التقنية الشاملة — تنسيق فرق الهندسة وتحديد المراحل الزمنية وضمان إطلاق المنتجات في الوقت المناسب المتوافقة مع أهداف العمل.' }}</div>
          <div class="ms-skills"><span class="ms-sk">{{ language === 'en' ? 'Project Management' : 'إدارة المشاريع' }}</span></div>
        </div>
        
        <!-- Role 4 -->
        <div class="ms reveal">
          <div class="ms-meta"><span class="ms-date">{{ language === 'en' ? 'NOV 2021 — APR 2022 · 6 MOS' : 'نوفمبر 2021 — أبريل 2022 · ستة أشهر' }}</span><span class="ms-org">{{ language === 'en' ? 'CROWDFUNDLY · FULL-TIME' : 'Crowdfundly · دوام كامل' }}</span></div>
          <div class="ms-title">{{ language === 'en' ? 'Technical Project Manager' : 'مدير المشاريع التقني' }}</div>
          <div class="ms-loc-wrap"><span class="ms-loc">{{ language === 'en' ? '◈ Dhaka, Bangladesh' : '◈ داكا، بنغلاديش' }}</span></div>
          <div class="ms-body">{{ language === 'en' ? 'Drove technical project execution at a fast-growing crowdfunding SaaS platform — bridging product vision with engineering delivery in an agile, high-velocity environment.' : 'قادت تنفيذ المشاريع التقنية في منصة التمويل الجماعي SaaS سريعة النمو — ربط رؤية المنتج بتسليم الهندسة في بيئة رشيقة وعالية السرعة.' }}</div>
        </div>
        
        <!-- Role 5 -->
        <div class="ms reveal">
          <div class="ms-meta"><span class="ms-date">{{ language === 'en' ? 'SEP 2021 — OCT 2021 · 2 MOS' : 'سبتمبر 2021 — أكتوبر 2021 · شهرين' }}</span><span class="ms-org">{{ language === 'en' ? 'BKASH LIMITED · FULL-TIME' : 'بكاش المحدودة · دوام كامل' }}</span></div>
          <div class="ms-title">{{ language === 'en' ? 'Customer Service Officer' : 'موظف خدمة العملاء' }}</div>
          <div class="ms-loc-wrap"><span class="ms-loc">{{ language === 'en' ? '◈ Dhaka, Bangladesh' : '◈ داكا، بنغلاديش' }}</span></div>
          <div class="ms-body">{{ language === 'en' ? 'Operated at the frontline of Bangladesh\'s leading mobile financial service — gaining deep insight into fintech operations, user pain points, and financial product workflows at scale.' : 'عملت في الخطوط الأمامية لخدمة الأموال المحمولة الرائدة في بنغلاديش — اكتساب رؤية عميقة في عمليات التمويل الرقمي وآلام المستخدمين وسير العمل لمنتجات مالية على نطاق واسع.' }}</div>
        </div>
        
        <!-- Role 6 -->
        <div class="ms reveal">
          <div class="ms-meta"><span class="ms-date">{{ language === 'en' ? 'MAR 2021 — AUG 2021 · 6 MOS' : 'مارس 2021 — أغسطس 2021 · ستة أشهر' }}</span><span class="ms-org">{{ language === 'en' ? 'SR SOFT · FULL-TIME' : 'SR Soft · دوام كامل' }}</span></div>
          <div class="ms-title">{{ language === 'en' ? 'Project Manager (Technical)' : 'مدير المشاريع (تقني)' }}</div>
          <div class="ms-loc-wrap"><span class="ms-loc">{{ language === 'en' ? '◈ Dhaka, Bangladesh' : '◈ داكا، بنغلاديش' }}</span></div>
          <div class="ms-body">{{ language === 'en' ? 'Oversaw software delivery operations as Technical Project Manager — managing client requirements, development timelines, and team coordination across multiple concurrent projects.' : 'إشراف على عمليات تسليم البرمجيات كمدير مشاريع تقني — إدارة متطلبات العملاء والجداول الزمنية للتطوير وتنسيق الفريق عبر مشاريع متزامنة متعددة.' }}</div>
        </div>
        
        <!-- Role 7 -->
        <div class="ms reveal">
          <div class="ms-meta"><span class="ms-date">{{ language === 'en' ? 'MAR 2020 — MAR 2021 · 1 YR 1 MO' : 'مارس 2020 — مارس 2021 · سنة واحدة وشهر واحد' }}</span><span class="ms-org">{{ language === 'en' ? 'BACKDOOR PRIVATE LTD. · FULL-TIME' : 'باب الخلف برايفيت · دوام كامل' }}</span></div>
          <div class="ms-title">{{ language === 'en' ? 'Network Security Analyst' : 'محلل أمان الشبكات' }}</div>
          <div class="ms-loc-wrap"><span class="ms-loc">{{ language === 'en' ? '◈ Dhaka, Bangladesh' : '◈ داكا، بنغلاديش' }}</span></div>
          <div class="ms-body">{{ language === 'en' ? 'Analyzed and fortified network security infrastructure — identifying vulnerabilities, implementing security protocols, and managing IT service continuity for enterprise clients across industries.' : 'تحليل وتحصين بنية تحتية لأمان الشبكات — تحديد الثغرات وتطبيق بروتوكولات الأمان وإدارة استمرارية خدمة تكنولوجيا المعلومات لعملاء المؤسسات عبر الصناعات.' }}</div>
          <div class="ms-skills">
            <span class="ms-sk">{{ language === 'en' ? 'IT Service Management' : 'إدارة خدمات تكنولوجيا المعلومات' }}</span>
            <span class="ms-sk">{{ language === 'en' ? 'Network Security' : 'أمان الشبكات' }}</span>
            <span class="ms-sk">{{ language === 'en' ? 'Cybersecurity' : 'الأمن السيبراني' }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useLanguage } from '../composables/useLanguage'

const { language } = useLanguage()
</script>
