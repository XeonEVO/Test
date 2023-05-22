// Question 1: divisible
function isDivisible(n: number): boolean {
    const digits: string[] = String(n).split(''); // Split each digit number
    
    // Check for duplicate digit numbers
    if (new Set(digits).size !== digits.length) {
        return false;
    }
    
    // Check for zero digit number
    if (digits.includes('0')) {
        return false;
    }
    
    // Check if n is divisible by each of its digits
    for (const digit of digits) {
        if (n % parseInt(digit) !== 0) {
            return false;
        }
    }
    
    return true;
}

console.log('Question 1: ' + isDivisible(124));

// Question 2: hand score
function getHandScore(input: string): number {
    const cards: string[] = input.split(' '); // Split each card
    const suits: string[] = ['S', 'C', 'H', 'D']; // Available suits
    const ranks: { [key: string]: number } = {}; // Object to store the count of each rank for A-A-A
    
    // Count each rank
    for (const card of cards) {
        const rank = card[card.length - 1]; // Extract the rank from the card string
        ranks[rank] = (ranks[rank] || 0) + 1; // Add rank to ranks Object
    }
    
    // Check for three cards of the same rank
    const rankKeys = Object.keys(ranks);
    if (rankKeys.length === 1) {
        if (rankKeys[0] === 'A') {
            return 35;
        }
        return 32.5;
    }
    
    let maxScore = 0; // Initialize the maximum score
    
    // Count the score if three cards' ranks are not the same
    for (const suit of suits) {
        let suitScore = 0; // Initialize the score for the current suit
        
        for (const card of cards) {
            if (card.includes(suit)) { // Check if the card belongs to the current suit
                const rank = card.substring(1); // Get the rank of the card
                
                if (['J', 'Q', 'K'].includes(rank)) {
                    suitScore += 10; // J, Q, K are worth 10
                } else if (rank === 'A') {
                    suitScore += 11; // Aces are worth 11
                } else {
                    suitScore += parseInt(rank); // Regular cards are worth their number
                }
            }
        }
        
        if (suitScore > maxScore) {
            maxScore = suitScore; // Update the maximum score if the current suit's score is higher
        }
    }
    
    return maxScore;
}

console.log('Question 2: ' + getHandScore('HA H10 S10'));

// Question 3: clock angle
function getClockAngle(hh_mm: string): number {
    const time = hh_mm.split(':'); // Split hours and minutes
    let hr = parseInt(time[0]); // Hours
    const min = parseInt(time[1]); // Minutes
    
    // Convert time format from 24hr to 12hr
    if (hr >= 12) {
        hr -= 12;
    }
    
    const angle = Math.abs(30 * hr - 5.5 * min); // Find the angle
    
    return Math.min(angle, 360 - angle);
}

console.log('Question 3: ' + getClockAngle("17:30"));
