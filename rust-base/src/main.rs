use num::complex::Complex;
fn main() {
    let mut x = 5;
    println!("the value x of: {}", x);
    x = 6;
    println!("the value x of: {}", x);
    let (a, mut b): (bool, bool) = (true, false);
    println!("a = {:?}, b = {:?}", a, b);
    b = true;
    assert_eq!(a, b);
    for i in 1..=5 {
        println!("{}", i)
    }

    let a = Complex {re: 2.1, im: -1.2};
    let b = Complex::new(11.2, 22.2);
    let result = a + b;

    println!("{} + {}i", result.re, result.im);
}
