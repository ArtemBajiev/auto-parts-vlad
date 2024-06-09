<template>
  <footer>
    <div class="footer__container">
      <div class="footer__geo footer__item">
        <span>Россия</span>
        <span>Краснодар</span>
        <span>forward © 2024</span>
      </div>
      <nav class="footer__contact footer__item">
        <a href="tel:89034569869" type="tel">8(903)456-98-69</a>
        <a href="mailto:cdt@custom-development-team.su" type="email">cars@forward.ru</a>
      </nav>
    </div>
  </footer>
</template>
<script>
export default {}
</script>
<style lang="scss" scoped>
.footer__container {
  margin-top: 10vh;
  display: flex;
  justify-content: space-between;
  background-color: var(--secondary);
  .footer__item {
    display: flex;
    flex-direction: column;
    margin: 1vh 5vw;
    font-size: 16px;
    color: white;
    & * {
      padding: 7px;
    }
  }
  .footer__contact {
    text-align: right;
  }
}
.bottom-marque {
  width: 100%;
  p {
    font-size: 28px;
  }
}
.marquee-infinite {
  margin: 0px auto;
  max-width: 100%;
  overflow: hidden;
}
.marquee-infinite:last-child {
  margin: 50px auto;
}

.marquee-infinite div {
  display: flex;
  width: 200%;
  animation: marquee-infinite 15s linear infinite;
}

.marquee-infinite p {
  white-space: nowrap;
  width: 100%;
}

.marquee-infinite span {
  width: 100%;
  display: flex;
  justify-content: space-around;
}

.marquee-infinite:hover div {
  animation-play-state: paused;
}

@keyframes marquee-infinite {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-50%);
  }
}
</style>
