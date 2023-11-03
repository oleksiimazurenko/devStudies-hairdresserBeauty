'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { useTransition } from '@react-spring/web'

import { useRef, useState, useTransition as useTransitionNext } from 'react'
import cancelAppointment from '@/actions/cancelAppointment'
import {
	ButtonClose,
	ButtonOk,
	Content,
	ModalButtons,
	OverlayBackground,
	Status,
	Title
} from './RadixModalComponents'
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
		<Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
			<Dialog.Trigger asChild>
				<Button className='m-3'>Відмінити запис</Button>
			</Dialog.Trigger>

			<Dialog.Portal forceMount>
				{transition((style, isOpen) => (
					<>
						{isOpen ? (
							<OverlayBackground style={{ opacity: style.opacity }} />
						) : null}
						{isOpen ? (
							<Content forceMount style={style} className='bg-blue-500/40 rounded-lg p-5'>
								<Title>Ви впевненні що хочете видалити цей запис?</Title>
								<ModalButtons>
									<ButtonOk
										onClick={getCancelAppointment}
										disabled={isDisabled}
									>
										OK
									</ButtonOk>
									<ButtonClose
										onClick={() => {
											setIsOpen(false)
											if (isDisabled) setIsDisabled(false)
										}}
									>
										Close
									</ButtonClose>
								</ModalButtons>
								<Status ref={statusRef} />
							</Content>
						) : null}
					</>
				))}
			</Dialog.Portal>
		</Dialog.Root>
	)
}
