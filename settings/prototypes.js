/*
*  Custom prototypes  
*
*  prototypes.js
*/

module.exports = function () {

    /**
     * toFixed Advanced
     * @description: if i wanna use toFixed but as a result have number not a string
     */
    Number.prototype.toFixedAdv = function(numbers) {
      return Number(this.toFixed(numbers))
    }
   

}

