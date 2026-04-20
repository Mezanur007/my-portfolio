<template>
  <section id="products">
    <div class="inner">
      <div class="sec-label reveal"><span class="sec-num">[ 04 ]</span><span class="sec-line"></span><h2 class="sec-title">{{ language === 'en' ? 'Deployed' : 'المنتجات' }} <span>{{ language === 'en' ? 'Products' : 'المنشورة' }}</span></h2></div>
      <div class="prod-grid">
        <div class="prod-card reveal"><div class="p-glow"></div><div class="p-type">{{ language === 'en' ? 'Automotive · SaaS' : 'السيارات · SaaS' }}</div><h3>{{ language === 'en' ? 'BB Autofix' : 'إصلاح بي بي التلقائي' }}</h3><p>{{ language === 'en' ? 'A comprehensive digital management system purpose-built for car service businesses. Streamlines bookings, inventory, invoicing, and customer management into one unified platform.' : 'نظام إدارة رقمي شامل مصمم خصيصاً لأعمال خدمة السيارات. يبسط الحجوزات والمخزون والفواتير وإدارة العملاء في منصة موحدة واحدة.' }}</p><div class="p-stack"><span class="p-chip">SaaS</span><span class="p-chip">{{ language === 'en' ? 'Automotive' : 'السيارات' }}</span><span class="p-chip">{{ language === 'en' ? 'Service Mgmt' : 'إدارة الخدمات' }}</span><span class="p-chip">{{ language === 'en' ? 'Web Platform' : 'منصة ويب' }}</span></div></div>
        
        <div class="prod-card reveal"><div class="p-glow"></div><div class="p-type">{{ language === 'en' ? 'Enterprise · ERP / HRM' : 'المؤسسة · ERP / HRM' }}</div><h3>{{ language === 'en' ? 'Enterprise Platforms' : 'منصات المؤسسات' }}</h3><p>{{ language === 'en' ? 'Custom-built ERP and HRM platforms that modernize internal operations, workforce management, and business processes — replacing fragmented legacy tools with unified, scalable systems.' : 'منصات ERP و HRM مخصصة تحديث العمليات الداخلية وإدارة القوى العاملة والعمليات التجارية — استبدال الأدوات الموروثة المجزأة بأنظمة موحدة وقابلة للتطوير.' }}</p><div class="p-stack"><span class="p-chip">ERP</span><span class="p-chip">HRM</span><span class="p-chip">{{ language === 'en' ? 'Enterprise' : 'المؤسسة' }}</span><span class="p-chip">{{ language === 'en' ? 'Automation' : 'الأتمتة' }}</span></div></div>
        
        <div class="prod-card reveal"><div class="p-glow"></div><div class="p-type">{{ language === 'en' ? 'AI · Intelligence Layer' : 'الذكاء الاصطناعي · طبقة الذكاء' }}</div><h3>{{ language === 'en' ? 'AI & Automation Systems' : 'أنظمة الذكاء الاصطناعي والأتمتة' }}</h3><p>{{ language === 'en' ? 'Custom AI solutions and intelligent automation tools embedding machine learning into core business workflows — delivering measurable operational efficiency and data-driven decision-making at scale.' : 'حلول ذكاء اصطناعي مخصصة وأدوات أتمتة ذكية تدمج التعلم الآلي في سير العمل التجاري الأساسي — تحقيق كفاءة تشغيلية قابلة للقياس واتخاذ قرارات مدفوعة بالبيانات على نطاق واسع.' }}</p><div class="p-stack"><span class="p-chip">{{ language === 'en' ? 'Artificial Intelligence' : 'الذكاء الاصطناعي' }}</span><span class="p-chip">{{ language === 'en' ? 'ML' : 'تعلم آلي' }}</span><span class="p-chip">{{ language === 'en' ? 'Automation' : 'الأتمتة' }}</span><span class="p-chip">{{ language === 'en' ? 'APIs' : 'واجهات برمجية' }}</span></div></div>
        
        <div class="prod-card reveal"><div class="p-glow"></div><div class="p-type">{{ language === 'en' ? 'Digital Transformation' : 'التحول الرقمي' }}</div><h3>{{ language === 'en' ? 'Custom Digital Systems' : 'الأنظمة الرقمية المخصصة' }}</h3><p>{{ language === 'en' ? 'Bespoke platforms and infrastructure for organizations in transition — from legacy system migration and cloud-native rebuilds to full-stack workflow digitization and digital infrastructure.' : 'منصات وبنية تحتية مخصصة للمنظمات في طور الانتقال — من هجرة الأنظمة الموروثة وإعادة بناء السحابة الأصلية إلى أتمتة سير العمل والبنية التحتية الرقمية.' }}</p><div class="p-stack"><span class="p-chip">{{ language === 'en' ? 'Custom Dev' : 'تطوير مخصص' }}</span><span class="p-chip">{{ language === 'en' ? 'Cloud' : 'السحابة' }}</span><span class="p-chip">{{ language === 'en' ? 'Digital Infra' : 'البنية التحتية الرقمية' }}</span><span class="p-chip">{{ language === 'en' ? 'Integration' : 'التكامل' }}</span></div></div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useLanguage } from '../composables/useLanguage'

const { language } = useLanguage()
</script>
