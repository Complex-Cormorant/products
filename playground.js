const obj = [
    {
        name: 'josh',
        age: 27
    },
    {
        name:'sarah',
        age: 22
    }
]

console.log(obj.map(obj => {
    return obj.name
}))