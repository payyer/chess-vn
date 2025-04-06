import "./App.css";
import { useState } from "react";
import { chessAudio } from "./utils/Audio";
import { Chessboard } from "react-chessboard";
import { Chess, Move, Square } from "chess.js";
import {
  CustomPieceFnArgs,
  CustomPieces,
  Piece,
  PromotionPieceOption,
} from "react-chessboard/dist/chessboard/types";
import { piecesTheme } from "./utils/piecesTheme";
type TMove =
  | string
  | {
      from: string;
      to: string;
      promotion?: string;
    };

const getGameState = (game: Chess, result: Move) => {
  if (game.isCheck()) return "check";
  if (game.isCheckmate()) return "checkmate";
  if (game.isDraw()) return "draw";
  if (game.isStalemate()) return "stalemate";
  if (game.isThreefoldRepetition()) return "three fold repetition";
  if (game.isInsufficientMaterial()) return "insufficient material";
  if (result.isCapture() || result.isEnPassant()) return "capture";
  return null;
};

function App() {
  const [game, setGame] = useState<Chess>(new Chess());
  const [optionSquares, setOptionSquares] = useState({});
  const [checkStyle, setCheckStyle] = useState({});
  const [moveFrom, setMoveFrom] = useState<Square>();
  const [moveTo, setMoveTo] = useState<Square>();
  const [showPromotionDialog, setShowPromotionDialog] =
    useState<boolean>(false);

  const resetStateAfterMove = () => {
    setOptionSquares({});
    setCheckStyle({});
    setMoveFrom(undefined);
    setMoveTo(undefined);
    setShowPromotionDialog(false);
  };

  const makeAMove = (move: TMove) => {
    try {
      const result = game.move(move);
      setGame(game);
      resetStateAfterMove();
      gameResult(game, result);
      return true;
    } catch {
      if (game.inCheck()) {
        chessAudio.illegalMove();
      }
      return false;
    }
  };

  const gameResult = (game: Chess, result: Move) => {
    const state = getGameState(game, result);
    switch (state) {
      case "checkmate":
      case "draw":
      case "stalemate":
      case "three fold repetition":
      case "insufficient material":
        chessAudio.endGame();
        setTimeout(() => {
          alert(
            state === "checkmate"
              ? `Checkmate!: ${game.turn() === "w" ? "Black" : "White"}`
              : "Draw!"
          );
        }, 300);
        break;
      case "check":
        {
          chessAudio.checkMove();
          const turnCheck = game.turn() == "b" ? "b" : "w";
          const king = game
            .board()
            .flat()
            .find((square) => {
              return square?.type == "k" && square.color == turnCheck;
            });
          const checkStyle = {
            [king!.square]: {
              background: "red",
            },
          };
          setCheckStyle(checkStyle);
        }
        break;
      case "capture":
        chessAudio.captureMove();
        break;
      default:
        chessAudio.safeMove();
        break;
    }
  };

  const onDrop = (sourceSquare: Square, targetSquare: Square, piece: Piece) => {
    const move: TMove = {
      from: sourceSquare,
      to: targetSquare,
      promotion: piece[1].toLowerCase() ?? "q",
    };
    return makeAMove(move);
  };

  const onPieceDragBegin = () => {
    setOptionSquares({});
  };

  const getMoveOptions = (square: Square) => {
    const moves = game.moves({ square, verbose: true });
    const styleSquare: Record<string, object> = {};
    moves.map((move: Move) => {
      styleSquare[move.to] = {
        background:
          game.get(move.to) &&
          game.get(move.to)?.color !== game.get(square)?.color
            ? "radial-gradient(circle, rgba(0,0,0,.1) 85%, transparent 85%)"
            : "radial-gradient(circle, rgba(0,0,0,.1) 25%, transparent 25%)",
        borderRadius: "50%",
      };
      return move;
    });
    setOptionSquares(styleSquare);
    return moves;
  };

  const onSquareClick = (square: Square) => {
    const movesOptions = getMoveOptions(square);

    // get move from
    if (movesOptions.length !== 0) {
      setMoveFrom(square);
      return;
    }

    // get move to
    if (!moveTo) {
      // check move to is valid move
      const validMove = getMoveOptions(moveFrom!);
      const isValidMoveTo = validMove.find(
        (m) => m.from === moveFrom && m.to === square
      );

      // if move is not valid => reset state moveFrom,moveTo and return
      if (!isValidMoveTo) {
        setOptionSquares({});
        return;
      }

      // check promotion move
      if (isValidMoveTo.isPromotion()) {
        setShowPromotionDialog(true);
        setMoveTo(square);
        return;
      }

      const move: TMove = {
        from: moveFrom as string,
        to: square,
      };
      makeAMove(move);
    }
  };

  const onPromotionCheck = (sourceSquare: Square, targetSquare: Square) => {
    const validMoves = getMoveOptions(sourceSquare);
    const isValidMoveTo = validMoves.find(
      (m) => m.from === sourceSquare && m.to === targetSquare
    );
    if (isValidMoveTo?.isPromotion()) {
      setMoveFrom(sourceSquare);
      setMoveTo(targetSquare);
      setShowPromotionDialog(true);
      return true;
    }
    return false;
  };

  const onPromotionPieceSelect = (
    piece?: PromotionPieceOption,
    promoteFromSquare?: Square,
    promoteToSquare?: Square
  ) => {
    const fromOptions = promoteFromSquare ? promoteFromSquare : moveFrom;
    // check if user don't chose promotion piece
    if (!piece) {
      resetStateAfterMove();
      return false;
    }

    const move: TMove = {
      from: fromOptions!,
      to: promoteToSquare!,
      promotion: piece![1].toLowerCase(),
    };
    return makeAMove(move);
  };

  const onClickGameReset = () => {
    game.reset();
    setGame(game);
    resetStateAfterMove();
  };

  const onClickPrevious = () => {
    game.undo();
    setGame(game);
    resetStateAfterMove();
  };

  // Pieces themes
  const pieces: Piece[] = [
    "wP",
    "wN",
    "wB",
    "wR",
    "wQ",
    "wK",
    "bP",
    "bN",
    "bB",
    "bR",
    "bQ",
    "bK",
  ];
  const customPieces: CustomPieces = {};
  pieces.forEach((piece) => {
    customPieces[piece] = (squareWidth: CustomPieceFnArgs) => (
      <div
        style={{
          width: squareWidth.squareWidth,
          height: squareWidth.squareWidth,
          backgroundImage: `url(${piecesTheme[piece]})`,
          backgroundSize: "100%",
        }}
      ></div>
    );
  });

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "100dvh",
      }}
    >
      <div>
        <Chessboard
          boardWidth={560}
          position={game.fen()}
          onPieceDragBegin={onPieceDragBegin}
          onPromotionCheck={onPromotionCheck}
          onPieceDrop={onDrop}
          onSquareClick={onSquareClick}
          customSquareStyles={{
            ...optionSquares,
            ...checkStyle,
          }}
          showPromotionDialog={showPromotionDialog}
          onPromotionPieceSelect={onPromotionPieceSelect}
          promotionToSquare={moveTo}
          customPieces={customPieces}
          customBoardStyle={{
            borderRadius: "4px",
          }}
          customDarkSquareStyle={{
            background: "#7498ad",
          }}
          customLightSquareStyle={{
            background: "#d6e1e6",
          }}
        />

        <div>
          {game.history().map((move, index) => {
            return (
              <span key={index}>
                {index + 1}.{move}
              </span>
            );
          })}
        </div>
        <button onClick={onClickGameReset}>Reset</button>
        <button onClick={onClickPrevious}>Undo</button>
      </div>
    </div>
  );
}

export default App;
