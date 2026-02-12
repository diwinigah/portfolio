# Configuration EmailJS pour le Formulaire de Contact

## Installation et Configuration

Suivez ces étapes pour mettre en place l'envoi d'emails automatiques via EmailJS.

### Étape 1 : S'inscrire sur EmailJS

1. Allez sur [https://www.emailjs.com/](https://www.emailjs.com/)
2. Cliquez sur **"Sign Up for Free"**
3. Remplissez le formulaire d'inscription avec votre email et mot de passe
4. Validez votre email

### Étape 2 : Configurer votre Service Email

1. Une fois connecté, allez dans **"Email Services"**
2. Cliquez sur **"Add New Service"**
3. Sélectionnez **"Gmail"** (ou votre fournisseur email)
4. Connectez votre compte email (ex: winidorc1@gmail.com)
5. Notez le **Service ID** fourni (format: `service_xxxxxxxxxxxxx`)

### Étape 3 : Créer un Template Email

1. Allez dans **"Email Templates"**
2. Cliquez sur **"Create New Template"**
3. Configurez le template comme suit:

**Nom du template :** Contact Form

**Email du destinataire :** `winidorc1@gmail.com`

**Sujet :** 
```
Nouveau message de {{from_name}} - {{subject}}
```

**Corps HTML :**
```html
<html>
<body>
    <h2>Nouveau formulaire de contact</h2>
    
    <p><strong>Nom :</strong> {{from_name}}</p>
    <p><strong>Email :</strong> {{from_email}}</p>
    <p><strong>Sujet :</strong> {{subject}}</p>
    
    <h3>Message :</h3>
    <p>{{message}}</p>
    
    <hr>
    <p><small>Message reçu depuis votre portfolio</small></p>
</body>
</html>
```

4. Cliquez sur **"Save"**
5. Notez le **Template ID** (format: `template_xxxxxxxxxxxxx`)

### Étape 4 : Obtenir votre Public Key

1. Allez dans **"Account"** → **"API Keys"**
2. Vous verrez votre **Public Key** (commence par `key_` suivi de caractères)
3. Copiez cette clé

### Étape 5 : Mettre à jour le fichier email-handler.js

Ouvrez le fichier `email-handler.js` et remplacez :

- **YOUR_PUBLIC_KEY** par votre Public Key depuis l'étape 4
- **service_xxxxxxxxxxxx** par votre Service ID depuis l'étape 2
- **template_xxxxxxxxxxxx** par votre Template ID depuis l'étape 3

Exemple :
```javascript
emailjs.init({
    publicKey: "key_abc123def456ghi789",
});

// Plus bas dans le fichier:
emailjs.send(
    'service_1a2b3c4d5e6f7g8h9i',
    'template_9i8h7g6f5e4d3c2b1a',
    {
        from_name: formData.nom,
        from_email: formData.email,
        subject: formData.sujet,
        message: formData.message,
        to_email: 'winidorc1@gmail.com'
    }
)
```

### Étape 6 : Tester le formulaire

1. Ouvrez votre portfolio dans un navigateur
2. Remplissez le formulaire de contact
3. Cliquez sur "Envoyer le message"
4. Vérifiez votre email pour recevoir le message

## Dépannage

### Les emails ne sont pas reçus
- Vérifiez que votre Service ID et Template ID sont corrects
- Vérifiez que votre Public Key est correcte
- Vérifiez que votre service Gmail est activé sur EmailJS
- Vérifiez le dossier spam/indésirables

### Erreur "Invalid Service ID"
- Assurez-vous d'avoir copié exactement le Service ID depuis EmailJS

### Erreur "Invalid Template ID"
- Assurez-vous d'avoir copié exactement le Template ID depuis EmailJS

## Ressources

- [Documentation EmailJS](https://www.emailjs.com/docs/)
- [Support EmailJS](https://www.emailjs.com/docs/general/contacting-emailjs-support/)

## Limites du plan gratuit

- **200 emails/mois** gratuit
- Voici les variables disponibles dans le formulaire :
  - `from_name` : Nom du visiteur
  - `from_email` : Email du visiteur
  - `subject` : Sujet du message
  - `message` : Contenu du message
  - `to_email` : Votre adresse email
