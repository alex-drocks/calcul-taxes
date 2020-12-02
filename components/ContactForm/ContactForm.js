import {useState} from "react";
import styles from "./ContactForm.module.css";

/**
 * Initial state is showing the contact form.
 * While async sending the state removes the submit button.
 * When sending returns the result can be success or error and
 * a notification card will be shown accordingly.
 * @param classNames is for custom styles.
 * @param fetchUrl is the url of the php form handler.
 * @returns {JSX.Element}
 * @constructor
 */
export default function ContactForm({classNames, apiURL}) {
  const [formSent, setFormSent] = useState("");
  const [isSending, setIsSending] = useState(false);

  function onSubmit(e) {
    if (!window.fetch || formSent) return;

    setIsSending(true);

    const form = e.target;
    const formData = new FormData(form);
    const urlEncodedQuery = new URLSearchParams(formData);

    fetch(apiURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      redirect: "follow",
      body: urlEncodedQuery,
    })
      .then((response) => response.text())
      .then((result) => {
        setIsSending(false);
        if (result && result !== "EMAIL_SENT_SUCCESSFULLY") {
          setFormSent("ERROR");
          return;
        }
        form.reset();
        setFormSent("EMAIL_SENT_SUCCESSFULLY");
      })
      .catch((error) => {
        setFormSent("ERROR");
      });

    // Prevent the default form submit
    e.preventDefault();
  }

  return (
    <form
      className={classNames}
      id="contactForm"
      name="contactForm"
      action=""
      onSubmit={onSubmit}
    >
      <h2>Formulaire de contact</h2>
      {/*Nom complet*/}
      <div className={`${styles.formField}`}>
        <h3 className={styles.formFieldTitle}>Nom complet:</h3>
        <input
          required
          type="text"
          name="name"
          className={styles.formFieldControl}
          spellCheck={false}
          maxLength={70}
          aria-required={true}
          placeholder="Votre prénom et nom de famille..."
        />
      </div>

      {/*Courriel*/}
      <div className={`${styles.formField}`}>
        <h3 className={styles.formFieldTitle}>Adresse courriel:</h3>
        <input
          required
          type="email"
          name="email"
          className={styles.formFieldControl}
          spellCheck={false}
          maxLength={70}
          aria-required={true}
          placeholder="Votre adresse e-mail..."
        />
      </div>

      {/*Numéro de tel*/}
      <div className={`${styles.formField}`}>
        <h3 className={styles.formFieldTitle}>Numéro de téléphone:</h3>
        <input
          type="tel"
          name="phone"
          className={styles.formFieldControl}
          spellCheck={false}
          maxLength={17}
          aria-required={true}
          placeholder="Votre numéro de téléphone..."
        />
      </div>

      {/*Sujet*/}
      <div className={`${styles.formField}`}>
        <h3 className={styles.formFieldTitle}>Sujet:</h3>
        <label className={styles.formFieldRadio} htmlFor="impots-particuliers">
          <input
            type="radio"
            id="impots-particuliers"
            name="subject"
            value="Déclaration d'impôts de particuliers"
          />
          Déclaration d'impôts de particuliers
        </label>
        <label className={styles.formFieldRadio} htmlFor="impots-societes">
          <input
            type="radio"
            id="impots-societes"
            name="subject"
            value="Déclaration d'impôts de sociétés"
          />
          Déclaration d'impôts de sociétés
        </label>
        <label className={styles.formFieldRadio} htmlFor="comptabilite-entreprise">
          <input
            type="radio"
            id="comptabilite-entreprise"
            name="subject"
            value="Comptabilité d'entreprise & Tenue de livres"
          />
          Comptabilité d'entreprise & Tenue de livres
        </label>
        <label className={styles.formFieldRadio} htmlFor="dossier-succession">
          <input
            type="radio"
            id="dossier-succession"
            name="subject"
            value="Prise en charge de succession"
          />
          Prise en charge de succession
        </label>
        <label className={styles.formFieldRadio} htmlFor="creation-incorporation">
          <input
            type="radio"
            id="creation-incorporation"
            name="subject"
            value="Création d'une incorporation"
          />
          Création d'une incorporation
        </label>
        <label className={styles.formFieldRadio} htmlFor="autres">
          <input type="radio" id="autres" name="subject" value="Autres"/>
          Autres
        </label>
      </div>

      {/*Message*/}
      <div className={`${styles.formField}`}>
        <h3 className={styles.formFieldTitle}>Message:</h3>
        <textarea
          required
          className={styles.formFieldControl}
          name="message"
          cols="10"
          rows="4"
          placeholder="Votre message (max. 500 caractères)"
          maxLength={500}
        />
      </div>

      {/*Submit*/}
      {formSent && formSent === "EMAIL_SENT_SUCCESSFULLY" ? (
        <div>
          <h3>Votre message a été envoyé avec succès.</h3>
          Nous vous répondrons dès que possible. Merci.
        </div>
      ) : formSent && formSent === "ERROR" ? (
        <div>
          <h3>Une erreur s'est produite.</h3>
          Veuillez SVP nous contacter directement. Merci.
        </div>
      ) : (
        //Render the Button only if not currently sending
        <div className={`${styles.formField}`}>
          {!isSending && (
            <a href="#">
              <button className={styles.formFieldControl} type="submit">
                Envoyer
              </button>
            </a>
          )}
          {isSending && <p>Envoi en cours...</p>}
        </div>
      )}
    </form>
  );
}
