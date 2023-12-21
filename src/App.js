import "./styles.css";
import React, { Component } from "react";
import { deckOfCardsArray } from "./JSON.js";
import Header from "./Header.js";

const deckArray = deckOfCardsArray;

function getRandomInt(max) {
  var newMax = max - 1;
  return Math.floor(Math.random() * Math.floor(newMax));
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardDeck: [],
      playerHand: [],
      dealerHand: [],
      gameBegun: false,
      cardsDealt: false,
      hitInactive: false,
      playerTurnOver: false,
      bust: false,
      playerWins: false,
      dealerWins: false,
      draw: false,
      stand: false
    };
  }
  
  // used to calculate total of player/dealer hands
  getCount(cards) {
    const newDeck = [];
    cards.forEach((card) => {
      if (card.Value === "A" && typeof card !== "undefined") {
        newDeck.push(card);
      } else if (card.Value) {
        newDeck.unshift(card);
      }
    });
    return newDeck.reduce((total, card) => {
      if (card.Value === "J" || card.Value === "Q" || card.Value === "K") {
        return total + 10;
      } else if (card.Value === "A") {
        if (total + 11 <= 21) {
          return total + 11;
        } else {
          return total + 1;
        }
      } else {
        return total + card.Value;
      }
    }, 0);
  }

  // This function checks if the players hand is 21 in order to determine a blackjack
  checkHasPlayerWon(playerCount) {
    if (playerCount === 21) {
      this.setState({ playerWins: true });
      this.setState({ playerTurnOver: true });
    }
  }

  // This function randomly selects a card object from the deck array
  // and adds this card to the player hand array
  playerHit(card) {
   
    let indexToremove = getRandomInt(deckArray.length);
    var removedCard = deckArray[indexToremove];
    var joined = this.state.playerHand.concat(removedCard);
    var playerCount = this.getCount(joined);
    if (this.getCount(joined) > 21) {
      this.setState({ bust: true });
    }
    this.setState({ playerHand: joined });
    var array = deckArray.splice(indexToremove, 1);
    this.setState({ deckArray: array });
    this.checkHasPlayerWon(playerCount);
  }

  // This function adds 2 cards to the players hand array
  // when the deal card button pressed
  add2ToPlayerHandArray(card) {
    let indexToremove = getRandomInt(deckArray.length);
    var removedCard = deckArray[indexToremove];
    var joined = this.state.playerHand.concat(removedCard);
    var array = deckArray.splice(indexToremove, 1);
    this.setState({ playerHand: joined });
    this.setState({ deckArray: array });

    // repeat process adding the second hand to playersHand array and updating
    // playersHand and the deck array
    let indexToremove2 = getRandomInt(deckArray.length);
    var removedCard2 = deckArray[indexToremove2];
    var joined2 = joined.concat(removedCard2);
    var array2 = deckArray.splice(indexToremove2, 1);
    this.setState({ playerHand: joined2 });
    this.setState({ deckArray: array2 });
    // variable stores the updated count for the player hand and checks if it is 21
    var total = this.getCount(joined2);
    this.checkHasPlayerWon(total, "Player");
  }

  // This function adds 2 cards to the dealers hand when the deal cards
  // button is pressed
  add2ToDealerHandArray(card) {
    let indexToremove = getRandomInt(deckArray.length);
    var removedCard = deckArray[indexToremove];
    // add the selected card with concatenation to the playerHand array
    // and store in "joined" variable
    var joined = this.state.dealerHand.concat(removedCard);
    // update state of dealers hand
    this.setState({ dealerHand: joined });
    // remove the card from deck
    var array = deckArray.splice(indexToremove, 1);
    // update playersHand and deck state variables
    this.setState({ cardDeck: array });

    // repeat same process as above to add the second card to dealers
    // hand, updating both the dealersHand and the deck
    let indexToremove2 = getRandomInt(deckArray.length);
    var removedCard2 = deckArray[indexToremove2];
    var joined2 = joined.concat(removedCard2);
    var array2 = deckArray.splice(indexToremove2, 1);
    this.setState({ dealerHand: joined2 });
    this.setState({ deckArray: array2 });
  }

  // This function sets the state of the boolean variables playerTurnOver, hitInactive, stand
  // and dealersTurn to true
  stand(playersHand, dealersHand) {
    this.setState({ stand: true });
    this.setState({ playerTurnOver: true });
    this.setState({ hitInactive: true });
    this.setState({ dealersTurn: true });
    var playerTotal = this.getCount(this.state.playerHand);
    var dealerTotal = this.getCount(this.state.dealerHand);
    // handles checking the value of the dealers hand to determine if they should draw a card
    if (dealerTotal < 17 && this.state.bust === false) {
      let indexToremove = getRandomInt(deckArray.length);
      // get the object at this index to remove
      var removedCard = deckArray[indexToremove];
      // add the selected card with concatenation to the playerHand array
      // and store in "joined" variable
      var joined = this.state.dealerHand.concat(removedCard);
      // updates dealer total in new variable
      dealerTotal = this.getCount(joined);
      this.setState({ dealerHand: joined });
      var array = deckArray.splice(indexToremove, 1);
      // sets a delay for updating the deck array
      setTimeout(() => {
        this.setState({ deckArray: array });
      }, 300000000);
    }

    // the following are if/else if statements determining the players position after
    // standing
    if (playerTotal > dealerTotal && playerTotal <= 21) {
      this.setState({ playerWins: true });
    } else if (playerTotal < dealerTotal) {
      this.setState({ dealerWins: true });
    } else if (playerTotal === dealerTotal) {
      this.setState({ draw: true });
    } else {
      this.setState({ bust: true });
    }
    // checks if the dealer hand is more than 21 to assess if dealer is bust
    if (dealerTotal > 21 && playerTotal <= 21) {
      this.setState({ playerWins: true });
      this.setState({ dealerWins: false });
    }
  }


  startNewGame(e) {
    window.location.reload();
  }

  // this function calls the add2ToPlayerHandArray and
  //add2ToDealerHandArray functions. It also update the state
  // variable gameBegun and cardsDealt to true
  dealCards() {
    this.setState({ gameBegun: true });
    this.add2ToPlayerHandArray();
    this.add2ToDealerHandArray();
    this.setState({ cardsDealt: true });
  }

  render() {

    let playerHitDisable = false;
    // setting the playerHitDiable variable to be true if all the variables
    // listed in the if statement below are true
    if (
      (this.state.playerTurnOver === true && this.state.hitInactive === true) ||
      this.state.bust === true ||
      this.state.playerWins === true ||
      this.state.dealerWins === true ||
      this.state.draw === true
    ) {
      playerHitDisable = true;
    }

    const image = (link) => require(`${link}`);


    let playersHand = this.state.playerHand;
    let dealersHand = this.state.dealerHand;

    //add blank card
    var blankCardIndex = deckArray.length - 1;
    var removedCard3 = deckArray[blankCardIndex];
    dealersHand = dealersHand.concat(removedCard3);

    //remove first card in dealers hand
    dealersHand = dealersHand.slice(1);
    if (
      this.state.stand === true ||
      this.state.playerWins === true ||
      this.state.bust
    ) {
      dealersHand = this.state.dealerHand;
    }
    // handles the rendering of the dealers hand total
    var dealerhandLength = dealersHand.length;
    var hasDealerCards = true;
    if (dealerhandLength === 0) {
      hasDealerCards = false;
    }

    return (
      <div className="App">
        <Header />
        <div className="dealButton">
          <button
            button
            type="button"
            class="btn btn-dark btn-circle btn-xl"
            // button will be disabled when cardsDealt is true
            disabled={this.state.cardsDealt}
            // an event listener which on the click of the Deal Cards button will
            // call the function dealCards and start the game
            onClick={() => this.dealCards()}
          >
            Deal Cards
          </button>
        </div>{" "}
        <div className="buttons">
          {/* the stand button will render when cardsDealt is true */}
          {this.state.cardsDealt && (
            <button
              button
              type="button"
              class="btn btn-dark btn-circle btn-xl"
              // button will be disabled when playerHitDisabler is true
              disabled={playerHitDisable}
              // an event listener which on the click of the player stand button will
              // call the stand function
              onClick={() => this.stand()}
            >
              Player Stand
            </button>
          )}
          {/* the playerHit button will render when cardsDealt is true */}
          {this.state.cardsDealt && (
            <button
              button
              type="button"
              class="btn btn-dark btn-circle btn-xl"
              // button will be disabled when playerHitDisabler is true
              disabled={playerHitDisable}
              // an event listener which on the click of the player hit button
              // will call the playerHit function
              onClick={() => this.playerHit()}
            >
              Player Hit
            </button>
          )}
          {/* the startNewGame button will render when cardsDealt is true */}
          {this.state.cardsDealt && (
            <button
              button
              type="button"
              class="btn btn-dark btn-circle btn-xl"
              // button will be disabled when when gameBegun is false
              disabled={!this.state.gameBegun}
              // an event listener which on the click of the start new game
              // button  will call the startNewGame function
              onClick={(e) => this.startNewGame(e)}
            >
              New Game
            </button>
          )}
        </div>
        {/* div to contain the rendering of the text informing the 
        player whether they have won, lost drawn or went bust */}
        <div className="gameDecision">
          {/* if playerWins and playerTurnOver are true, YOU WIN is rendered 
          to the screen */}
          {this.state.playerWins && this.state.playerTurnOver && (
            <h1>YOU WIN</h1>
          )}
          {/* if dealerWins is true, YOU LOSE is rendered to the screen */}
          {this.state.dealerWins && <h1>YOU LOSE</h1>}
          {/* if draw is true, DRAW is rendered to the screen */}
          {this.state.draw && <h1> DRAW</h1>}
          {/* if bust is true, BUST, YOU LOSE is rendered to the screen */}
          {this.state.bust && <h1> BUST, YOU LOSE!</h1>}
        </div>
        {/* if gameBegun is true the heading Your Cards and the total of 
        the players hand is rendered to the screen */}
        {this.state.gameBegun && (
          // div containing players cards and the total of the players hand
          <div className="player">
            <h2> Your Cards</h2>
            Total: {this.getCount(playersHand)}
          </div>
        )}
        {/* the map function below is called if gameBegun is true */}
        {this.state.gameBegun && (
          // div containing the rendered card images in the playersHand array
          <div className="playersCards">
            {/* map funciton iterating through playersHand array and rendering the card
            images */}
            {playersHand.map((c, ID) => (
              // the unique key is set to the ID property of the object
              <tr key={ID} className="cards">
                <td>
                  {/* the below image tag maps the image using the path stored
                  in the const image declared at the top of the render function  */}
                  <img
                    // reference to image path
                    src={image(c.Image)}
                    // bootstrap responsive image class
                    class="img-responsive"
                    // this will render the Value property of the object if there
                    // is an issue rendering the image
                    alt={c.Value}
                    // These two attributes set the height and width of the image in pixels
                    width="60"
                    height="120"
                  />
                </td>
              </tr>
            ))}
          </div>
        )}
        {/* if playerTurnOver is true the heading Dealers Cards and the total of 
        the dealers hand is rendered to the screen */}
        {hasDealerCards && (
          // div containing the Dealers Cards title and dealersHand total
          <div className="dealer">
            <h2>Dealers Cards</h2>
            Total: {this.getCount(dealersHand)}
          </div>
        )}
        {/* the map function below is called if playerTurnOver is true i.e
        if the player has pressed the stand button */}
        {hasDealerCards && (
          // div containing dealers cards and the total of the dealers hand
          <div className="dealersCards">
            {/* map funciton iterating through dealersHand array and rendering the card
            images */}
            {dealersHand.map((c, ID) => (
              // the unique key is set to the ID property of the object
              <tr key={ID} className="cards">
                <td>
                  {/* the below image tag maps the image using the path stored
                  in the const image declared at the top of the render function  */}
                  <img
                    // reference to image path
                    src={image(c.Image)}
                    // bootstrap responsive image class
                    class="img.responsive"
                    // this will render the Value property of the object if there
                    // is an issue rendering the image
                    alt={c.Value}
                    // These two attributes set the height and width of the image in pixels
                    width="60"
                    height="120"
                  />
                </td>
              </tr>
            ))}
          </div>
        )}
      </div>
    ); // end of return
  } // end of render
} // end of class App
export default App;