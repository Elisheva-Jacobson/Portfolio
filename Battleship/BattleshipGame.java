package com.company;

import java.util.Arrays;
import java.util.Scanner;

public class BattleshipGame {
    public static int[][] board = new int[10][10];
    public static int[] boats = {5, 4, 3, 3, 2};
    public static int downAcross;
    public static boolean playAgain = true;
    public static char[] rowLabels = {'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'};
    public static char[] columnLabels = {'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'};
    public static final int ROW_CODE = 0;
    public static final int COLUMN_CODE = 1;

    public static void main(String[] args) {
        while (playAgain) {
            placeShips();
            printBoard(board, rowLabels);
            playGame();
            clearBoard(board);
        }
        //game cycle, keeps going as long as player chooses to play a new game
    }

    public static void placeShips() {
        for (int i = 0; i < boats.length; ) {//increment not in parentheses in case need to regenerate for same boat
            int rowIndex = (int) (Math.random() * (board.length - boats[i]));
            int columnIndex = (int) (Math.random() * (board.length - boats[i]));
            //randomly generates spot, ensuring boat won't go off the edge
            downAcross = (int) (Math.random() * 2);//chooses whether boat will go horizontally or vertically
            if (testSpot(boats[i], rowIndex, columnIndex)) {
                //testSpot function ensures boats don't overlap
                for (int shipLength = 0; shipLength < boats[i]; shipLength++) {
                    board[combinedAcrossOrDown(rowIndex, ROW_CODE, shipLength)][combinedAcrossOrDown(columnIndex, COLUMN_CODE, shipLength)] = (i + 1);
                }//to fill spots for each boat, taking into account across or down for each spot
                i++;//so only goes to next boat if found valid spot
            }
        }//for loop for each boat
    }//this function randomly places the ships into valid positions on the board

    public static boolean testSpot(int takesWhichShip, int takesRow, int takesColumn) {
        for (int shipLength = 0; shipLength < takesWhichShip; shipLength++) {
            if (board[combinedAcrossOrDown(takesRow, ROW_CODE, shipLength)][combinedAcrossOrDown(takesColumn, COLUMN_CODE, shipLength)] != 0) {
                return false;
            }//checks each spot the boat will take up
        }
        return true;
    }//mimics placing, but checks if valid spot and returns boolean to allow or not allow

    public static int combinedAcrossOrDown(int takesRowOrColumn, int takesRowOrColumnCode, int takesI) {
        if (downAcross == 0 && takesRowOrColumnCode == ROW_CODE) {
            return takesRowOrColumn;
        } //if it's going across, and you're dealing with the row right now, it returns the row index it was given without incrementing it
        else if ((downAcross == 1) && (takesRowOrColumnCode == COLUMN_CODE)) {
            return takesRowOrColumn;
        } //if it's going down, and you're dealing with the column right now, it returns the column index it was given without incrementing it
        else {
            return (takesRowOrColumn + takesI);
        }//otherwise, it increments what it was given to move along the row or column
    }//to increment for row or column depending on if down or across, use codes to tell what inputting

    public static void printBoard(int[][] anyArr, char[] arrCh) {
        printLabels(columnLabels);
        for (int i = 0; i < anyArr.length; i++) {
            System.out.print(arrCh[i] + " ");
            for (int j = 0; j < anyArr[i].length; j++) {
                System.out.print(anyArr[i][j] + " ");
            }
            System.out.println();
        }
        System.out.println();
    }//to print board with row and column labels

    public static void printLabels(char[] arr) {
        System.out.print("  ");
        for (int i = 0; i < arr.length; i++) {
            System.out.print(arr[i] + " ");
        }
        System.out.println();
    }//to print column labels with spacing

    public static void playGame() {
        int[][] visualBoard = new int[10][10];
        int guesses = 0;
        System.out.println("New Game");
        Scanner scan0bj = new Scanner(System.in);
        int[] sunkenShips = new int[5];
        for (int totalHits = 0; totalHits < 17; ) {
            printBoard(visualBoard, rowLabels);
            System.out.println("A 0 represents a spot you have not checked. \nA 1 represents a spot which you checked and found empty. \nA 2 represents a spot where you scored a hit.\n Enter a column capital letter, then row lowercase letter to guess a spot.");
            int realColumn = indexOf(scan0bj.next().charAt(0), columnLabels);
            int realRow = indexOf(scan0bj.next().charAt(0), rowLabels);
            guesses++;
            if (realRow < 0 || realRow > 9 || realColumn < 0 || realColumn > 9) {
                System.out.println("Invalid entry");
            } else if (board[realRow][realColumn] == 0) {
                visualBoard[realRow][realColumn] = 1;
                System.out.println("Nothing there!");
            } else if (board[realRow][realColumn] == 10) {
                System.out.println("Already Hit!");
            } else {
                visualBoard[realRow][realColumn] = 2;
                System.out.println("Hit!");
                sunkShip(realRow, realColumn, sunkenShips);
                board[realRow][realColumn] = 10;
                totalHits++;
            }
        }//play game in this loop
        //total hits calculates when you won the game - when you've scored 17 hits you won the game
        System.out.println("You won! You took " + guesses + " guesses.");
        while (true) {
            System.out.println("Do you want to play again?\n Enter 0 to quit, or 1 to play a new game");
            int play = scan0bj.nextInt();//try to take out line; before worked for 0 but not 1
            if (play == 0) {
                playAgain = false;
                System.out.println("Thank you for playing!");
                break;
            } else if (play == 1) {
                break;
            } else {
                System.out.println("Invalid entry");
            }//in case of an invalid entry
        }//to allow user to play again
    }

    public static void sunkShip(int takesRealRow, int takesRealColumn, int[] arrTakesSunkenShips) {
        int arrayIndex = (board[takesRealRow][takesRealColumn] - 1);
        //taken spot has its index as a value + 1, to differentiate from the zeroes
        arrTakesSunkenShips[arrayIndex]++;
        //the corresponding index in the sunk ships array is incremented
        if (arrTakesSunkenShips[arrayIndex] == boats[arrayIndex]) {
            //the boats array contains the length of each boat at its index
            //if the sunk ship array and the boats array contain the same value at a given index, the boat has been sunk
            System.out.println("Sunk!");
        }
    }//to display when a boat is sunk. Uses boat indexes, which are board values -1 (to differentiate 0s) to determine when sunk

    public static int indexOf(char x, char[] arr) {
        for (int i = 0; i < arr.length; i++) {
            if (x == (arr[i])) {
                return i;
            }
        }
        return -1;
    }//to convert char inputs into board int indexes for testing

    public static void clearBoard(int[][] arr) {
        for (int i = 0; i < arr.length; i++) {
            Arrays.fill(board[i], 0);
        }//to set board back to 0
    }//to clear board to prep for new game - because board is global
}
