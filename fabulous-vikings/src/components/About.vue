<template>
  <div class="about">
    <header class="about-header">
      <h1 class="about-title">Vårt Kaffe</h1>
    </header>
    <main class="about-main">
      <p class="strong-bread">
        Pumpkin spice mug, barista cup, sit macchiato, kopi-luwak, doppio, grounds dripper, crema, strong whipped, variety
        extra iced id lungo half and half mazagran. Pumpkin spice.
      </p>
      <p class="bread">
        Que dark fair trade, spoon decaffeinated, barista wings whipped, as rich aftertaste, con panna milk black, arabica
        white rich beans single shot extra affogato. So affogato macchiato sit extraction instant grinder seasonal organic,
        turkish single shot, single origin, and robusta strong to go so dripper. Viennese froth, grounds caramelization
        skinny aromatic cup kopi-luwak, fair trade flavour, frappuccino medium, café au lait flavour cultivar ut bar instant
        kopi-luwak.
        <br />
        <br />
        Roast id macchiato, single shot siphon mazagran milk fair trade est aroma a half and half and, so, galão iced to go,
        whipped as cream cup pumpkin spice iced. At extra, rich grinder, brewed to go, steamed half and half at, that,
        percolator macchiato trifecta and body as arabica dripper. In galão black java milk sit trifecta, robusta, acerbic
        café au lait instant shop latte. Seasonal bar shop filter aroma id, crema, affogato viennese cultivar aftertaste,
        seasonal, percolator cream black, galão flavour, milk aromatic turkish skinny crema.
      </p>
    </main>
    <footer class="about-footer">
      <figure class="Eva"><img class="Eva" src="/assets/graphics/eva-cortado.jpg" /></figure>
      <h2 class="Eva-name">Eva Cortado</h2>
      <p class="Eva-bread">VD & Grundare</p>
    </footer>
  </div>
</template>

<script>
export default {}
</script>

<style>
.about {
  max-width: 80%;
}
.about-title {
  text-align: start;
  font-size: 38px;
}

.strong-bread {
  font-weight: 700;
  text-align: start;
}

.bread {
  text-align: start;
}

.about-footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 50px 0px 80px 0px;
}
.Eva {
  height: 80px;
  width: 80px;
  margin: 0px;
  border-radius: 50%;
}

.Eva-name {
  margin: 0px;
}

.Eva-bread {
  margin: 0px;
}
</style>
