import { Image, Input } from '@mantine/core'
import classNames from 'classnames'
import QRCode from 'qrcode'
import React from 'react'
import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'

import classes from './VCardQrCode.module.css'
import vCardState from './recoil/selectors/vCardState'

const VCardQrCode: React.FC = () => {
  const vCard = useRecoilValue(vCardState)
  const [qrCode, setQrCode] = useState<string>()

  useEffect(() => {
    QRCode.toDataURL(vCard, (_left, right) => {
      setQrCode(right)
    })
  }, [vCard])

  // This component has been wrapped with <Input> to be drawn boundaries.
  // TODO: Crop <Input>
  return (
    <Input component={React.Fragment}>
      <Image
        src={qrCode}
        radius="sm"
        classNames={{
          root: classNames(classes['Image']),
        }}
      />
    </Input>
  )
}

export default VCardQrCode
