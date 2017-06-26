# Gilded Rose Kata REFACTOR

## Demo
* http://rchgrca.io/gilded-rose-kata/refactor/

## Learned
* current implication is difficult to read and debug
  * multiple nested ifs make it difficult to separate business functionality from product types
  * the most important function, decrementing 'sell_in', occurs in the middle of each iteration.
  * refactor should be based on functionality first, then product types
  * remove nested ifs on next refactor to make code easier to read


## Goal
* make code easier for another to developer to read, debug, and add more features

## Approach
* trust recently created test coverage
* separate main business functionality
  * sell_in < 0 ? dothis : dothat
* create many functions that do only thing
* put functionalality in better order
* determine if product type is valid for functionality by placing in an array and running .includes()
* display test case results on a webpage and debugger console
* DON'T REPEAT YOURSELF (DRY)

## Execution
* put functionality in better order
  * TOP: items[i].sell_in = decrementSellIn(items[i])
    * sell_in always decrements
  * NEXT: set product types with fixed values
    * "Sulfuras, Hand of Ragnaros"
    * skip rest of code, continue iterating
  * NEXT: separate product types that increase in quality
    * 'Aged Brie','Backstage passes to a TAFKAL80ETC concert'
    * add min/max quality bounds
    * skip rest of code, continue iterating
  * NEXT: separate sell_in functionality
    * sell_in < 0, decrement quality twice
    * sell_in >= 0, decrement quality once
    * add min/max quality bounds
  * run tests after each code change

## future
* create class that allows for easy addition of new product types
