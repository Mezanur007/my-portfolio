<template>
  <section id="profile">
    <div class="inner">
      <div class="sec-label reveal"><span class="sec-num">[ 01 ]</span><span class="sec-line"></span><h2 class="sec-title">{{ language === 'en' ? 'Player' : 'ملف' }} <span>{{ language === 'en' ? 'Profile' : 'اللاعب' }}</span></h2></div>
      <div class="profile-grid">
        <div class="id-text reveal">
          <p>{{ bioText1 }}</p>
          <p>{{ bioText2 }}</p>
          <p>{{ bioText3 }}</p>
          <p>{{ bioText4 }}</p>
        </div>
        <div class="hud-card reveal">
          <div class="c-b"></div>
          <div class="hp-head"><span class="hp-t">{{ language === 'en' ? '// SKILL_MATRIX.DAT' : '// مصفوفة_المهارات.بيانات' }}</span><span class="hp-s">{{ language === 'en' ? 'LOADED' : 'محمل' }}</span></div>
          <div class="sbar"><div class="sb-info"><span class="sb-name">{{ language === 'en' ? 'SaaS & Product Architecture' : 'معمارية SaaS والمنتج' }}</span><span class="sb-pct">95%</span></div><div class="sb-track"><div class="sb-fill" data-w="95"></div></div></div>
          <div class="sbar"><div class="sb-info"><span class="sb-name">{{ language === 'en' ? 'AI & Automation Systems' : 'أنظمة الذكاء الاصطناعي والأتمتة' }}</span><span class="sb-pct">88%</span></div><div class="sb-track"><div class="sb-fill" data-w="88"></div></div></div>
          <div class="sbar"><div class="sb-info"><span class="sb-name">{{ language === 'en' ? 'Technical Leadership' : 'القيادة التقنية' }}</span><span class="sb-pct">93%</span></div><div class="sb-track"><div class="sb-fill" data-w="93"></div></div></div>
          <div class="sbar"><div class="sb-info"><span class="sb-name">{{ language === 'en' ? 'Strategic Partnerships' : 'الشراكات الإستراتيجية' }}</span><span class="sb-pct">86%</span></div><div class="sb-track"><div class="sb-fill" data-w="86"></div></div></div>
          <div class="sbar"><div class="sb-info"><span class="sb-name">{{ language === 'en' ? 'Network Security & IT Ops' : 'أمان الشبكة وعمليات تكنولوجيا المعلومات' }}</span><span class="sb-pct">82%</span></div><div class="sb-track"><div class="sb-fill" data-w="82"></div></div></div>
          <div class="sbar"><div class="sb-info"><span class="sb-name">{{ language === 'en' ? 'Digital Transformation' : 'التحول الرقمي' }}</span><span class="sb-pct">90%</span></div><div class="sb-track"><div class="sb-fill" data-w="90"></div></div></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useLanguage } from '../composables/useLanguage'

const { language } = useLanguage()

const bioText1 = computed(() => 
  language.value === 'en'
    ? `I'm the Co-Founder & CTO of BI Technology, based in Riyadh, Saudi Arabia. We build SaaS platforms, AI solutions, enterprise software, and custom digital systems for organizations that want to operate smarter and grow faster.`
    : `أنا المؤسس المشارك والمدير التقني لشركة ذكاء الأعمال، ومقرها الرياض، المملكة العربية السعودية. نحن نبني منصات SaaS وحلول الذكاء الاصطناعي والبرمجيات المؤسسية والأنظمة الرقمية المخصصة للمنظمات التي تريد أن تعمل بذكاء أكثر وتنمو بشكل أسرع.`
)

const bioText2 = computed(() => 
  language.value === 'en'
    ? 'My belief: technology should not exist just for the sake of software. It should solve real business problems, improve operations, and create measurable impact. That is what drives everything we build.'
    : 'معتقدي: التكنولوجيا لا يجب أن توجد فقط من أجل البرمجيات. يجب أن تحل مشاكل العمل الحقيقية وتحسن العمليات وتخلق تأثيراً قابلاً للقياس. هذا هو ما يدفع كل ما نبنيه.'
)

const bioText3 = computed(() => 
  language.value === 'en'
    ? 'Before BI Technology, I built my foundation across Alghanim Industries, JoulesLabs, Crowdfundly, bKash Limited, SR Soft, and Backdoor Private Ltd. — roles spanning Network Security Analyst to Technical Project Manager.'
    : 'قبل شركة ذكاء الأعمال، بنيت أساسي عبر الجزيرة، JoulesLabs، Crowdfundly، bKash Limited، SR Soft و Backdoor Private Ltd. — أدوار تتراوح بين محلل أمان الشبكات ومدير المشاريع التقني.'
)

const bioText4 = computed(() => 
  language.value === 'en'
    ? 'That cross-functional journey across Bangladesh and Saudi Arabia gave me a rare lens: the full intersection of technology, operations, and business strategy.'
    : 'أتاحت لي تلك الرحلة متعددة الوظائف عبر بنغلاديش والمملكة العربية السعودية عدسة نادرة: التقاطع الكامل بين التكنولوجيا والعمليات والإستراتيجية التجارية.'
)
</script>
