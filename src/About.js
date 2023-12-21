import React, { Component } from "react";
import Header from "./Header.js";

class About extends Component {
  render() {
    return (
      <div className="About">
        <Header />
        <div className="container">
          <div className="row">
            <div className="col-sm">
              <h1>Team Introduction</h1>
              Our team had met each other for the first time in September and we
              all bonded over the initial difficulty of CS620. We started a
              whatsApp group to help each other and when the time came to form a
              group for this project we were already ready. The comradery
              between us while putting this project together made it a less
              daunting experience. We were able to bounce of each other and
              utilize each individuals strengths to achieve a common goal and an
              end product we could all be proud of. We all have a affinity for
              playing games, from board games to video games and physical sports
              too. So when the oppurtuiunty arose to create something fun we
              jumped at it.
            </div>
            <div className="col-sm2">
              <h1>Rules of Game</h1>
              <ul>
                <li>Player must choose to play</li>
                <li>Player must ask the dealer to deal a hand</li>
                <li>
                  Player recieves 2 cards face up and must make their decision
                </li>
                <li>
                  Dealer also recieves 2 cards with one face down and the other
                  face up
                </li>
                <li>Player can "hit" to recieve another card</li>
                <li>Player can also "stand" to keep their current hand</li>
                <li>
                  The dealer's second card is revealed and based on their hand
                  they will draw another card or finish
                </li>
                <li>Player closest to 21 wins</li>
                <li>If you go over 21 you "bust" and automatically lose</li>
                <li>
                  If you land on 21 you automatically win, as would the dealer
                </li>
                <li>
                  A draw will occur if both players land on the same number
                </li>
              </ul>
            </div>
            <div className="col-sm3">
              <h1>History of Game</h1>
              The origin of the game is still up for debate. Some say it was
              invented by the Romans, others say it stems from a game played by
              the French in the 16th century going by the name 'vingt-et-un' or
              twenty-one (in english). The rapid expansion of the games
              popularity can nearly be wholly attributed to French colonists who
              brought thier games and culture to the shores of North America in
              the 17th and 18th centuries. The term 'BlackJack' was coined in
              early gambling halls in the U.S where certain promoters offered an
              increased payout if a black jack (the jack of spades/clubs) was
              drawn alongside an Ace on the first draw.
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default About;