function Item(name, sell_in, quality) {
  this.name = name;
  this.sell_in = sell_in;
  this.quality = quality;
}

function setSulfurasConstant(o){
    return {
        name:o.name,
        sell_in:0,
        quality:80
    }
}

function setQualityMax(){
    return 50
}

function decrementQualityTwice(o){
    return o.quality - 2
}

function incrementQualityTwice(o){
    return o.quality + 2
}

function incrementQualityThrice(o){
    return o.quality + 3
}

function incrementSellIn(o){
    return o.sell_in + 1
}

function decrementSellIn(o){
    return o.sell_in - 1
}

function update_quality() {
  for (var i = 0; i < items.length; i++) {
    // NEW start
    if (items[i].name == 'Sulfuras, Hand of Ragnaros'){
        items[i] = setSulfurasConstant(items[i])
        continue
    }
    // NEW end

    if (items[i].name != 'Aged Brie' && items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
      if (items[i].quality > 0) {
        if (items[i].name != 'Sulfuras, Hand of Ragnaros') {
            // NEW start
            if (items[i].name == 'Conjured') {
                items[i].sell_in = decrementSellIn(items[i])
                if(items[i].sell_in < 0){
                    items[i].quality = decrementQualityTwice(items[i])
                } else {
                    items[i].quality = items[i].quality - 1
                }
                items[i].sell_in = incrementSellIn(items[i])
            }
            // NEW end

          items[i].quality = items[i].quality - 1
        }
      }
    } else {
      if (items[i].quality < 50) {
        items[i].quality = items[i].quality + 1
        if (items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {

          // NEW start
          items[i].sell_in = decrementSellIn(items[i])
          // NEW start

          if (items[i].sell_in < 11) {
            if (items[i].quality < 50) {
              items[i].quality = items[i].quality + 1
            }
          }
          if (items[i].sell_in < 6) {
            if (items[i].quality < 50) {
              items[i].quality = items[i].quality + 1
            }
          }

          // NEW start
          items[i].sell_in = incrementSellIn(items[i])
          // NEW start

        }
    } else {
        // NEW start
        items[i].quality = setQualityMax()
        // NEW end
    }
    }
    if (items[i].name != 'Sulfuras, Hand of Ragnaros') {
      items[i].sell_in = decrementSellIn(items[i])
    }
    if (items[i].sell_in < 0) {
      if (items[i].name != 'Aged Brie') {
        if (items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
          if (items[i].quality > 0) {
            if (items[i].name != 'Sulfuras, Hand of Ragnaros') {
              items[i].quality = items[i].quality - 1
            }
          }
        } else {
          items[i].quality = items[i].quality - items[i].quality
        }
      } else {
        if (items[i].quality < 50) {
          items[i].quality = items[i].quality + 1
        }
      }
    }
  }
}
