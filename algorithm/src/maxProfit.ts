/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    let price = 0;
    for(let i = 1; i<prices.length;i++){
        if(prices[i] > prices[i - 1]){
            price+= prices[i] - prices[i - 1]
        }
    }

    return price
};


console.log(maxProfit([7,1,5,3,6,4]))