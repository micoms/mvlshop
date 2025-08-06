'use client'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { useUser, useClerk } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

export const UserButton = () => {
  const { isLoaded, user } = useUser()
  const { signOut } = useClerk()
  const router = useRouter()

  if (!isLoaded || !user?.id) return null

  const isAdmin = user.publicMetadata?.role === 'admin'

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="flex items-center justify-center rounded-full border border-gray-200 bg-white p-1.5 shadow-sm hover:shadow-md transition">
          <Image
            alt="User avatar"
            src={user.imageUrl}
            width={36}
            height={36}
            className="rounded-full"
          />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          sideOffset={8}
          className="mt-2 w-52 rounded-lg border border-gray-200 bg-white p-2 text-sm shadow-lg"
        >
          <DropdownMenu.Group>
            <DropdownMenu.Item asChild>
              <button
                onClick={() => router.push('/account')}
                className="w-full rounded-md px-3 py-2 text-left hover:bg-gray-100"
              >
                Account Settings
              </button>
            </DropdownMenu.Item>

            <DropdownMenu.Item asChild>
              <Link
                href="/subscriptions"
                className="block w-full rounded-md px-3 py-2 hover:bg-gray-100"
              >
                Subscription
              </Link>
            </DropdownMenu.Item>

            {isAdmin && (
              <DropdownMenu.Item asChild>
                <Link
                  href="/admin"
                  className="block w-full rounded-md px-3 py-2 hover:bg-gray-100 text-blue-600"
                >
                  Admin Dashboard
                </Link>
              </DropdownMenu.Item>
            )}
          </DropdownMenu.Group>

          <DropdownMenu.Separator className="my-2 h-px bg-gray-200" />

          <DropdownMenu.Item asChild>
            <button
              onClick={() => signOut(() => router.push('/'))}
              className="w-full rounded-md px-3 py-2 text-left text-red-500 hover:bg-gray-100"
            >
              Sign Out
            </button>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
