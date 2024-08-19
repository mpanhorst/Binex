<template>
  <default-layout>
    <div class="about-page">
      <section class="introduction">
        <h1>{{ $t('about.title') }}</h1>
        <p>{{ $t('about.introduction') }}</p>
      </section>

      <section class="mission">
        <h2>{{ $t('about.missionTitle') }}</h2>
        <p>{{ $t('about.missionDescription') }}</p>
      </section>

      <section class="problem-statement">
        <h2>{{ $t('about.problemTitle') }}</h2>
        <p>{{ $t('about.problemDescription') }}</p>
      </section>

      <section class="future-vision">
        <h2>{{ $t('about.visionTitle') }}</h2>
        <p>{{ $t('about.visionDescription') }}</p>
      </section>
    </div>
  </default-layout>
</template>

<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue'
</script>

<style scoped>
.about-page {
  padding: 20px;
}

.about-page h1,
.about-page h2 {
  color: #333;
  margin-bottom: 10px;
}

.about-page p {
  margin-bottom: 20px;
  line-height: 1.6;
}

.introduction {
  margin-bottom: 40px;
}

.future-vision {
  margin-top: 40px;
}
</style>
