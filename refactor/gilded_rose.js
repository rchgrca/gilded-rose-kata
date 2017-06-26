function Item(name, sell_in, quality) {
  this.name = name;
  this.sell_in = sell_in;
  this.quality = quality;
}

function isProductsQualityBackstage(o){
    return o.name == 'Backstage passes to a TAFKAL80ETC concert'
}

function isProductsQualityFixed(o){
    return ['Sulfuras, Hand of Ragnaros'].includes(o.name)
}

function isProductsQualityDecayTwice(o){
    return ['Conjured'].includes(o.name)
}

function isProductsQualityDecayOnce(o){
    return ['Normal','Sulfuras, Hand of Ragnaros'].includes(o.name)
}

function isProductsQualityImprove(o){
    return ['Aged Brie','Backstage passes to a TAFKAL80ETC concert'].includes(o.name)
}

function setProductFixedConstant(o){
    return {name:o.name,sell_in:0,quality:80}
}

function setQualityMin(o){
    return o.quality < 0 ? 0 : o.quality
}

function seQualityMax(o){
    return o.quality > 50 ? 50 : o.quality
}

function setQualityBounds(o){
    o.quality = setQualityMin(o)
    o.quality = seQualityMax(o)
    return o.quality
}

function getQualityBackstage(o){
    if(o.sell_in < 0){
        o.quality = 0
    } else if (o.sell_in < 11) {
        o.quality = o.sell_in < 6 ? o.quality +=3 : o.quality += 2
    } else {
        o.quality++
    }
    return o.quality
}

function decrementQualityOnce(o){
    if(isProductsQualityDecayTwice(o)){
        o.quality -=2
    } else {
        o.quality--
    }
    return o.quality
}

function decrementQualityTwice(o){
    if(isProductsQualityDecayTwice(o)){
        o.quality -= 2
    }
    return o.quality - 2
}

function incrementQuality(o){
    if(isProductsQualityBackstage(o)){
        o.quality = getQualityBackstage(o)
    } else {
        o.quality++
    }
    return o.quality
}

function decrementSellIn(o){
    return o.sell_in - 1
}

function update_quality() {
    for (var i = 0; i < items.length; i++) {

        items[i].sell_in = decrementSellIn(items[i])

        if (isProductsQualityFixed(items[i])){
            items[i] = setProductFixedConstant(items[i])
            continue
        }

        if(isProductsQualityImprove(items[i])){
            items[i].quality = incrementQuality(items[i])
            items[i].quality = setQualityBounds(items[i])
            continue
        }

        if (items[i].sell_in < 0) {
            items[i].quality = decrementQualityTwice(items[i])

        } else {
            items[i].quality = decrementQualityOnce(items[i])
        }

        items[i].quality = setQualityBounds(items[i])
    }
}
