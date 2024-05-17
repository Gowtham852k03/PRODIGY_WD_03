import React, { useEffect, useState } from 'react';

const Tic_Tak_Toe = () => {
    const O = "O";
    const X = "X";
    let currentPlayer = X;
    let spaces = Array(9).fill(null);
    let gameFinished = false;
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    useEffect(() => {
        const boxes = Array.from(document.getElementsByClassName('box'));
        boxes.forEach((box) => {
            box.addEventListener('click', boxClicked);
        });

        return () => {
            boxes.forEach((box) => {
                box.removeEventListener('click', boxClicked);
            });
        };
    }, []);

    const boxClicked = (e) => {
        if (gameFinished) return;

        const id = e.target.id;
        if (!spaces[id]) {
            spaces[id] = currentPlayer;
            e.target.innerText = currentPlayer;
            e.target.style.color = currentPlayer === X ? 'red' : 'blue';
            e.target.style.borderColor = currentPlayer === X ? 'red' : 'blue';
            e.target.style.borderColor = 'aliceblue';
            currentPlayer = currentPlayer === X ? O : X;
            const winningBlocks = playerHasWon();
            if (winningBlocks) {
                gameFinished = true;
                let playerText = document.getElementsByClassName('title')[0];
                const winner = spaces[id];
                const winnerText = winner === X ? `<span style="color:red">${winner}</span>` :
                    winner === O ? `<span style="color:blue">${winner}</span>` :
                        'Match Draw';
                playerText.innerHTML = `" ${winnerText} " Has Won`;

                winningBlocks.forEach((id) => {
                    const box = document.getElementById(id);
                    box.classList.add('winning-blocks');
                    box.style.color = spaces[id] === O ? 'blue' : 'red';
                });
            } else if (spaces.every((space) => space !== null)) {
                gameFinished = true;
                let playerText = document.getElementsByClassName('title')[0];
                playerText.innerHTML = 'Match Draw';
            }
        }
    };

    const playerHasWon = () => {
        for (const condition of winningCombinations) {
            let [a, b, c] = condition;
            if (spaces[a] && (spaces[a] === spaces[b] && spaces[a] === spaces[c])) {
                return [a, b, c];
            }
        }
        return false;
    };

    const restartGame = () => {
        const winningBlocks = document.querySelectorAll('.winning-blocks');
        winningBlocks.forEach((block) => {
            block.classList.remove('winning-blocks');
        });
        const boxes = Array.from(document.getElementsByClassName('box'));
        boxes.forEach((box) => {
            box.innerText = '';
            box.style.color = '';
            box.style.borderColor = '';
            box.style.backgroundColor = '';
        });
        spaces = Array(9).fill(null);
        currentPlayer = X;
        gameFinished = false;
        let playerText = document.getElementsByClassName('title')[0];
        playerText.innerText = '';
    };

    return (
        <div className='container'>
            <h1 className="ttt">Tic-Tak-Toe</h1>
            <h1 className='title'></h1>
            <div className='gameboard'>
                <div className="box" id="0"></div>
                <div className="box" id="1"></div>
                <div className="box" id="2"></div>
                <div className="box" id="3"></div>
                <div className="box" id="4"></div>
                <div className="box" id="5"></div>
                <div className="box" id="6"></div>
                <div className="box" id="7"></div>
                <div className="box" id="8"></div>
            </div>
            <button className='restartbtn' onClick={restartGame}>Restart</button>
        </div>
    );
};

export default Tic_Tak_Toe;
