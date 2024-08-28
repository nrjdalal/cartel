'use client'

import { useState } from 'react'

export default function Home() {
  const gridBlocks = Array.from({ length: 49 }, (_, i) => i)

  const playableBlocks = [
    {
      id: 0,
      block: 0,
    },
    {
      id: 1,
      block: 1,
    },
    {
      id: 2,
      block: 2,
    },
    {
      id: 3,
      block: 3,
    },
    {
      id: 4,
      block: 4,
    },
    {
      id: 5,
      block: 5,
    },
    {
      id: 6,
      block: 6,
    },
    {
      id: 7,
      block: 13,
    },
    {
      id: 8,
      block: 20,
    },
    {
      id: 9,
      block: 19,
    },
    {
      id: 10,
      block: 18,
    },
    {
      id: 11,
      block: 17,
    },
    {
      id: 12,
      block: 16,
    },
    {
      id: 13,
      block: 23,
    },
    {
      id: 14,
      block: 30,
    },
    {
      id: 15,
      block: 31,
    },
    {
      id: 16,
      block: 32,
    },
    {
      id: 17,
      block: 33,
    },
    {
      id: 18,
      block: 34,
    },
    {
      id: 19,
      block: 41,
    },
    {
      id: 20,
      block: 48,
    },
    {
      id: 21,
      block: 47,
    },
    {
      id: 22,
      block: 46,
    },
    {
      id: 23,
      block: 45,
    },
    {
      id: 24,
      block: 44,
    },
    {
      id: 25,
      block: 43,
    },
    {
      id: 26,
      block: 42,
    },
    {
      id: 27,
      block: 35,
    },
    {
      id: 28,
      block: 28,
    },
    {
      id: 29,
      block: 21,
    },
    {
      id: 30,
      block: 14,
    },
    {
      id: 31,
      block: 7,
    },
  ]

  const [playerPosition, setPlayerPosition] = useState([0, 0])
  const [turn, setTurn] = useState(0)
  const [dice, setDice] = useState(0)

  return (
    <main className="flex min-h-screen items-center justify-center flex-col bg-gray-50 ">
      <div className="aspect-[9/16] h-full w-full">
        <div className="grid grid-cols-7 gap-0.5">
          {gridBlocks.map((block) => (
            <div key={block}>
              <div
                className={`${
                  playableBlocks.find(
                    (playableBlock) => playableBlock.block === block
                  )
                    ? 'bg-green-500'
                    : 'bg-gray-200'
                } aspect-square items-center justify-center grid`}
              >
                {playableBlocks.find(
                  (playableBlock) => playableBlock.block === block
                )?.id ===
                  playerPosition[0] % 32 && (
                  <div className="size-6 bg-red-500 rounded-full"></div>
                )}

                {playableBlocks.find(
                  (playableBlock) => playableBlock.block === block
                )?.id ===
                  playerPosition[1] % 32 && (
                  <div className="size-6 bg-blue-500 rounded-full"></div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 text-black">
          <button
            onClick={() => {
              const dice = Math.floor(Math.random() * 6) + 1
              setDice(dice)
              setPlayerPosition((prev) => {
                const newPlayerPosition = [...prev]
                newPlayerPosition[turn] += dice
                return newPlayerPosition
              })
              setTurn((prev) => (prev === 0 ? 1 : 0))
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Roll Dice
          </button>
          <div className="mt-4">
            <h1 className="text-xl">Player 1 Position</h1>
            <p>{playerPosition[0]}</p>
          </div>
          <div className="mt-4">
            <h1 className="text-xl">Player 2 Position</h1>
            <p>{playerPosition[1]}</p>
          </div>
          <div className="mt-4">
            <h1 className="text-xl">Turn</h1>
            <p>Player {turn + 1}</p>
          </div>
          <div className="mt-4">
            <h1 className="text-xl">Dice</h1>
            <p>{dice ? 'Unrolled' : dice}</p>
          </div>
        </div>
      </div>
    </main>
  )
}
