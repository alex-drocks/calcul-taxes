import styles from "./Video.module.css";

export default function Video({ webmSrc, mp4Src }) {
  return (
    <figure className={styles.figure}>
      <video
        controls
        loop
        muted
        playsInline
        autoPlay
        className={styles.video}
      >
        <source src={webmSrc} type="video/webm" />
        <source src={mp4Src} type="video/mp4" />
        Désolé, votre navigateur ne supporte pas les vidéos.
      </video>
    </figure>
  );
}
