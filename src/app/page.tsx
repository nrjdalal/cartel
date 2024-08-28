'use client'

import { cn } from '@/lib/utils'
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6 } from 'lucide-react'
import { useState } from 'react'

export default function Home() {
  const gridBlocks = Array.from({ length: 64 }, (_, i) => i)

  const [playableBlocks, setPlayableBlocks] = useState([
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
      block: 7,
    },
    {
      id: 8,
      block: 15,
    },
    {
      id: 9,
      block: 23,
    },
    {
      id: 10,
      block: 31,
    },
    {
      id: 11,
      block: 39,
    },
    {
      id: 12,
      block: 47,
    },
    {
      id: 13,
      block: 55,
    },
    {
      id: 14,
      block: 63,
    },
    {
      id: 15,
      block: 62,
    },
    {
      id: 16,
      block: 61,
    },
    {
      id: 17,
      block: 60,
    },
    {
      id: 18,
      block: 59,
    },
    {
      id: 19,
      block: 58,
    },
    {
      id: 20,
      block: 57,
    },
    {
      id: 21,
      block: 56,
    },
    {
      id: 22,
      block: 48,
    },
    {
      id: 23,
      block: 40,
    },
    {
      id: 24,
      block: 32,
    },
    {
      id: 25,
      block: 24,
    },
    {
      id: 26,
      block: 16,
    },
    {
      id: 27,
      block: 8,
    },
  ]) as any

  const [players, setPlayers] = useState([
    {
      position: 0,
      wallet: 1500,
    },
    {
      position: 0,
      wallet: 1500,
    },
  ])

  const [turn, setTurn] = useState(0)
  const [dice, setDice] = useState(0)

  const OnRoll = () => {
    const dice = Math.floor(Math.random() * 6) + 1
    setDice(dice)
    setPlayers((prev) => {
      const newPlayers = [...prev]

      const lastIndex = prev[turn].position % 28
      const nextIndex = (lastIndex + dice) % 28

      const isOwned = playableBlocks.find(
        (playableBlock: { id: number }) => playableBlock.id === nextIndex,
      )?.owned

      if (isOwned === undefined) {
        newPlayers[turn].wallet -= 100
        setPlayableBlocks((prev: any) => {
          const newPlayableBlocks = [...prev]
          newPlayableBlocks[nextIndex].owned = turn
          return newPlayableBlocks
        })
      }

      if (isOwned !== undefined && isOwned !== turn) {
        newPlayers[turn].wallet -= 50
        newPlayers[isOwned].wallet += 50
      }

      if (nextIndex < lastIndex) {
        newPlayers[turn].wallet += 200
      }

      newPlayers[turn].position = nextIndex

      return newPlayers
    })
    if (dice !== 6) {
      setTurn((prev) => (prev === 0 ? 1 : 0))
    }
  }

  return (
    <main className="flex min-h-svh select-none flex-col items-center justify-center bg-gray-50">
      <div className="relative flex aspect-[9/16] w-full flex-col items-center justify-center">
        <div className="absolute bottom-16 right-4 flex items-center justify-center">
          <button
            onClick={() => {
              OnRoll()
            }}
            className={cn(
              'flex size-12 items-center justify-center rounded-md bg-blue-500 p-2 text-white',
              turn === 0 && 'bg-blue-500',
              turn === 1 && 'bg-red-500',
            )}
          >
            {dice === 1 && <Dice1 className="size-8" />}
            {dice === 2 && <Dice2 className="size-8" />}
            {dice === 3 && <Dice3 className="size-8" />}
            {dice === 4 && <Dice4 className="size-8" />}
            {dice === 5 && <Dice5 className="size-8" />}
            {dice === 6 && <Dice6 className="size-8" />}
          </button>
        </div>

        <div>
          <div className="flex items-center justify-center gap-6 p-6">
            <div className="flex items-center justify-center gap-2">
              <div className="size-6 rounded-full bg-red-500"></div>
              <div className="text-red-500">{players[0].wallet}</div>
            </div>
            <div className="flex items-center justify-center gap-2">
              <div className="size-6 rounded-full bg-blue-500"></div>
              <div className="text-blue-500">{players[1].wallet}</div>
            </div>
          </div>
        </div>

        <div className="grid w-full grid-cols-8 gap-0.5">
          {gridBlocks.map((block) => (
            <div key={block}>
              <div
                className={cn(
                  'grid aspect-square items-center justify-center',
                  playableBlocks.find(
                    (playableBlock: { block: number }) =>
                      playableBlock.block === block,
                  ) && 'bg-gray-300',
                  playableBlocks.find(
                    (playableBlock: { block: number }) =>
                      playableBlock.block === block,
                  )?.owned === 0 && 'bg-red-300',
                  playableBlocks.find(
                    (playableBlock: { block: number }) =>
                      playableBlock.block === block,
                  )?.owned === 1 && 'bg-blue-300',
                )}
              >
                {playableBlocks.find(
                  (playableBlock: { block: number }) =>
                    playableBlock.block === block,
                )?.id ===
                  players[0].position % 28 && (
                  <div className="size-6 rounded-full bg-red-500"></div>
                )}
                {playableBlocks.find(
                  (playableBlock: { block: number }) =>
                    playableBlock.block === block,
                )?.id ===
                  players[1].position % 28 && (
                  <div className="size-6 rounded-full bg-blue-500"></div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
