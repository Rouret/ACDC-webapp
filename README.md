# acdc-webapp

## Installer les dépendances
```
npm install
```

### Lance le server de développement (localhost:8080)
```
npm run serve
```

### Compile pour la mise en production
```
npm run build
```

### Structure

* src
  * views
  * store
  * services
  * router
  * plugins
  * constants
  * components
  * assets

**views** : pages <br>
**store** : store (de vuex) <br>
**services** : script pour les requetes API et pour les valeurs de l'ETH <br>
**router** : router (vue-router) <br>
**constants** : constantes <br>
**components** : tous les components par exemple Chart,Dashboard <br>
**assets** : les images 

### Changer l'url de l'api

Pour cela il faut changer le fichier **.env.development** et **.env.production** :
```
VUE_APP_API=VOTRE_URL_SANS_LE_DERNIER_SLASH
//exemple
VUE_APP_API=http://localhost:7000
```

### Configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
