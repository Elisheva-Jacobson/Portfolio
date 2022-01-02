package company;

public class PlayBattleship {


   // int guesses;
    public static final int NOTHING_FOUND = -1;
    public static final int HIT_SHIP = 0;
    public static final int SUNK_SHIP = 1;
    public static final int SAME_SPOT = 2;

    final int BOARD_LENGTH = 10;
    BattleshipUI ui = new BattleshipUI(this, BOARD_LENGTH);
    BattleshipBoard hiddenBoard;

    public static void main(String[] args) {
        new PlayBattleship();
    }

    public PlayBattleship() {
        beginGame();
        ui.setVisible(true);
        ui.explainGame();
    }


    void beginGame() {
        hiddenBoard = new BattleshipBoard(BOARD_LENGTH);
        //guesses = 0;
    }

//    void trackGuesses() {
//        guesses++;
//    }
//
//    public int getGuesses() {
//        return guesses;
//    }

    public void spotClicked(int row, int col) {
        //trackGuesses();
        int hitStatus = hiddenBoard.scoredHit(row, col);
        switch(hitStatus) {
            case NOTHING_FOUND: {
                ui.spots[row][col].spotMissed();
                break;
            }
            case SAME_SPOT: {
                break;
            }
            case HIT_SHIP: {
                ui.spots[row][col].spotHit();
                break;
            }
            case SUNK_SHIP: {
                ui.spots[row][col].spotHit();
                ui.sunkShip();
                if(gameOver()) {
                    boolean newGame = ui.endOfGame();
                    if(newGame){
                        beginGame();
                        ui.resetSquares();
                    } else {
                        ui.endingMessage();
                        endGame();
                    }
                }
                break;

            }
        }
    }

    boolean gameOver() {
        return hiddenBoard.gameOver();
    }

    void endGame() {
        System.exit(0);
    }

}