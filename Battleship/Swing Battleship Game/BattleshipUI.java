package company;

import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class BattleshipUI extends JFrame{

    static final int BOARD_LENGTH = 900;
    int row_length;
    int spot_size;
    PlayBattleship controller;
    public Spot [][] spots;

    public BattleshipUI (PlayBattleship controller, int row_length) {
        this.row_length = row_length;
        this.spot_size = BOARD_LENGTH/row_length;
        spots = new Spot[row_length][row_length];
        this.controller = controller;
        startGame();
    }

    void startGame() {
        setSize(BOARD_LENGTH, BOARD_LENGTH);
        setLayout(new GridLayout(row_length, row_length));
        setDefaultCloseOperation(EXIT_ON_CLOSE);
        setLocationRelativeTo(null);
        setResizable(false);
        populateSquares();
    }

    public void explainGame() {
        JOptionPane.showMessageDialog(null, "Welcome to Battleship! Any circle may have a ship behind it. \nTap on the circle to find out! If the circle turns green, there's no ship there. \n If the circle turns red, you scored a hit! \n There are five ships: 1 is five spots long, 1 is 4 spots long, 2 are 3 spots long, and 1 is 2 spots long. \n We will let you know when you sink a ship!\nGood luck!");
    }

    void populateSquares () {
        for(int i = 0; i < spots.length; i++) {
            for(int j = 0; j < spots.length; j++) {
                spots[i][j] = new Spot(i, j);
                add(spots[i][j]);
            }
        }
    }

    public void resetSquares () {
        for (int i = 0; i < spots.length; i++) {
            for (int j = 0; j < spots[i].length; j++) {
                spots[i][j].resetSpot();
            }
        }
    }

    public boolean endOfGame() {
        System.out.println("Game Over");
        String [] options = {"Yes", "No"};
        int choice = JOptionPane.showOptionDialog(null, "Do you want to play again", "Game Over", JOptionPane.YES_NO_OPTION, JOptionPane.QUESTION_MESSAGE, null, options, options[1]);
        if (choice==0) {
            return true;
        } else {
            return false;
        }
    }

    public void endingMessage() {
        JOptionPane.showMessageDialog(null, "Thank you for playing!");
    }

    public void sunkShip(){
        JOptionPane.showMessageDialog(null, "You sunk a ship!");
    }



    public class Spot extends JButton {

        int row_id;
        int col_id;

        public Spot (int row_id, int col_id) {
            this.row_id = row_id;
            this.col_id = col_id;
            setSize(spot_size, spot_size);
            setText("O");
            setForeground(Color.BLACK);
            setBorder(BorderFactory.createLineBorder(Color.MAGENTA, 2));
            setOpaque(true);
            setBackground(Color.WHITE);
            addActionListener(new ActionListener() {
                @Override
                public void actionPerformed(ActionEvent actionEvent) {
                    controller.spotClicked(row_id, col_id);
                }
            });
        }

        public void resetSpot() {
            setForeground(Color.BLACK);
        }

        public void spotHit() {
            setForeground(Color.RED);
        }

        public void spotMissed() {
            setForeground(Color.GREEN);
        }
    }
}
