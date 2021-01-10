function print(f) {
    console.log(typeof f)
    f()
}


print(function() {
    console.log("oui");
})