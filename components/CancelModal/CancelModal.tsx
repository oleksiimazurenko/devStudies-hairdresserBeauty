'use client'

import { useTransition } from '@react-spring/web'

import { useRef, useState, useTransition as useTransitionNext } from 'react'
import cancelAppointment from '@/actions/cancelAppointment'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { Button } from '@/components/ui/button'

export default function CancelModal({ id }: { id: number }) {
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const [isDisabled, setIsDisabled] = useState<boolean>(false)
	const [isPending, startTransition] = useTransitionNext()
	const statusRef = useRef<HTMLDivElement | null>(null)

	const setStatus = (status: string) => {
		if (statusRef.current) statusRef.current.textContent = status
	}

	const transition = useTransition(isOpen, {
		from: {
			scale: 0,
			opacity: 0,
		},
		enter: {
			scale: 1,
			opacity: 1,
		},
		leave: {
			scale: 0,
			opacity: 0,
		},
	})

	const getCancelAppointment = () => {
		startTransition(() => {
			setStatus('loading')
			try {
				cancelAppointment(id)
					.then(() => {
						setIsDisabled(true)
						setStatus('success')
					})
					.catch(() => {
						setStatus('error')
					})
			} catch (e) {
				setStatus('error')
			}
		})
	}

	return (
		<AlertDialog>
      <AlertDialogTrigger asChild className='mt-[6px]'>
        <Button variant="outline">Відмінити запис</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Ви впевненні що хочете видалити цей запис?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
						onClick={() => {
							setIsOpen(false)
							if (isDisabled) setIsDisabled(false)
						}}
					>
						Cancel
					</AlertDialogCancel>
          <AlertDialogAction 
						onClick={getCancelAppointment}
						disabled={isDisabled}>
							Continue
					</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>

	)
}
