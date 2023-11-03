import { styled } from '@stitches/react'
import * as Dialog from '@radix-ui/react-dialog'
import { animated } from '@react-spring/web'

export  const OverlayBackground = styled(animated(Dialog.Overlay), {
	width: '100vw',
	height: '100vh',
	backgroundColor: 'rgba(0, 0, 0, 0.5)',
	pointerEvents: 'all',
	position: 'fixed',
	inset: 0,
})

export const Content = styled(animated(Dialog.Content), {
	position: 'fixed',
	top: 'calc(50vh - 91px)',
	left: 'calc(50vw - 280px)',
	backgroundColor: '#fafafa',
	borderRadius: 8,
	padding: '24px 24px 32px',
})

export const Title = styled(Dialog.Title, {
	fontSize: 20,
})

export const ModalButtons = styled('div', {
		marginTop: '40px',
		padding: '0 15px',
		display: 'flex',
		justifyContent: 'space-between'
})

export const ButtonOk = styled('button', {
	width: '100px',
	height: '25px',
	padding: '4px 0',
	background: '#ffffff',
	border: '1px solid #000',
	fontWeight: 600,
	fontSize: '12px',
	lineHeight: '16px',
	color: 'rgba(0, 0, 0, 0.7)',
	cursor: 'pointer',

	'&:disabled': {
		background: '#010',
		border: '1px solid rgba(243, 171, 155, 0.5)',
		color: '#fff'
	}
})

export const ButtonClose = styled('button', {
		width: '100px',
		height: '25px',
		padding: '4px 0',
		background: '#c1c1c1',
		border: `1px solid #010`,
		fontWeight: 600,
		fontSize: '12px',
		lineHeight: '16px',
		color: 'rgba(0, 0, 0, 0.7)',
		cursor: 'pointer',
})
export const Status = styled('div', {
	marginTop: '15px',
	fontWeight: 600,
	fontSize: '14px',
	lineHeight: '19px',
	color: '#000000',
	textAlign: 'center',
})