package company;

import java.util.Arrays;

public class BattleshipBoard {
    static int[] boats = {5, 4, 3, 3, 2};
    static final int ROW_CODE = 0;
    static final int COLUMN_CODE = 1;
    static final int HORIZONTAL = 0;
    static final int VERTICAL = 1;
    static final int EMPTY_SPOT = -1;
    static final int ALREADY_FOUND = 10;
    static final int TOTAL_HITS = 17;

    int board_length;
    int [][] board;
    int downAcross;
    int[] sunkenShips = new int[boats.length];
    int hits_scored = 0;

    public BattleshipBoard(int board_length) {
        this.board_length = board_length;
        board = new int[board_length][board_length];
        fillBoard();
    }

    void fillBoard() {
        resetBoard();
        placeShips();
    }

    void resetBoard(/*int[][] arr, int [] arr2*/) {
        for (int i = 0; i < board.length; i++) {
            Arrays.fill(board[i], EMPTY_SPOT);
        }
    }

    void placeShips() {
        int row;
        int column;
        for (int i = 0; i < boats.length; ) {//increment not in parentheses in case need to regenerate for same boat
            downAcross = (int) (Math.random() * 2);
            if (downAcross == HORIZONTAL) {
                row = (int) (Math.random() * board.length);
                column = (int) (Math.random() * (board.length - boats[i] - 1));
            } else {
                row = (int) (Math.random() * (board.length - boats[i] - 1));
                column = (int) (Math.random() * board.length);
            }
            if (testSpot(boats[i], row, column)) {
                for (int shipLength = 0; shipLength < boats[i]; shipLength++) {
                    board[moveAcrossOrDown(row, ROW_CODE, shipLength)][moveAcrossOrDown(column, COLUMN_CODE, shipLength)] = i;
                }
                i++;
            }
        }
    }

    boolean testSpot(int shipLength, int row, int column/*, int takesRow, int takesColumn*/) {
        for (int shipSpots = 0; shipSpots < shipLength; shipSpots++) {
            if (board[moveAcrossOrDown(row, ROW_CODE, shipSpots)][moveAcrossOrDown(column, COLUMN_CODE, shipSpots)] != EMPTY_SPOT) {
                return false;
            }
        }
        return true;
    }

    int moveAcrossOrDown(int rowOrColumnIndex, int rowOrColumnCode, int increment) {
        if (downAcross == HORIZONTAL && rowOrColumnCode == ROW_CODE) {
            return rowOrColumnIndex;
        } else if ((downAcross == VERTICAL) && (rowOrColumnCode == COLUMN_CODE)) {
            return rowOrColumnIndex;
        } else {
            return (rowOrColumnIndex + increment);
        }
    }


    void trackHits() {
        hits_scored++;
    }

    public boolean gameOver() {
        if (hits_scored == TOTAL_HITS) {
            return true;
        }
        return false;
    }

    public int scoredHit(int row, int col) {
        if (board[row][col] == EMPTY_SPOT) {
            return PlayBattleship.NOTHING_FOUND;
        } else {
            if (board[row][col]!=ALREADY_FOUND) {
                trackHits();
                if (sunkShip(row, col)) {
                    return PlayBattleship.SUNK_SHIP;
                }
                return PlayBattleship.HIT_SHIP;
            }
            return PlayBattleship.SAME_SPOT;
        }
        }

    boolean sunkShip(int row, int col) {
        int boatIndex = board[row][col];
        sunkenShips[boatIndex]++;
        board[row][col] = ALREADY_FOUND;
        if (boatIndex < 0 || boatIndex > 4) {
            System.out.println("Got an error index, or was already found");
            return false;
        }
        if (sunkenShips[boatIndex] == boats[boatIndex]) {
            return true;
        }
        return false;
    }
}