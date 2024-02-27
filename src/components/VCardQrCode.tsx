import { Image, Input, type InputProps } from '@mantine/core'
import cls from 'classnames'
import QRCode from 'qrcode'
import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'

import vCardState from '../recoil/selectors/vCardState'
import classes from './VCardQrCode.module.css'

type Props = Pick<InputProps, 'classNames'>

const VCardQrCode: React.FC<Props> = ({ classNames }) => {
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
    <Input component={React.Fragment} classNames={classNames}>
      <Image
        src={qrCode}
        radius="sm"
        classNames={{
          root: cls(classes['Image']),
        }}
      />
    </Input>
  )
}

export default VCardQrCode
