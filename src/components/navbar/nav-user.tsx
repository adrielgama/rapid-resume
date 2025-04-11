'use client'

import { LogOutIcon, Moon, MoreVerticalIcon, Sun } from 'lucide-react'
import { useUser } from '@clerk/nextjs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'
import { useModeToggle } from '@/hooks/use-mode-toggle'

export function NavUser({
  user,
  logout,
}: {
  user: typeof useUser extends () => { user: infer U } ? U : never
  logout: () => void
}) {
  const { isMobile } = useSidebar()
  const { toggleTheme, theme } = useModeToggle()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage
                  src={user?.imageUrl}
                  alt={user?.fullName ?? 'Avatar Image'}
                />
                <AvatarFallback className="rounded-lg">{`${user?.firstName?.[0]}${user?.lastName?.[0]}`}</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{`${user?.firstName} ${user?.lastName}`}</span>
                <span className="text-muted-foreground truncate text-xs">
                  {user?.emailAddresses[0].emailAddress}
                </span>
              </div>
              <MoreVerticalIcon className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={user?.imageUrl}
                    alt={user?.fullName ?? 'Avatar Image'}
                  />
                  <AvatarFallback className="rounded-lg">
                    {`${user?.firstName?.[0]}${user?.lastName?.[0]}`}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    {`${user?.firstName} ${user?.lastName}`}
                  </span>
                  <span className="text-muted-foreground truncate text-xs">
                    {user?.emailAddresses[0].emailAddress}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={toggleTheme} className="cursor-pointer">
              {theme === 'light' ? (
                <Moon className="size-4 transition-all" />
              ) : (
                <Sun className="size-4 transition-all" />
              )}
              <span className="ml-2">Toggle Theme</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout} className="cursor-pointer">
              <LogOutIcon size={16} className="mr-2" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
