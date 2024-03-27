import { Fieldset as OrigFieldset, type FieldsetProps } from '@mantine/core'
import classes from './Fieldset.module.css'

interface Props extends FieldsetProps {
  withAsterisk?: boolean
}

const Fieldset: React.FC<Props> = ({ withAsterisk, legend, ...props }) => {
  return (
    <OrigFieldset
      legend={
        <>
          {legend}
          {withAsterisk && (
            <>
              <span aria-hidden className={classes['Required']}>
                {' '}
                *
              </span>
            </>
          )}
        </>
      }
      {...props}
    />
  )
}

export default Fieldset
