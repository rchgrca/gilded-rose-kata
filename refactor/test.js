var normal = "Normal",
  conjured = "Conjured",
 backstage = "Backstage passes to a TAFKAL80ETC concert",
      brie = "Aged Brie",
  sulfuras = "Sulfuras, Hand of Ragnaros"

var items = [
    new Item(normal,30,30),
    new Item(normal,0,46),
    new Item(conjured,0,46),
    new Item(backstage,0,46),
    new Item(brie,0,46),
    new Item(brie,30,30),
    new Item(brie,1,50),
    new Item(brie,1,80),
    new Item(backstage,1,50),
    new Item(sulfuras,30,30),
    new Item(backstage,1,49),
    new Item(backstage,0,49),
    new Item(backstage,11,30),
    new Item(backstage,6,30),
    new Item(conjured,2,2),
    new Item(normal,0,0)
]

var cases = [
/*
********************************************************************************
"At the end of each day our system lowers both values for every item"

    TEST (sell_in decrements by 1, quality decrements by 1):
        [0] new Item("Normal",30,30)

    EXPECTED:
*/
        {
            name:normal,
            sell_in:29,
            quality:29
        },
/*
********************************************************************************
"Once the sell by date has passed, quality degrades twice as fast"

    - TEST (sell-in > 0, decrement quality by 2):
        [1] new Item("Normal",0,46)
        [2] new Item("Conjured",0,46)
        [3] new Item("Backstage passes to a TAFKAL80ETC concert",0,46)
        [4] new Item("Aged Brie",0,46)

    - EXPECTED:
*/
        {
            name: normal,
            quality: 44,
            sell_in: -1
        },
        {
            name: conjured,
            quality: 42,
            sell_in: -1
        },
        {
            name: backstage,
            quality: 0,
            sell_in: -1
        },
        {
            name: brie,
            quality: 47,
            sell_in: -1
        },
/*
********************************************************************************

"Aged Brie" actually increases in quality the older it gets

    TEST (increment quality 1):
        [5] new Item("Aged Brie",30,30)

    EXPECTED:
*/
        {
            name: brie,
            quality: 31,
            sell_in: 29
        },
/*
********************************************************************************

The quality of an item is never more than 50

    TEST (if quality > 50, quality = 50):
        [6] new Item("Aged Brie",1,50)
        [7] new Item("Aged Brie",1,80)
        [8] new Item("Backstage passes to a TAFKAL80ETC concert",1,50)

    EXPECTED:
*/
        {
            name: brie,
            quality: 50,
            sell_in: 0
        },
        {
            name: brie,
            quality: 50,
            sell_in: 0
        },
        {
            name: backstage,
            quality: 50,
            sell_in: 0
        },
/*
********************************************************************************

"Sulfuras", being a legendary item, never has to be sold or decreases in quality

    TEST (sell_in = 0 always, quality = 80 always):
        [9] new Item("Sulfuras, Hand of Ragnaros",30,30)

    EXPECTED:
*/
        {
            name: sulfuras,
            quality: 80,
            sell_in: 0
        },
/*
********************************************************************************
"Backstage passes", like aged brie, increases in quality as it's sell-in value
approaches; quality increases by 2 when there are 10 days or less and by 3 when
there are 5 days or less but quality drops to 0 after the concert

    TEST (increment quality +1):
        [10] new Item("Backstage passes to a TAFKAL80ETC concert",1,49)

    EXPECTED:
*/
        {
            name: backstage,
            quality: 50,
            sell_in: 0
        },
/*
    TEST (if (sell-in < 0), then quality = 0):
        [11] new Item("Backstage passes to a TAFKAL80ETC concert",0,49)

    EXPECTED:
*/
        {
            name: backstage,
            quality: 0,
            sell_in: -1
        },
/*
    TEST (if (sell-in < 11), then quality +2):
        [12] new Item("Backstage passes to a TAFKAL80ETC concert",11,30)

    EXPECTED:
*/
        {
            name: backstage,
            quality: 32,
            sell_in: 10
        },
/*
    TEST (if (sell-in < 6), then quality +3):
        [13] new Item("Backstage passes to a TAFKAL80ETC concert",6,30)

    EXPECTED:
*/
        {
            name: backstage,
            quality: 33,
            sell_in: 5
        },
/*
********************************************************************************
“Conjured”

    TEST (decrement quality -2):
        [14] new Item("Conjured",2,2)

    EXPECTED:
*/
        {
            name: conjured,
            quality: 0,
            sell_in: 1
        },
/*
********************************************************************************
The quality of an item is never negative

    TEST (decrement quality -1):
        [14] new Item("Normal",0,0)

    EXPECTED:
*/
        {
            name: normal,
            quality: 0,
            sell_in: -1
        }
]




update_quality()

var li = []
for (var i=0;i<items.length;i++){
    var s = (
                items[i].name == cases[i].name &&
                items[i].sell_in == cases[i].sell_in &&
                items[i].quality == cases[i].quality
            ) ?
            "<span>Pass</span>" :
            `<b>Failed:</b> <i>${items[i].name}</i>  `
    li.push(`<li>${s}</li>`)
}

window.onload = function(){
    document.getElementById("testcases").innerHTML = li.join('')
}
