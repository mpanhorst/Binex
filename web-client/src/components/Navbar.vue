<template>
  <nav class="navbar">
    <div class="navbar-container">
      <!-- Logo oder Titel der Seite -->
      <router-link :to="{ name: ROUTE_NAMES.app }" class="navbar-brand">
        {{ $t('navbar.brand') }}
      </router-link>

      <!-- Navigation Links für größere Bildschirme -->
      <ul class="navbar-links">
        <li>
          <router-link :to="{ name: ROUTE_NAMES.about }">
            {{ $t('navbar.about') }}
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: ROUTE_NAMES.blockchain }">
            {{ $t('navbar.blockchain') }}
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: ROUTE_NAMES.events }">
            {{ $t('navbar.events') }}
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: ROUTE_NAMES.contact }">
            {{ $t('navbar.contact') }}
          </router-link>
        </li>
      </ul>

      <!-- Hamburger Menü für mobile Geräte -->
      <div class="hamburger" @click="toggleMenu">
        <div :class="{ open: isOpen }">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <!-- Mobile Navigation Links -->
      <ul v-if="isOpen" class="mobile-nav">
        <li>
          <router-link :to="{ name: ROUTE_NAMES.about }" @click="toggleMenu">
            {{ $t('navbar.about') }}
          </router-link>
        </li>
        <li>
          <router-link
            :to="{ name: ROUTE_NAMES.blockchain }"
            @click="toggleMenu"
          >
            {{ $t('navbar.blockchain') }}
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: ROUTE_NAMES.events }" @click="toggleMenu">
            {{ $t('navbar.events') }}
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: ROUTE_NAMES.contact }" @click="toggleMenu">
            {{ $t('navbar.contact') }}
          </router-link>
        </li>
      </ul>

      <!-- Optional: Language Switcher -->
      <language-switcher />
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'
import { ROUTE_NAMES } from '@/enums/route-names.enum'

// Importiere die ausgelagerten CSS-Dateien
import '@/styles/navbar.scss'

const isOpen = ref(false)
const toggleMenu = () => {
  isOpen.value = !isOpen.value
}
</script>
