'use client'
import ReactImageMagnify from 'react-image-magnify';



const ProductMagnifier = () => {
  return (
    <ReactImageMagnify {...{
        smallImage: {
            alt: 'Wristwatch by Ted Baker London',
            isFluidWidth: true,
            src: '/chair1.webp',
            // height:300

        },
        largeImage: {
            src: '/slider.webp',
            width: 1900,
            height: 1600
        }
    }} />
  )
}

export default ProductMagnifier

