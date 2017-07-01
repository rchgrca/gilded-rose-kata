var type = {
    normal:"Normal",
    conjured:"Conjured",
    backstage:"Backstage passes to a TAFKAL80ETC concert",
    brie:"Aged Brie",
    sulfuras:"Sulfuras, Hand of Ragnaros"
}

var items = [
    new Item(type.normal,30,30),
    new Item(type.normal,0,46),
    new Item(type.conjured,0,46),
    new Item(type.backstage,0,46),
    new Item(type.brie,0,46),
    new Item(type.brie,30,30),
    new Item(type.brie,1,50),
    new Item(type.brie,1,80),
    new Item(type.backstage,1,50),
    new Item(type.sulfuras,30,30),
    new Item(type.backstage,1,49),
    new Item(type.backstage,0,49),
    new Item(type.backstage,11,30),
    new Item(type.backstage,6,30),
    new Item(type.conjured,2,2),
    new Item(type.normal,0,0)
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
            test:"sell_in decrements by 1",
            name:type.normal,
            sell_in:29,
            quality:29
        },
/*
********************************************************************************
"Once the sell by date has passed, quality degrades twice as fast"

    - TEST (sell-in < 0, decrement quality by 2):
        [1] new Item("Normal",0,46)
        [2] new Item("Conjured",0,46)
        [3] new Item("Backstage passes to a TAFKAL80ETC concert",0,46)
        [4] new Item("Aged Brie",0,46)

    - EXPECTED:
*/
        {
            test: "sell_in < 0, 'normal' quality decrements twice as fast, by 2",
            name: type.normal,
            quality: 44,
            sell_in: -1
        },
        {
            test: "sell_in < 0, 'conjured' quality decrements twice as fast, by 4",
            name: type.conjured,
            quality: 42,
            sell_in: -1
        },
        {
            test: "sell_in < 0, 'backstage' quality goes to 0",
            name: type.backstage,
            quality: 0,
            sell_in: -1
        },
        {
            test: "sell_in < 0, 'brie' increases quality by 1",
            name: type.brie,
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
            test: "sell_in decrements but stays > 0, 'brie' increases quality by 1",
            name: type.brie,
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
            test: "quality > 50, 'brie' = 50 ",
            name: type.brie,
            quality: 50,
            sell_in: 0
        },
        {
            test: "quality = 80, 'brie' = 50 ",
            name: type.brie,
            quality: 50,
            sell_in: 0
        },
        {
            test: "quality = 50, 'backstage' sell_in = 0 (day of concert) = 50 ",
            name: type.backstage,
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
            test: "quality = 80, sulfuras always ",
            name: type.sulfuras,
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
            test: "quality increments by 1, 'backstage' as sell_in decreases > 0",
            name: type.backstage,
            quality: 50,
            sell_in: 0
        },
/*
    TEST (if (sell-in < 0), then quality = 0):
        [11] new Item("Backstage passes to a TAFKAL80ETC concert",0,49)

    EXPECTED:
*/
        {
            test: "quality = 0, 'backstage' sell_in = -1 (day after concert)",
            name: type.backstage,
            quality: 0,
            sell_in: -1
        },
/*
    TEST (if (sell-in < 11), then quality +2):
        [12] new Item("Backstage passes to a TAFKAL80ETC concert",11,30)

    EXPECTED:
*/
        {
            test: "quality increase by 2, 'backstage' sell_in < 11",
            name: type.backstage,
            quality: 32,
            sell_in: 10
        },
/*
    TEST (if (sell-in < 6), then quality +3):
        [13] new Item("Backstage passes to a TAFKAL80ETC concert",6,30)

    EXPECTED:
*/
        {
            test: "quality increase by 3, 'backstage' sell_in < 6",
            name: type.backstage,
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
            test: "quality decrease by 2, 'conjured' always",
            name: type.conjured,
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
            test: "quality is never negative, 'normal' sell_in < 0",
            name: type.normal,
            quality: 0,
            sell_in: -1
        }
]
