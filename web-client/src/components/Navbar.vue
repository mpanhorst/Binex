<template>
  <nav class="navbar">
    <div class="navbar-container">
      <!-- Logo -->
      <router-link :to="{ name: ROUTE_NAMES.app }" class="navbar-brand">
        <img
          class="app-logo__img"
          src="/branding/logo.svg"
          :alt="$config.APP_NAME"
        />
      </router-link>

      <!-- Navigation Links -->
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

      <!-- Suchfeld -->
      <div class="navbar-search">
        <input type="text" placeholder="Search..." class="search-input" />
      </div>
    </div>

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
        <router-link :to="{ name: ROUTE_NAMES.blockchain }" @click="toggleMenu">
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
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ROUTE_NAMES } from '@/enums/route-names.enum'

// Importiere die ausgelagerten CSS-Dateien
import '@/styles/navbar.scss'

const isOpen = ref(false)
const toggleMenu = () => {
  isOpen.value = !isOpen.value
}
</script>
