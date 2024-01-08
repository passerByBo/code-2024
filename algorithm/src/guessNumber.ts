/** 
 * Forward declaration of guess API.
 * @param {number} num   your guess
 * @return 	     -1 if num is higher than the picked number
 *			      1 if num is lower than the picked number
 *               otherwise return 0
 * var guess = function(num) {}
 */
 var guess = function(num):number {}
// 二分是分治的粗略

// 分治 分 解 合

 function guessNumber(n){
    let low = 1
    let high = n

    while(low <= high){
        const mid = low + Math.floor((high - low) /2)
        const res = guess(mid)
        if(res === 0){
            return mid
        } else if(res < 0) {
            high = mid - 1
        } else {
            low = mid + 1
        }

    }

    return -1
 };