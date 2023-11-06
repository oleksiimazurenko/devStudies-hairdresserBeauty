'use client'

import Image from 'next/image'

import Link from 'next/link'

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import { forwardRef } from 'react'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { cn } from "@/lib/utils"
import { Button } from '../ui/button'

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Головна сторінка",
    href: "/",
    description:
      "Тут має бути якийсь текст по бажанню. Можливо написати якийсь опис",
  },
  {
    title: "Активні записи",
    href: "/schedule",
    description:
		"Тут має бути якийсь текст по бажанню. Можливо написати якийсь опис",
  },
  {
    title: "Історія записів",
    href: "/history",
    description:
		"Тут має бути якийсь текст по бажанню. Можливо написати якийсь опис",
  }
]

export default function NavBarWrapper() {

	return (

		<>

			<NavigationMenu className={cn('justify-self-end hidden sm:block')}>
				<NavigationMenuList>
					<NavigationMenuItem className='!mx-5'>
						<NavigationMenuTrigger>Інформація</NavigationMenuTrigger>
						<NavigationMenuContent>
							<ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
								<li className="row-span-3">
									<NavigationMenuLink asChild>
										<a
											className="flex h-full w-full select-none flex-col justify-end items-center rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
											href="/"
										>
											<Image
											src="/mum.jpg"
											width={100}
											height={100}
											className='rounded-lg'
											alt="Picture of the author"
											/>
											<div className="mb-2 mt-4 text-lg font-medium text-center">
												Якась інформація
											</div>
										</a>
									</NavigationMenuLink>
								</li>
								<ListItem href="/" title="Пуста сторінка">
									Опис якоїсь додаткової сторінки
								</ListItem>
								<ListItem href="/" title="Пуста сторінка">
									Опис якоїсь додаткової сторінки
								</ListItem>
								<ListItem href="/" title="Пуста сторінка">
									Опис якоїсь додаткової сторінки
								</ListItem>
							</ul>
						</NavigationMenuContent>
					</NavigationMenuItem>
					<NavigationMenuItem className='!mx-5'>
						<NavigationMenuTrigger>Інші сторінки</NavigationMenuTrigger>
						<NavigationMenuContent>
							<ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
								{components.map((component) => (
									<ListItem
										key={component.title}
										title={component.title}
										href={component.href}
									>
										{component.description}
									</ListItem>
								))}
							</ul>
						</NavigationMenuContent>
					</NavigationMenuItem>
					<NavigationMenuItem className='!mx-5'>
						<Link href="/" legacyBehavior passHref>
							<NavigationMenuLink className='text-sm'>
								Документація
							</NavigationMenuLink>
						</Link>
					</NavigationMenuItem>
				</NavigationMenuList>
			</NavigationMenu>



			<Popover>
				<PopoverTrigger asChild className='min-[640px]:hidden'>
					<Button variant="outline">Меню сайту</Button>
				</PopoverTrigger>
				<PopoverContent className="w-auto overflow-y-scroll h-[90vh] w-[370px]">
					<NavigationMenu className={cn('justify-self-end')}>
						<NavigationMenuList className='flex-col'>
							
							<NavigationMenuItem className='!mx-5'>
								<ul className="grid gap-1 p-1 max-[640px]:w-[300px] sm:w-[400px] md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
									<li className="row-span-3">
										<NavigationMenuLink asChild>
											<a
												className="flex h-full w-full select-none flex-col justify-end items-center rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
												href="/"
											>
												<Image
												src="/mum.jpg"
												width={100}
												height={100}
												alt="Picture of the author"
												/>
												<div className="mb-1 mt-1 text-lg font-medium text-center">
													Якась інформація
												</div>
											</a>
										</NavigationMenuLink>
									</li>
									<ListItem href="/" title="Пуста сторінка">
										Опис якоїсь додаткової сторінки
									</ListItem>
									<ListItem href="/" title="Пуста сторінка">
										Опис якоїсь додаткової сторінки
									</ListItem>
									<ListItem href="/" title="Пуста сторінка">
										Опис якоїсь додаткової сторінки
									</ListItem>
								</ul>
							</NavigationMenuItem>

							<NavigationMenuItem className='!mx-5'>
								<ul className="grid gap-1 p-1 md:grid-cols-2 max-[640px]:w-[300px] sm:w-[400px] md:w-[400px] lg:w-[500px]">
									{components.map((component) => (
										<ListItem
											key={component.title}
											title={component.title}
											href={component.href}
										>
											{component.description}
										</ListItem>
									))}
								</ul>
							</NavigationMenuItem>

							<NavigationMenuItem className='!mx-5'>
								<Link href="/" legacyBehavior passHref>
									<NavigationMenuLink className='text-sm'>
										Документація
									</NavigationMenuLink>
								</Link>
							</NavigationMenuItem>

						</NavigationMenuList>
					</NavigationMenu>
				</PopoverContent>
			</Popover>

		</>
	);
}


const ListItem = forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"