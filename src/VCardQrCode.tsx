import QRCode from 'qrcode'
import { useEffect, useRef } from 'react'
import { useRecoilValue } from 'recoil'

import classes from './VCardQrCode.module.css'
import vCardState from './recoil/selectors/vCardState'

const VCardQrCode: React.FC = () => {
  const vCard = useRecoilValue(vCardState)
  const canvas = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    QRCode.toCanvas(canvas.current, vCard)
  }, [vCard])

  // biome-ignore lint/complexity/useLiteralKeys: See noPropertyAccessFromIndexSignature
  return <canvas ref={canvas} className={classes['Canvas']} />
}

export default VCardQrCode
