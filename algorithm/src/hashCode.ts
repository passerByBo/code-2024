// const hashCode = (str) => {
//     let hash = 0, chr;
//     if(str.length === 0) return hash;

//     for(let i = 0;i<str.length; i++){
//         chr = str.charCodeAt(i)
//         hash = ((hash << 5) - hash) + chr;
//         hash |=0
//     }

//     return hash
// }


function hashString(str){
	let hash = 0;
	for (let i = 0; i < str.length; i++) {
		hash += Math.pow(str.charCodeAt(i) * 31, str.length - i);
		hash = hash & hash; // Convert to 32bit integer
	}
	return hash;
}

function hashCode(s) {
    var h = 0
    
    return !s || !s.length
      ? h
      : String(s).split('').reduce(function(h, c) {
        return ((h << 5) - h) + c.charCodeAt(0) << 0
      }, h);
  }

const a = {
    a: 1,
    b: 2,
    c: 3
}

const a2 = {
    a: 1,
    b: 2,
    c: 3
}

const a3 = {
    a: 2,
    b: 2,
    c: 3
}

console.log(hashCode(JSON.stringify(a)))
console.log(hashCode(JSON.stringify(a2)))
console.log(hashCode(JSON.stringify(a3)))