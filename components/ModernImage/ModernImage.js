// http://afarkas.github.io/lazysizes/#examples
// https://jakearchibald.com/2015/anatomy-of-responsive-images/
import 'lazysizes';


export default function ModernImage({lazyload, srcWebp, srcFallback, width, height, altText, classNames, onClickFunc}) {
  return (
    <picture>
      {/*<!--[if IE 9]><video style="display: none;><![endif]-->*/}
      <source
        type="image/webp"
        data-srcset={lazyload ? srcWebp : null}
        srcSet={lazyload ? null : srcWebp}
      />
      {/*<!--[if IE 9]></video><![endif]-->*/}
      <img
        src={lazyload ? "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" : srcFallback}
        data-src={lazyload ? srcFallback : null}
        width={width}
        height={height}
        alt={altText}
        onClick={onClickFunc ? e => onClickFunc(e.target) : null}
        className={`${lazyload ? "lazyload" : ""}${classNames ? " " + classNames : ""}`.trim()}
      />
    </picture>
  )
}