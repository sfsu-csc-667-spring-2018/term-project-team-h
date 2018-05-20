function compareHands(data){
    let winner = [];
    for(let i = 0; i < data.length; i++){
        switch(winner.length){
            case 0:
                winner.push(data[i]);
                break;
            default:
                if(winner[0].type == data[i].type){
                    winner.push(data[i]);
                }else if(winner[0].type < data[i].type){
                    winner = [];
                    winner.push(data[i]);
                }
                break;
        }
    }


    return winner;
};

function sortHand(data){
    let hand = [data[0]];
    let index = 0;
    for(let i = 1; i < data.length; i++){
        index = 0;
        while(index < hand.length && hand[index].value < data[i].value){
            i++;
        }
        hand.splice(index, 0, data[i]);
    }

    return hand;
}

function findMatches(data){
    let result = [], stack = [];
    for(let i = 0; i < data.length; i++){

        if(stack.length === 0 || stack[0].value === data[i].value){
            stack.push(data[i]);
        }else{
            if(stack.length > 1){
                result.push(stack);
            }
            stack = [data[i]];
        }

    }

    if(stack.length > 1){
        result.push(stack);
    }


    return result;
}

//1 = high card
//2 = 1 pair
//3 = 2 pair
//4 = 3 of a kind
//5 = straight
//6 = flush
//7 = full house
//8 = four of a kind
//9 = straight flush
function evaluateHand(data){
    let hand = sortHand(data), result = {type: 1, hand: [], originalHand: hand};
    let flushes = getFlushes(hand);
    let straights = getStraights(hand);
    let matches = evaluateMatchHands(findMatches(hand));

    if(getStraights(flushes).length > 0){
        result.type = 9;
        result.hand = getStraights(flushes);
    }else if(matches.type === 8){
        result.type = 8;
        result.hand = matches.cards; //TODO: add kicker
        let kickers = findKickers({hand: result.hand, cards: hand});
        result.hand.push(kickers[kickers.length-1]);
    }else if(matches.type === 7){
        result = matches;
    }else if(flushes.length > 0){
        while(flushes.length != 5){
            flushes.splice(0,1);
        }
        result.hand = flushes;
        result.type = 6;
    }else if(straights.length > 0){
        result.type = 5;
        result.cards = straights[straights.length - 1];
    }else{
        result.type = matches.type;
        if(matches.length > 0) {
            result.hand = [matches.cards[0][0], matches.cards[0][1]];
        }
        let kickers = findKickers({hand: result.hand, cards: hand});
        while(result.hand.length < 5){
            if(kickers[0].value == 1){
                result.hand.push(kickers[0]);
                kickers.splice(0, 1);
            }else{
                result.hand.push(kickers.pop());
            }
        }

    }
    return result;
}

function findKickers(data){
    let hand = data.hand;
    let cards = data.cards;

    let result = [];
    for(let i = 0; i < cards.length; i++){
        if(!hand.includes(cards[i])){
            result.push(cards[i]);
        }
    }

    return result;
}


function evaluateMatchHands(data){
    let pairs = [], triples = [], result = {cards: [], type: 0};
    for(let i = 0; i < data.length; i++){
        switch(data[i].length){
            case 2:
                pairs.push(data[i]);
                break;
            case 3:
                triples.push(data[i]);
                break;
            case 4:
                result.cards = data[i];
                result.type = 8;
                return result;
        }
    }


    switch(triples.length){
        case 0:
            break;
        case 1:
            for(let i = 0; i < 3; i++) {
                result.cards.push(triples[0][i]);
            }
            result.type = 4;
            if(pairs.length >= 1){
                result.cards.push(pairs[0][0]);
                result.cards.push(pairs[0][1]);
                result.type = 7;
            }
            return result;
        case 2:
            for(let i = 0; i < 3; i++) {
                result.push(triples[1][i]);
            }
            result.cards.push(triples[0][0]);
            result.cards.push(triples[0][1]);
            result.type = 7;
            return result;
    }

    switch(pairs.length){
        case 0:
            result.type = 0;
            return result;
        case 1:
            result.cards.push(pairs[0]);
            result.type = 1;
            return result;
        case 2:
            result.cards.push(pairs[0][0]);
            result.cards.push(pairs[0][1]);
            result.cards.push(pairs[1][0]);
            result.cards.push(pairs[1][1]);
            result.type = 2;
            return result;
    }

}


function sortHand(data){
    let hand = [data[0]];
    let index;
    for(let i = 1; i < data.length; i++){
        index = 0;
        while(index < hand.length && hand[index].value < data[i].value){
            index++;
        }
        hand.splice(index, 0, data[i]);
    }

    return hand;
}

function getStraights(data){
    let result = [], queue = [];
    for(let i = 0;i < data.length; i++){
        if(queue.length === 0) {
            queue.push(data[i]);
        }else if(data[i].value === data[i-1] ){

        }else if(data[i].value === data[i-1].value + 1){
            queue.push(data[i]);
            if(queue.length === 5){
                result.push([queue[0], queue[1], queue[2], queue[3], queue[4]]);
                queue.splice(0, 1);
            }
            if(i === data.length - 1 && data[i].value === 13 && data[0].value === 1 && queue.length === 4){
                queue.push(data[0]);
                result.push([queue[0], queue[1], queue[2], queue[3], queue[4]]);
            }
        }else {
            queue = [];
            queue.push(data[i]);
        }

    }


    return result;
}

function getFlushes(data){
    let spades = [], clovers = [], hearts = [], diamonds = [];
    for(let i = 0;i < data.length; i++){
        switch(data[i].suit){
            case "spades":
                spades.push(data[i]);
                break;
            case "clovers":
                clovers.push(data[i]);
                break;
            case "hearts":
                hearts.push(data[i]);
                break;
            case "diamonds":
                diamonds.push(data[i]);
                break;
        }
    }

    if(spades.length >= 5){
        return spades;
    }else if(clovers.length >= 5){
        return clovers;
    }else if(hearts.length >=5){
        return hearts;
    }else if(diamonds.length >= 5){
        return diamonds;
    }else{
        return [];
    }
}


