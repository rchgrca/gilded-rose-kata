# Gilded Rose Kata

## Demo
* http://rchgrca.io/gilded-rose-kata/

## Approach

* We are working with a small inn
  * not tech savvy
  * all they care about:  reliability, cost
    * what they don't care about: maintenance
* Plan
  * do not refactor (yet), add code to current design pattern (for speed and reliability)
    * since there is no test coverage, it will be easy to break something else with new code
  * use TDD (Test Driven Development) approach:
    * create test cases that assert current functionality
    * create test cases that assert new features
    * with sufficient test coverage, refactoring can be done with confidence and speed in the future

## Execution

* Investigate output
  * instantiate Item class
    * new Item("Aged Brie",0,46)
  * add to items array
    * var items = [new Item("Aged Brie",0,46)]
  * call "update_quality()"
  * examine array items and item[i]
  * add more instantiations of Item class
  * examine array items and item[i]
* Create test cases
  * create index.html to be served by localhost webserver
    * include gilded_rose.js
    * create and include test.js
    * NOTE:  moment.js is not needed.  originally I thought I might need it. I simply forgot to delete it before commiting
  * test.js
    * product type strings are long, shorten them with a var
    * populate items[] array with Item instantiations
    * create 'cases[]' array
      * this contains expected result objects from items (cases)
        * each object will contain the expected result object for the case
        * compare each object property name to it's expected result:
          * items[i].name == cases[i].name
          * items[i].sell_in == cases[i].sell_in
          * items[i].quality == cases[i].quality
        * 3 'true' and the test passes
        * iterate on items and cases
        * write output to console
      * write each cases as per the description in the original README.md
    * write code in 'gilded_rose.js' to get each individual case to pass (TDD) until all cases pass

## Learned
* current implication is difficult to read and debug
  * multiple nested ifs make it difficult to separate business functionality from product types
  * the most important function, decrementing 'sell_in', occurs in the middle of each iteration.
  * refactor should be based on functionality first, then product types
  * remove nested ifs on next refactor to make code easier to read
