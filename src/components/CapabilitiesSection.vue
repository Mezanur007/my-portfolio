<template>
  <section id="capabilities">
    <div class="inner">
      <div class="sec-label reveal"><span class="sec-num">[ 02 ]</span><span class="sec-line"></span><h2 class="sec-title">{{ language === 'en' ? 'Core' : 'القدرات' }} <span>{{ language === 'en' ? 'Capabilities' : 'الأساسية' }}</span></h2></div>
      <div class="cap-grid reveal">
        <div class="cap-card"><div class="cap-n-tag">CAP_01</div><div class="cap-ico">⬡</div><div class="cap-h">{{ language === 'en' ? 'SaaS Platform Design' : 'تصميم منصة SaaS' }}</div><div class="cap-d">{{ language === 'en' ? 'Architecting scalable multi-tenant SaaS products built for growth, high availability, and complex enterprise workflows.' : 'تصميم منصات SaaS قابلة للتطوير متعددة المستأجرين المصممة للنمو والتوفر العالي والعمليات المؤسسية المعقدة.' }}</div></div>
        <div class="cap-card"><div class="cap-n-tag">CAP_02</div><div class="cap-ico">◈</div><div class="cap-h">{{ language === 'en' ? 'Software Architecture' : 'معمارية البرمجيات' }}</div><div class="cap-d">{{ language === 'en' ? 'End-to-end product development — system design, tech stack strategy, deployment pipelines, and performance optimization.' : 'تطوير منتج من البداية إلى النهاية — تصميم النظام واستراتيجية المكدس التقني وخطوط أنابيب النشر وتحسين الأداء.' }}</div></div>
        <div class="cap-card"><div class="cap-n-tag">CAP_03</div><div class="cap-ico">◎</div><div class="cap-h">{{ language === 'en' ? 'AI & Automation' : 'الذكاء الاصطناعي والأتمتة' }}</div><div class="cap-d">{{ language === 'en' ? 'Building intelligent automation systems and AI-powered tools that embed machine learning into core business operations.' : 'بناء أنظمة أتمتة ذكية وأدوات مدعومة بالذكاء الاصطناعي التي تدمج التعلم الآلي في عمليات العمل الأساسية.' }}</div></div>
        <div class="cap-card"><div class="cap-n-tag">CAP_04</div><div class="cap-ico">⬟</div><div class="cap-h">{{ language === 'en' ? 'Technical Leadership' : 'القيادة التقنية' }}</div><div class="cap-d">{{ language === 'en' ? 'Managing engineering teams and cross-functional projects with relentless focus on delivery quality and strategic alignment.' : 'إدارة فرق الهندسة والمشاريع متعددة الوظائف مع التركيز المستمر على جودة التسليم والتوافق الإستراتيجي.' }}</div></div>
        <div class="cap-card"><div class="cap-n-tag">CAP_05</div><div class="cap-ico">⬢</div><div class="cap-h">{{ language === 'en' ? 'Digital Transformation' : 'التحول الرقمي' }}</div><div class="cap-d">{{ language === 'en' ? 'Modernizing organizations with scalable cloud infrastructure, legacy system migration, and workflow digitization.' : 'تحديث المنظمات ببنية تحتية سحابية قابلة للتطوير وهجرة النظم الموروثة وأتمتة العمليات.' }}</div></div>
        <div class="cap-card"><div class="cap-n-tag">CAP_06</div><div class="cap-ico">◆</div><div class="cap-h">{{ language === 'en' ? 'Strategic Partnerships' : 'الشراكات الإستراتيجية' }}</div><div class="cap-d">{{ language === 'en' ? 'Developing technology partnerships and business collaborations that expand capability and create long-term compounding value.' : 'تطوير شراكات التكنولوجيا والتعاونات التجارية التي توسع القدرة وتخلق قيمة مركبة طويلة الأجل.' }}</div></div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useLanguage } from '../composables/useLanguage'

const { language } = useLanguage()
</script>
