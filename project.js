const ROWS=3
const COLS=3
const   SYMBOLS_COUNT={
    "A":2,
    "B":4,
    "C":6,
    "D":8
    
} 


 const SYMBOLS_VAL ={
    "A":5,
    "B":4,
    "C":3,
    "D":2
 }


const deposit = () => {
    const depositAmount =prompt("enter the amount of deposit: ")
    const numberamount =parseFloat(depositAmount)

    if(isNaN(numberamount)||numberamount<=0){
        console.log("error , try again")
    }
    else{
        return numberamount
    }

}

const getnumberoflines = () => {
    const lines =prompt("enter the number of lines to bet on (1-3): ")
    const numberOflines =parseFloat(lines)

    if(isNaN(numberOflines)||numberOflines<=0 || numberOflines>3  ){
        console.log("error , try again")
    }
    else{
        return numberOflines
    }
}

const getBet = (balance,numberOflines) =>{
    while(true){
    const bet=prompt("enter the bet per line")
    const numberbet =parseFloat(bet)

    if(isNaN(numberbet)|| numberbet <=0 || numberbet > (balance/numberOflines)){
        console.log("invaild bet try again ")
    }
    else{
        return  numberbet
    }
}
} 

const spin = () =>{
 const symbols =[]
 for(const [symbol , count] of Object.entries(SYMBOLS_COUNT)){
    for (let i =0 ; i< count ;++i){
        symbols.push(symbol)
    }
 }
 console.log(symbols)

 const reels = [[],[],[]]
 for(let i=0 ; i<COLS;++i){
    const reelSymbols =[...symbols]
    for (let j =0;j<ROWS;++j){
        const randomIndex=Math.floor(Math.random()*reelSymbols.length)
        const selectedSymbol = reelSymbols[randomIndex]
        reels[i].push(selectedSymbol)
        reelSymbols.splice(randomIndex,1)

    }
 }
 return reels

 
}

const transpose = (reels) =>{
    const rows = []
    for(let i = 0 ; i<ROWS ;++i){
        rows.push([])
        for (let j =0 ; j<COLS;++j){
            rows[i].push(reels[j][i])
        }
    }
    return rows
}


const print = (rows) => {
    for(const row of rows ){
        let rowstring =""
        for(const [i , symbol] of rows.entries()){
            rowstring +=symbol
            if(i !=rows.length - 1){
                rowstring += " | "
            }
        }
        console.log(rowstring)
    }
}

const wins = ( rows , bet , lines) =>{
    let winnings = 0

    for (let row = 0 ; row < lines ; ++row){
        const symbols = rows[row]
        let allsame = true
        for(const symbol of symbols){
            if (symbol != symbol[0]){
                allsame = false
                break 
            }
        }

        if (allsame){
            winnings+= bet * SYMBOLS_VAL[symbols[0]]
        }
    }
    return winnings
}


const game = () => {
let balance = deposit()

while (true){
console.log("you have a balance of $" + balance)
const reels =spin() 
const rows = transpose(reels)
const numOflines = getnumberoflines()
const bet = getBet(balance,numOflines)
balance -= bet * numOflines
const winnings = wins( rows , bet , numOflines)
balance += winnings
print(rows)
console.log("you won ,$"+ winnings.toString())

if (balance<= 0){
    console.log("you ran out of money!")
    break
}
const play = prompt(" you want to play again (y/n) ? ")
if (play!="y") break 
}
}

game()