'use client'

import { cn } from '@/lib/utils'
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6 } from 'lucide-react'
import { useState } from 'react'
import { toast, Toaster } from 'sonner'

export default function Home() {
  const gridBlocks = Array.from({ length: 64 }, (_, i) => i)

  const [playableBlocks, setPlayableBlocks] = useState([
    {
      id: 0,
      block: 0,
      name: 'Go',
    },
    {
      id: 1,
      block: 1,
      name: 'Rio',
      price: 100,
      color: 'bg-green-400',
    },
    {
      id: 2,
      block: 2,
      name: 'Delhi',
      price: 100,
      color: 'bg-green-400',
    },
    {
      id: 3,
      block: 3,
      name: 'Bangkok',
      price: 130,
      color: 'bg-blue-400',
    },
    {
      id: 4,
      block: 4,
      name: 'Harbor',
      price: 100,
    },
    {
      id: 5,
      block: 5,
      name: 'Cairo',
      price: 150,
      color: 'bg-blue-400',
    },
    {
      id: 6,
      block: 6,
      name: 'Madrid',
      price: 150,
      color: 'bg-blue-400',
    },
    {
      id: 7,
      block: 7,
      name: 'Chance',
    },
    {
      id: 8,
      block: 15,
      name: 'Jakarta',
      price: 170,
      color: 'bg-pink-400',
    },
    {
      id: 9,
      block: 23,
      name: 'Berlin',
      price: 180,
      color: 'bg-pink-400',
    },
    {
      id: 10,
      block: 31,
      name: 'Moscow',
      price: 200,
      color: 'bg-orange-400',
    },
    {
      id: 11,
      block: 39,
      name: 'Railway',
      price: 150,
    },
    {
      id: 12,
      block: 47,
      name: 'Toronto',
      price: 200,
      color: 'bg-orange-400',
    },
    {
      id: 13,
      block: 55,
      name: 'Seoul',
      price: 200,
      color: 'bg-orange-400',
    },
    {
      id: 14,
      block: 63,
      name: 'Jail',
    },
    {
      id: 15,
      block: 62,
      name: 'Zurich',
      price: 250,
      color: 'bg-teal-400',
    },
    {
      id: 16,
      block: 61,
      name: 'Riyadh',
      price: 250,
      color: 'bg-teal-400',
    },
    {
      id: 17,
      block: 60,
      name: 'Sydney',
      price: 300,
      color: 'bg-red-400',
    },
    {
      id: 18,
      block: 59,
      name: 'Electricity',
      price: 200,
    },
    {
      id: 19,
      block: 58,
      name: 'Beijing',
      price: 300,
      color: 'bg-red-400',
    },
    {
      id: 20,
      block: 57,
      name: 'Dubai',
      price: 300,
      color: 'bg-red-400',
    },
    {
      id: 21,
      block: 56,
      name: 'Trade',
    },
    {
      id: 22,
      block: 48,
      name: 'Paris',
      price: 350,
      color: 'bg-violet-400',
    },
    {
      id: 23,
      block: 40,
      name: 'Hong Kong',
      price: 350,
      color: 'bg-violet-400',
    },
    {
      id: 24,
      block: 32,
      name: 'London',
      price: 420,
      color: 'bg-yellow-400',
    },
    {
      id: 25,
      block: 24,
      name: 'Airport',
      price: 250,
    },
    {
      id: 26,
      block: 16,
      name: 'Tokyo',
      price: 420,
      color: 'bg-yellow-400',
    },
    {
      id: 27,
      block: 8,
      name: 'New York',
      price: 450,
      color: 'bg-yellow-400',
    },
  ]) as any

  const [players, setPlayers] = useState([
    {
      position: 0,
      wallet: 1500,
      lastTransaction: 0,
    },
    {
      position: 0,
      wallet: 1500,
      lastTransaction: 0,
    },
  ])

  const [turn, setTurn] = useState(0)
  const [dice, setDice] = useState(0)

  const OnRoll = () => {
    const dice = Math.floor(Math.random() * 6) + 1
    setDice(dice)
    setPlayers((prev) => {
      const addToToaster = []
      let lastTransaction = 0

      const newPlayers = [...prev]

      const lastIndex = prev[turn].position % 28
      const nextIndex = (lastIndex + dice) % 28

      if (nextIndex < lastIndex) {
        newPlayers[turn].wallet += 200
        lastTransaction += 200
        addToToaster.push('You passed go, collect $200.')
      }

      const isOwned = playableBlocks.find(
        (playableBlock: { id: number }) => playableBlock.id === nextIndex,
      )?.owned

      if (isOwned === undefined) {
        const price = playableBlocks.find(
          (playableBlock: { id: number }) => playableBlock.id === nextIndex,
        )?.price

        if (price && newPlayers[turn].wallet >= price) {
          newPlayers[turn].wallet -= price
          lastTransaction -= price
          setPlayableBlocks((prev: any) => {
            const newPlayableBlocks = [...prev]
            newPlayableBlocks[nextIndex].owned = turn
            return newPlayableBlocks
          })
          addToToaster.push(`${turn ? 'Blue' : 'Red'} bought a property.`)
        } else {
          if (price) {
            addToToaster.push(
              `${turn ? 'Blue' : 'Red'} does not have enough money to buy this property.`,
            )
          }
        }
      }

      if (isOwned !== undefined && isOwned !== turn) {
        const rent =
          playableBlocks.find(
            (playableBlock: { id: number }) => playableBlock.id === nextIndex,
          )?.price / 2

        newPlayers[turn].wallet -= rent
        lastTransaction -= rent
        newPlayers[isOwned].wallet += rent
        newPlayers[isOwned].lastTransaction = rent
        addToToaster.push(
          `${turn ? 'Blue' : 'Red'} paid $${rent} to player ${
            !turn ? 'Blue' : 'Red'
          }.`,
        )
      }

      if (dice === 6) {
        addToToaster.push('You rolled a 6, roll again!')
      }

      newPlayers[turn].position = nextIndex
      newPlayers[turn].lastTransaction = lastTransaction

      addToToaster.length && toast(addToToaster.join('\n'))

      return newPlayers
    })

    if (dice !== 6) {
      setTurn((prev) => (prev === 0 ? 1 : 0))
    }
  }

  return (
    <main className="flex min-h-svh select-none flex-col items-center justify-center bg-gray-50">
      <Toaster position="top-center" />
      <div className="relative flex w-full flex-col items-center justify-center md:w-1/2">
        <div className="absolute -bottom-16 right-4 flex items-center justify-center">
          <button
            onClick={() => {
              OnRoll()
            }}
            className={cn(
              'grid aspect-square size-12 items-center justify-center rounded-md text-2xl text-white',
              turn === 0 && 'bg-blue-500',
              turn === 1 && 'bg-red-500',
            )}
          >
            {dice === 1 && 1}
            {dice === 2 && 2}
            {dice === 3 && 3}
            {dice === 4 && 4}
            {dice === 5 && 5}
            {dice === 6 && 6}
          </button>
        </div>

        <div>
          <div className="flex items-center justify-center gap-6 p-6">
            <div className="flex items-center justify-center gap-2">
              <div
                className={cn(
                  'size-6 rounded-full bg-red-500',
                  turn === 0 && 'animate-bounce',
                )}
              />
              <div className="text-red-500">
                ${players[0].wallet}{' '}
                {!!players[0].lastTransaction && (
                  <span
                    className={cn(
                      players[0].lastTransaction > 0
                        ? 'text-green-500'
                        : 'text-red-500',
                    )}
                  >
                    ({players[0].lastTransaction})
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center justify-center gap-2">
              <div
                className={cn(
                  'size-6 rounded-full bg-blue-500',
                  turn === 1 && 'animate-bounce',
                )}
              />
              <div className="text-blue-500">
                ${players[1].wallet}{' '}
                {!!players[1].lastTransaction && (
                  <span
                    className={cn(
                      players[1].lastTransaction > 0
                        ? 'text-green-500'
                        : 'text-red-500',
                    )}
                  >
                    ({players[1].lastTransaction})
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid w-full grid-cols-8 gap-0.5">
          {gridBlocks.map((block) => (
            <div className="relative" key={block}>
              {playableBlocks.find(
                (playableBlock: { block: number }) =>
                  playableBlock.block === block,
              ) && (
                <div
                  className={cn(
                    'absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 text-xs font-medium uppercase text-white',
                    playableBlocks.find(
                      (playableBlock: { block: number }) =>
                        playableBlock.block === block,
                    )?.color,
                  )}
                >
                  {playableBlocks.find(
                    (playableBlock: { block: number }) =>
                      playableBlock.block === block,
                  )?.price && (
                    <div className="absolute left-1/2 w-full -translate-x-1/2 bg-white/50 py-0.5 text-center">
                      $
                      {
                        playableBlocks.find(
                          (playableBlock: { block: number }) =>
                            playableBlock.block === block,
                        )?.price
                      }
                    </div>
                  )}

                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[0.6rem]">
                    {
                      playableBlocks.find(
                        (playableBlock: { block: number }) =>
                          playableBlock.block === block,
                      )?.name
                    }
                  </div>

                  {playableBlocks.find(
                    (playableBlock: { block: number }) =>
                      playableBlock.block === block,
                  )?.owned !== undefined && (
                    <div
                      className={cn(
                        'absolute left-1/2 top-0.5 w-11/12 -translate-x-1/2 text-center text-[0.6rem]',
                        playableBlocks.find(
                          (playableBlock: { block: number }) =>
                            playableBlock.block === block,
                        )?.owned === 0 && 'bg-red-500',
                        playableBlocks.find(
                          (playableBlock: { block: number }) =>
                            playableBlock.block === block,
                        )?.owned === 1 && 'bg-blue-500',
                      )}
                    >
                      $
                      {playableBlocks.find(
                        (playableBlock: { block: number }) =>
                          playableBlock.block === block,
                      )?.price / 2}
                    </div>
                  )}
                </div>
              )}

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
                  <div className="z-10 size-6 rounded-full bg-red-500"></div>
                )}
                {playableBlocks.find(
                  (playableBlock: { block: number }) =>
                    playableBlock.block === block,
                )?.id ===
                  players[1].position % 28 && (
                  <div className="z-10 size-6 rounded-full bg-blue-500"></div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
