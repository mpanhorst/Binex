<template>
  <footer class="footer">
    <div class="footer-content">
      <p>{{ $t('footer.copyright', { year: new Date().getFullYear() }) }}</p>
      <nav>
        <router-link to="/impressum">
          {{ $t('footer.impressum') }}
        </router-link>
        <router-link to="/datenschutz">
          {{ $t('footer.datenschutz') }}
        </router-link>
      </nav>
    </div>
  </footer>
</template>

<script setup lang="ts">
// Keine weiteren Änderungen im Script notwendig
</script>

<style scoped>
.footer {
  background-color: #333;
  color: #fff;
  padding: 20px;
  text-align: center;
}

.footer-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.footer nav {
  display: flex;
  gap: 20px;
}

.footer a {
  color: #fff;
  text-decoration: none;
}

.footer a:hover {
  text-decoration: underline;
}
</style>
